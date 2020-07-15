import idb from 'idb'

export default class DBController {
  constructor() {
    this.db = idb
      .open('football-pwa', 1, upgradeDB => {
        let objectStoreTeams = upgradeDB.createObjectStore('teams', { keyPath: 'id' })

        objectStoreTeams.createIndex('squad', 'squad', {unique: false})
      })
  }

  saveData(data, objectStore) {
    return new Promise((resolve, reject) => {
      this
        .db
        .then(db => {
          let tx = db.transaction(objectStore, 'readwrite')
          let store = tx.objectStore(objectStore)

          console.log(data)
          store.add(data)
          return resolve(tx.complete)
        })
        .catch(error => reject(error))

    })
  }

  getAllData(objectStore) {
    return new Promise((resolve, reject) => {
      this
        .db
        .then(db => {
          let tx = db.transaction(objectStore, 'readwrite')
          let store = tx.objectStore(objectStore)

          return store.getAll()
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  getDataById(id, objectStore) {
    return new Promise((resolve, reject) => {
      this
        .db
        .then(db => {
          let tx = db.transaction(objectStore)
          let store = tx.objectStore(objectStore)

          return store.get(id)
        })
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  deleteData(id, objectStore) {
    return new Promise((resolve, reject) => {
      this
        .db
        .then(db => {
          let tx = db.transaction(objectStore, 'readwrite')
          let store = tx.objectStore(objectStore)

          store.delete(id)
          return tx.complete
        })
        .then(status => resolve(status))
        .catch(error => reject(error))

    })
  }
}