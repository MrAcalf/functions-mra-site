import * as admin from 'firebase-admin'
let serviceAccount = require('../../serviceaccountkey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://website-mra.firebaseio.com"
})

const db = admin.firestore()

export {admin, db}