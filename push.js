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
  "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAADLS5iazYqn%2btkOExPBicw2LapS5SrDBf%2f03bwuq0sf%2fRr5cBrcV5D7OFoCtl%2bx4HYG1D9SKStfZ02NGaQCzNnFCiR6LgULUzp8L5hvAifmKQ6hfptrFaHE7DOhPAvFOe52H3VFEueZMUz5XzkZ00tSotrs4VGMf2TDdKLJ%2bLwCDRZYwWizjd3ILVRIJ8MqhTvmqH%2bIjRXljzca2ilMnrJY%2fEVrhz0ANCfASyILDjqV7Pgjj0J77b9ka27MnNFwMji2ZHBSBUyBzrHrOi49LNFNHEuY2iXaM9SiYwZry7oVaimIRW9yKR1aQzKk5BKaCns%3d",
  "keys": {
    "p256dh": "BAFxFXRM8Ijm45dobS9i1ULfR7QUNd7WHxEaUe1R0Dbw20LWFrb1WHm0gXzgK1eR2+xll7WZq9rZad3Hxxr+tFk=",
    "auth": "sukhE+9Yn0koNfEBAVPhCg=="
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