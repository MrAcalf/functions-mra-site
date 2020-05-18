import {NewUser, LoginUser} from '../dataTypes/usersTypes'
import {SignupErrors} from '../dataTypes/errorsTypes'
const isEmail = (email: string) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regEx)) return true
    else return false
}

const isEmpty = (data: string) => {
    if (data.trim() === '') return true
    else return false
}

const verifySignupErrors = (user: NewUser) => {
    let errors: SignupErrors = {}
    if (isEmpty(user.email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(user.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(user.password)) errors.password = 'Must not be empty'
    if (user.password !== user.confirmPassword) errors.confirmPassword = 'Passwords must match'
    if (isEmpty(user.handle)) errors.handle = 'Must not be empty'
    return errors
}

const validateSignupData = (user: NewUser) => {    
    const errors: SignupErrors = verifySignupErrors(user)
    const valid: boolean = Object.keys(errors).length === 0 ? true : false
    return{
        valid,
        errors
    }
}

const verifyLoginErrors = (userData: LoginUser) => {
    let errors: SignupErrors = {}
    if (isEmpty(userData.email)) errors.email = 'Must not be empty'
    if (isEmpty(userData.password)) errors.password = 'Must not be empty'
    return errors
}

const validateLoginData = (userData: LoginUser) => {
    const errors: SignupErrors = verifyLoginErrors(userData)
    const valid: boolean = Object.keys(errors).length === 0 ? true : false
    return{
        valid,
        errors
    }
}

const validateReqUrl = (_url: string) => {
    let reqUrl: string = _url

    if(!isEmpty(reqUrl.trim())){
        if(reqUrl.trim().substring(0, 4) !== 'http'){
            reqUrl = `https://${reqUrl.trim()}`
        } else reqUrl = _url
    }
    return reqUrl
}
export {validateSignupData, validateLoginData, validateReqUrl}