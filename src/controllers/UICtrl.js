import { dateFormatter} from '../helper'

// notyf toats javascript
import { Notyf } from 'notyf';

export default class UIController {
  constructor() {
      this.selector = {
        content: document.querySelector('#content-body'),
        sidenav: document.querySelector('.sidenav'),
        sideAndTops: document.querySelectorAll('.sidenav, .topnav'),
      }
  }

  get getSelector() {
    return this.selector
  }

  select(item) {
    return document.querySelector(item)
  }

  selectAll(item) {
    return document.querySelectorAll(item)
  }

  showNotyf(message, type) {
    const notyf = new Notyf({
      duration: 2000,
      position: {
        x: 'right',
        y: 'top',
      },
      types: [
        {
          type: 'info',
          background: '#2e7d32',
          icon: {
            className: 'gg gg-check-o',
            tagName: 'i',
          }
        },
        {
          type: 'error',
          background: '#b71c1c',
          icon: {
            className: 'gg gg-danger',
            tagName: 'i'
          }
        }
      ],
      dismissible: true
    })

    notyf.open({
      type: type,
      message: message
    })
  }

  injectStandingToTable(standing) {
    let html = ``

    standing.table.forEach(item => {
      html += `
        <tr>
          <td>${item.position}</td>
          <td><img src="${item.team.crestUrl}" height="30" alt="Avatar Team"></td>
          <td><a href="#detail?id=${item.team.id}">${item.team.name}</a></td>
          <td>${item.playedGames}</td>
          <td>${item.won}</td>
          <td>${item.draw}</td>
          <td>${item.lost}</td>
          <td>${item.goalsFor}</td>
          <td>${item.goalsAgainst}</td>
          <td>${item.goalDifference}</td>
          <td>${item.points}</td>
        </tr>
      `
    })

    this.select('#standing').innerHTML = html
  }

  injectCompetitionList(competition, season) {
    let html = `
      <li class="collection-item">
        Kompetitsi ${competition.name} (${competition.code})
      </li>
      <li class="collection-item">Negara: ${competition.area.name}</li>
      <li class="collection-item">Tanggal Dimulai: ${season.startDate}</li>
      <li class="collection-item">Tanggal Berakhir: ${season.endDate}</li>
      <li class="collection-item">Minggu Ke: ${season.currentMatchday}</li>
      <li class="collection-item">Pemenang: ${season.winner === null ? "Belum Diketahui" : season.winner}</li>
    `

    this.select('#competition').innerHTML = html
  }

  injectListTeam(position) {
    let teamHtml = ``
    position.forEach(item => {
      teamHtml += `
        <div class="flex__item center-align">
          <div class="number">${item.shirtNumber !== null ? item.shirtNumber : 'N/A'}</div>
          <h6>${item.name}</h6>
          <p class="text">${item.nationality}</p>
        </div>
      `
    })
    return teamHtml
  }


  injectTeam(result) {
    let team = result

    let activeCompetition = ''
    team.activeCompetitions.forEach((item, id, team) => {
      activeCompetition += `${id !== team.length - 1 ? `${item.name}, ` : `${item.name}`}`
    })

    let nameTeamHtml = `${team.name}`
    let detailTeamHtml = `
      <li class="collection-item">Stadion: ${team.venue}</li>
      <li class="collection-item">Berdiri: ${team.founded}</li>
      <li class="collection-item">Warna Klub: ${team.clubColors}</li>
      <li class="collection-item">Kompetisi diikuti: ${activeCompetition}</li>
      <li class="collection-item">Website: ${team.website !== null ? `<a href=${team.website} target="_blank">${team.website}</a>` : 'N/A'}</li>
      <li class="collection-item">Email: ${team.email}</li>
    `
    let imgTeam = `<img src="${team.crestUrl}" alt="Image Team">`

    let listTeam = `
      <div class="col s12">
        <h5>Kiper</h5>

        <div class="flex">
          ${this.injectListTeam(team.filteredSquad.goalkeeper)}
        </div>
      </div>
      <div class="col s12">
        <h5>Pemain Bertahan</h5>

        <div class="flex">
          ${this.injectListTeam(team.filteredSquad.defender)}
        </div>
      </div>
      <div class="col s12">
        <h5>Pemain Tengah</h5>

        <div class="flex">
          ${this.injectListTeam(team.filteredSquad.midfielder)}
        </div>
      </div>

      <div class="col s12">
        <h5>Penyerang</h5>

        <div class="flex">
          ${this.injectListTeam(team.filteredSquad.attacker)}
        </div>
      </div>

      <div class="col s12">
        <h5>Pelatih/Manajer</h5>

        <div class="flex">
          ${this.injectListTeam(team.filteredSquad.coach)}
        </div>
      </div>
    `

    let matchTeam = ``

    team.matches.forEach((item, id) => {
      id += 1
      matchTeam += `
        <tr>
          <td>${id}</td>
          <td>${item.homeTeam.name} VS ${item.awayTeam.name}</td>
          <td>${dateFormatter(item.utcDate)}</td>
        </tr>
      `
    })

    this.select('#nameTeam').innerHTML = nameTeamHtml
    this.select('#detailTeam').innerHTML = detailTeamHtml
    this.select('#imgTeam').innerHTML = imgTeam
    this.select('#listTeam').innerHTML = listTeam
    this.select('#matches').innerHTML = matchTeam
  }

  injectSavedTeam(teams) {
    let listTeams = ``
    teams.forEach(team => {
      let activeCompetition = ''
      team.activeCompetitions.forEach((item, id, team) => {
        activeCompetition += `${id !== team.length - 1 ? `${item.name}, ` : `${item.name}`}`
      })

      listTeams += `
        <div class="col s12 l6" data-id="${team.id}">
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}" alt="${team.shortName}" height="200" width="100">
            </div>
            <div class="card-content">
              <h5 class="card-title">${team.name}</h5>
              <ul class="collection">
                <li class="collection-item">Alamat: ${team.address}</li>
                <li class="collection-item">Surel: ${team.email}</li>
                <li class="collection-item">Situs Web: ${team.website}</li>
                <li class="collection-item">Kompetisi diikuti: ${activeCompetition}</li>
                <li class="collection-item">Stadion: ${team.venue}</li>
              </ul>
            </div>
            <div class="card-action">
              <a href="#detail?id=${team.id}&saved=true" class="waves-effect waves-teal btn-flat light-blue white-text detail">Detail</a>
              <a href="#" class="waves-effect waves-teal btn-flat red white-text delete">Hapus</a>
            </div>
          </div>
        </div>
      `
    })

    if (listTeams == '') {
      this.select('#favoriteTeam').innerHTML = '<p class="flow-text center-align">Tidak ada data, anda belum memasukkan tim ke favorit</p>'
    } else {
      this.select('#favoriteTeam').innerHTML = listTeams
    }
  }
}