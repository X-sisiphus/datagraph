import Cookies from 'js-cookie'

const TokenKey = 'Token';
const uidKey = 'Uid';

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUid() {
    return Cookies.get(uidKey)
}

export function setUid(uid) {
    return Cookies.set(uidKey, uid)
}