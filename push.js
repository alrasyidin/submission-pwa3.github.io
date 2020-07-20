var webPush = require('web-push')

const vapidKeys = {
  "publicKey": "BBd6_FIOPrvsexEwe7awCPiv_N9hQgi2kqW7PGmIH7pj6SpL-RllLpnff2Y4sY1NhX_rMaGRB0tMd9OcAuAHkB4",
  "privateKey": "VzbZHnx9BntoXzoOnSlNNjaeA5LfvrMy7c9aLGZBPwY"
}


webPush.setVapidDetails(
  'mailto:hamstergeek38@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAADUN9AOoOvIXULvBY4mGcWeBq569BqECY3o8wc4hVEk3s%2bxTNm1heHh%2b14X9lrlPdVriTpGYz9RIyD8fyF8dZVTTS0CH34WH0%2bligtB7BzeXMY0783eGOCllAbIH%2fIVyUAQr8llodN7%2fMp%2fFLqX%2fArIzX%2b1vN9DFEu%2fzwd5bJqE5nI%2btcceOOOTamNziDJR2sfGXGKfGtEnVHk1Ye6nYcz3rLy%2fIDsGhdFWR5DXXP1DwjhPBS60OujiJH4%2bpBBEL8RLxcckjZqrp1Zag%2btDvUjmdIyaqx05ML9uXJAJh%2fsPOIwboIHvzAj5kbo2BL6YMuvrhv4DbwNsaYAzC31oJl3l",
  "keys": {
    "p256dh": "BBNHcVjnGsdhvdv8vnxnL7uk4gThxiwtV0T/WARtRg+PgDqjxvZsd5LTehhe4ANZ8rXH9a/u4BTO3l4Iw7oWhvY=",
    "auth": "gIhLeLjE/7ucfit7qWDQmQ=="
  }
}

var payload = 'Liverpool VS Manchester United';

var options = {
  gcmAPIKey: '179401483617',
  TTL: 60
}

webPush.sendNotification(
  pushSubscription,
  payload,
  options
)