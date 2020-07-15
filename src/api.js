import { standing, baseurl, headers } from './config'

function status(response) {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`)
    console.log(`Refresh browser anda`)

    return Promise.reject(new Error(response.statusText))
  } else {
    return Promise.resolve(response)
  }
}

export function ajax(url, options = null) {
  return new Promise((resolve, reject) => {
    if (options === null) {
      fetch(url)
        .then(response => response.text())
        .then(response => resolve(response))
        .catch(error => reject(error))
    } else {
      fetch(url, options)
        .then(response => status(response))
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))
    }
  })
}

export function fetchStandings() {
  return new Promise((resolve, reject) => {
    if ('caches' in window) {
      caches
        .match(standing)
        .then(response => {
          if (response) {
            return response.json()
          }
        })
        .then(result => {
          if (result) {
            return resolve(result)
          }
        })
        .catch(error => reject(error))
    }

    ajax( standing, headers )
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export function fetchDetailTeam(id) {
  return new Promise((resolve, reject) => {
    if ('caches' in window) {
      caches
        .match(`${baseurl}teams/${id}`)
        .then(response => {
          if (response) {
            return response.json()
          }
        })
        .then(result => {
          if (result) {
            return resolve(result)
          }
        })
        .catch(error => reject(error))
    }

    ajax(`${baseurl}teams/${id}`, headers)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export function fetchMatchTeam(id) {
  return new Promise((resolve, reject) => {
    if ('caches' in window) {
      caches
        .match(`${baseurl}teams/${id}/matches?status=SCHEDULED`)
        .then(response => {
          if (response) {
            return response.json()
          }
        })
        .then(result => {
          if (result) {
            return resolve(result)
          }
        })
        .catch(error => reject(error))
    }
    ajax(`${baseurl}teams/${id}/matches?status=SCHEDULED`, headers)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}