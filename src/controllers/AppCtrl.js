import FootballController from './FootballCtrl'
import UIController from './UICtrl'
import DB from './DBCtrl'
import { showLoading } from '../helper'


import { ajax } from '../api'

export default class AppController {
  constructor() {
    this.UI = new UIController
    this.Football = new FootballController
    this.init()
  }

  init() {
    M.Sidenav.init(
      this.UI.getSelector.sidenav,
      {
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks
        draggable: true // Choose whether you can drag to open on touch screens
      }
    )

    this.loadNav()
    let hash = window.location.hash.split('?')[0].substr(1)
    if (hash == '') hash = 'home'

    this.loadPage(hash)
    this.db = new DB
  }

  loadNav() {
    let activeLink = []
    ajax('nav.html')
      .then(menu => {
        this.UI.getSelector.sideAndTops.forEach(element => {
          element.innerHTML = menu
        })

        let hash = window.location.hash.split('?')[0].substr(1)

        if (hash == '') hash = 'home'

        if (hash !== 'detail') {
          let linkActiveDefault = document.querySelector(`a[href*="${hash}"]`)
          linkActiveDefault.parentElement.classList.add('active')
        }

        this.UI.selectAll('.sidenav a, .topnav a').forEach(link => {

          // tentukan link aktif
          if (link.parentElement.classList.contains('active')) {
            activeLink.push(link)
          }

          link.addEventListener('click', event => {
            // event.preventDefault()

            // hapus class aktif terdahulu
            activeLink.forEach(elem => {
              elem.parentElement.classList.remove('active')
            })

            // tambahkan class aktif ke link yang diklik
            event.target.parentElement.classList.add('active')

            // inisiasi kembali
            activeLink = []
            activeLink.push(event.target)

            // tutup sidenav
            const sidenav = this.UI.getSelector.sidenav
            M.Sidenav.getInstance(sidenav).close()

            // muat konten halaman yang dipanggil
            let page = event.target.getAttribute('href').substr(1)
            this.loadPage(page)
          })
        })
      })
      .catch(error => console.error(error))
  }

  loadPage(url) {
    ajax(`pages/${url}.html`)
      .then(page => {
        this.UI.getSelector.content.innerHTML = page

        if (url === 'home') {
          try {
            this.renderData()

            this.UI.select("#standing").addEventListener('click', event => {
              let page = event.target.getAttribute('href').split('?')[0].substr(1)
              this.loadPage(page)
            })
          } catch (error) {
            console.log(error)
          }

        } else if (url === 'detail') {

          try {
            this.renderDataDetail()
          } catch (error) {
            console.log(error)
          }
        } else if (url === 'favorite') {
          this.renderDataSaved()

          window.setTimeout(() => {
            this.UI.selectAll('#favoriteTeam a.detail').forEach(favorite => {
              favorite.addEventListener('click', event => {
                let page = event.target.getAttribute('href').split('?')[0].substr(1)
                this.loadPage(page)
              })
            })

            this.UI.selectAll('#favoriteTeam a.delete').forEach(deleteItem => {
              deleteItem.addEventListener('click', event => {
                event.preventDefault()

                if (confirm('Apakah anda ingin menghapus tim dari favorit')) {
                  let target = event.target.parentElement.parentElement.parentElement
                  this.deleteDataFromDB(target.dataset.id)
                } else {
                  return
                }

              })
            })
          }, 200)

        }
      })
      .catch(() => {
        this.UI.getSelector.content.innerHTML = "Oooppps Halaman tidak ditemukan"
      })
  }

  renderData() {
    // dapatkan data
    this.Football
      .fetchDataCompetition()
      .then(result => {

        // inject table
        this.UI.injectStandingToTable(result.standing)

        // inject competition
        this.UI.injectCompetitionList(result.competition, result.season)
      })
      .catch(error => console.error(error))
  }

  renderDataDetail() {
    // dapatkan id team
    let params = window.location.hash.split('?')[1]
    let urlParams = new URLSearchParams(`?${params}`)
    let isFromSaved = urlParams.get('saved')
    const save = this.UI.select('#floatButton')
    const id = parseInt(urlParams.get('id'))

    if (isFromSaved) {
      save.style.display = 'none'

      // showing loading indicator progress
      showLoading()

      this.db
        .getDataById(id, 'teams')
        .then(team => {
          showLoading(team)

          // inject data pemain
          this.UI.injectTeam(team)
        })

    } else {

      // dapatkan data
      this.Football.fetchDataTeam(id)
        .then(team => {
          // inject data pemain
          this.UI.injectTeam(team)

          // save data ke indexedDB
          this.UI.select('#floatButton').addEventListener('click', () => {
            this.db.saveData(team, 'teams')
              .then(result => {
                this.UI.showNotyf('Berhasil menambahkan tim ke favorit', 'info')
              })
              .catch(error => {
                this.UI.showNotyf('Gagal menambahkan tim ke favorit, sepertinya sudah ditambahkan', 'error')

                console.error(`IndexedDB: gagal simpan data \n${error}`)
              })
          })
        })
        .catch(error => console.error(error))
    }
  }

  renderDataSaved() {
    this.db.getAllData('teams')
      .then(team => {
        // show Loading
        showLoading()

        // inject team ke halaman favorite
        this.UI.injectSavedTeam(team)
      })
      .catch(error => console.log(error))
  }

  deleteDataFromDB(id) {
    // rubah string ke integer
    id = parseInt(id)

    // hapus data dari indexedDB
    this
      .db
      .deleteData(id, 'teams')
      .then(status => {

        this.UI.showNotyf(`Berhasil menghapus data`, 'info')

        window.setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(error => console.log(error))
  }
}