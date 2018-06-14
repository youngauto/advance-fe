import Cookies from 'js-cookies'

export const TOKEN_KEY = 'token'

/**
 * 工具
 */
export const setToken = (token, exp=1) => {
  Cookies.setItem(TOKEN_KEY, token, {expires: exp})
}

export const getToken = () => {
  const token = Cookies.getItem(TOKEN_KEY)
  if (token) return token
  else return false 
}