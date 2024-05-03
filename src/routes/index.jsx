const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const HOME_ROUTE = `${baseURL}home`
export const LOGIN_ROUTE = `${baseURL}login`
export const REGISTER_ROUTE = `${baseURL}register`
export const SENT_ROUTE = `${baseURL}sent`
export const COMPOSE_NEW_ROUTE = `${baseURL}compose-new`
export const INBOX_ROUTE = `${baseURL}inbox/:id`
export const SENTBOX_ROUTE = `${baseURL}sentbox/:id`
export const TRASH_ROUTE = `${baseURL}trash`
export const ERROR_ROUTE = `${baseURL}*`

// export const HOME_ROUTE = "/home"
// export const LOGIN_ROUTE = "/login"
// export const REGISTER_ROUTE = "/register"
// export const SENT_ROUTE = "/sent"
// export const COMPOSE_NEW_ROUTE = "/compose-new"
// export const INBOX_ROUTE = `/inbox/:id`
// export const SENTBOX_ROUTE = `/sentbox/:id`
// export const TRASH_ROUTE = "/trash"
// export const ERROR_ROUTE = "*"
