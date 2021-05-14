import Cookies from 'js-cookie'
import $validate  from './validate'
const TokenKey = 'forum-token'
const refreshTokenKey = 'forum-refreshToken'

export default {
  checkAuth() {
    return !$validate.isNull(this.getToken())
  },
  getToken() {
    return Cookies.get(TokenKey)
  },
  setToken(token) {
    return Cookies.set(TokenKey, token)
  },
  getRefreshToken() {
    return Cookies.get(refreshTokenKey)
  },
  setRefreshToken(refreshToken) {
    return Cookies.set(refreshTokenKey, refreshToken)
  },
  removeToken() {
    window.sessionStorage.clear()
    Cookies.remove(TokenKey)
    Cookies.remove(refreshTokenKey)
  }
}
