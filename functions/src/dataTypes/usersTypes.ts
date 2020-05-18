type NewUser = {
    email: string,
    password: string,
    confirmPassword: string,
    handle: string
}

type LoginUser = {
    email: string,
    password: string
}

export { NewUser, LoginUser }