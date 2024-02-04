// Contains link to divert your request to server
export const host = "http://localhost:8000"
export const profileHost = "http://localhost:3500"
export const searchHost = "http://localhost:5432"

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`

export const otpverficationRoute = `${host}/api/auth/verifyotp`

export const itemRoute = `${profileHost}/api/menu/items`
export const vendorRoute = `${profileHost}/api/profile`
export const restaurantRoute=`${searchHost}/api/vendor/restaurants`
export const searchRoute = `${searchHost}/api/search`


