import { createPartnerAds } from "./handlers/partnersAds"
const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')
app.use(cors())
const FBAuth = require('./util/fbAuth')
const {getAllPosts} = require('./handlers/posts')
const {signup, login} = require('./handlers/users')

// Get Requests
app.get('/posts', getAllPosts)
//Post Requests
app.post('/signup', signup)
app.post('/login', login)
app.post('/ads',FBAuth ,createPartnerAds )


exports.api = functions
.region('us-east1')
.https
.onRequest(app)