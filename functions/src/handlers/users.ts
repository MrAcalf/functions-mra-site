import { db } from '../util/admin'
import * as firebase  from 'firebase'
const config = require('../../firebasecongif.json')
import { NewUser, LoginUser } from '../dataTypes/usersTypes'
import { IsValid } from '../dataTypes/isValid'
import {
    validateSignupData, 
    validateLoginData, 
    //validateLoginData, 
    //reduceUserDetails
} from '../util/validators'
if (firebase.apps.length === 0) {
    firebase.initializeApp({
        config
    })
}

const signup = (_req: any, _res: any) => {
    const newUser: NewUser =  {
        email: _req.body.email,
        password: _req.body.password,
        confirmPassword: _req.body.confirmPassword,
        handle: _req.body.handle
    }

    const isValid: IsValid = validateSignupData(newUser)

    if(!isValid.valid) return _res.status(400).json(isValid.errors)

    const noImg: string = 'no-img.png'

    let token: string, userId: string
    db
    .doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
        if (doc.exists) {
            return _res.status(400).json({ handle: 'this handle is already taken' })
        } else {
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
    })
    .then((data) => {
        userId = data.user.uid
        return data.user.getIdToken()
    })
    .then((idToken) => {
        token = idToken
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
            config.storageBucket
            }/o/${noImg}?alt=media`,
            userId
        }
        return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
        return _res.status(201).json({ token })
    })
    .catch((err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
            return _res.status(400).json({ email: 'Email is already is use' })
        } else {
            return _res.status(500).json({ general: 'Something went wrong, please try again.' })
        }
    })
}

const login = (_req: any, _res: any) => {
    const user: LoginUser = {
        email: _req.body.email,
        password: _req.body.password
    }

    const isValid: IsValid = validateLoginData(user)

    if(!isValid.valid) return _res.status(400).json(isValid.errors)

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data: any) => {
            return data.user.getIdToken()
        })
        .then((token) => {
            return _res.json({ token })
        })
        .catch((err) => {
        console.error(err)            
            return _res
                .status(403)
                .json({ general: 'Wrong credentials, please try again' })
        })
}



export {signup, login}