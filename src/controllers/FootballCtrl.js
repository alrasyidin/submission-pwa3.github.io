import { fetchStandings, fetchDetailTeam, fetchMatchTeam } from '../api'
import { showLoading } from '../helper'

export default class FootballController{
  constructor() {
    this.data = {
      competition: {},
      season: {},
      standing: {},
      teams: {},
      matches: {}
    }

  }

  fetchDataCompetition() {
    return new Promise((resolve, reject) => {
      fetchStandings()
        .then(response => {
          // showing loading indicator progress
          showLoading(response)

          this.data.competition = response.competition
          this.data.season = response.season
          this.data.standing = response.standings[0]

          resolve(this.data)
        })
        .catch(error => reject(error))
    })
  }

  fetchDataTeam(id) {
    return new Promise((resolve, reject) => {
      Promise.all([
        fetchDetailTeam(id),
        fetchMatchTeam(id)
      ])
      .then(response => {
        // showing loading indicator progress
        showLoading(response)

        this.data.teams = response[0]

        // filter data pemain berdasarkan posisinya
        this.data.teams.filteredSquad = {
          goalkeeper: [],
          defender: [],
          midfielder: [],
          attacker: [],
          coach: []
        }

        this.data.teams.squad.forEach(item => {
          if (item.position === 'Goalkeeper') this.data.teams.filteredSquad.goalkeeper.push(item)
          if (item.position === 'Defender') this.data.teams.filteredSquad.defender.push(item)
          if (item.position === 'Midfielder') this.data.teams.filteredSquad.midfielder.push(item)
          if (item.position === 'Attacker') this.data.teams.filteredSquad.attacker.push(item)
          if (item.role === 'COACH') this.data.teams.filteredSquad.coach.push(item)
        })

        // data untuk match
        this.data.teams.matches = response[1].matches

        resolve(this.data.teams)
      })
      .catch(error => reject(error))

    })
  }
}