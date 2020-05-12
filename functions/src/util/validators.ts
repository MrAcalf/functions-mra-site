import {NewUser} from '../dataTypes/usersTypes'
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

const verifyErrors = (user: NewUser) => {
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
    const errors: SignupErrors = verifyErrors(user)
    const valid: boolean = Object.keys(errors).length === 0 ? true : false
    return{
        valid,
        errors
    }
}

export {validateSignupData}