// Contains link to divert your request to server

// export const host = "http://localhost:8000"
// export const profileHost = "http://localhost:3500"
// export const searchHost = "http://localhost:5432"
// export const orderHost ="http://localhost:8500"

export const host = "https://rasp-login-service.onrender.com"
export const profileHost = "https://rasp-profile-management-service.onrender.com"
export const searchHost = "https://rasp-search-service.onrender.com"
export const orderHost ="https://rasp-order-service.onrender.com";

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`

export const otpverficationRoute = `${host}/api/auth/verifyotp`

export const itemRoute = `${profileHost}/api/menu/items`
export const vendorRoute = `${profileHost}/api/profile`
export const restaurantRoute=`${searchHost}/api/vendor/restaurants`
export const searchRoute = `${searchHost}/api/search`
export const unverifiedRoute= `${profileHost}/api/admin/unverified`
export const verifiedRoute= `${profileHost}/api/admin/verified`

export const placeOrderRoute= `${orderHost}/api/order/placeOrder`
export const getOrderRoute=`${orderHost}/api/order/getOrders`
export const completedOrderRoute=`${orderHost}/api/order/getCompletedOrders`
export const orderHistoryRoute =`${orderHost}/api/order/orderhistory`
export const OrderStatusRoute=`${orderHost}/api/order/statusUpdate`


