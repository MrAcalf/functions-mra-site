const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')
app.use(cors())
const { db, admin } = require('./util/admin')
//const FBAuth = require('./util/fbAuth')
const {getAllPosts} = require('./handlers/posts')
const {signup} = require('./handlers/users')


app.get('/posts', getAllPosts)
app.post('/signup', signup)

exports.api = functions
.region('us-east1')
.https
.onRequest(app)