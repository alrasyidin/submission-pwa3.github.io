import date from 'date-and-time'

export function dateFormatter(dateString) {
  const pattern = date.compile('ddd, D/MM HH.mm')
  return date.format(new Date(dateString), pattern)
}

export function showLoading(data) {
  let load = document.querySelector('.load')

  // default state
  load.style.display = 'block'

  window.setTimeout(() => {

    if (data !== null) {
      load.style.display = 'none'
    }
  }, 500)
}

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  console.log(base64)
  const rawData = window.atob(base64)

  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}