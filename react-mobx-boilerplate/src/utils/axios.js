import axios from 'axios'
import { stores } from '../stores'
const URL = process.env.NODE_ENV !== 'production' ? '/api' : 'http://https://home-test.zerone.dev/api'

export function axiosApi(url, method = 'GET', data, options = {}) {
  const { session_key, currentUser } = stores.userStore
  if(data && data.isToken) {
    delete data.isToken
    data = { token: session_key, email: currentUser.email, ...data }
  } else {
    data = { key: session_key, email: currentUser.email, ...data }
  }
  data = method.toUpperCase() === 'GET' ? { params: {...data} } : { data }

  const defaultConfing = {
    url: URL + url,
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const config = {
    ...defaultConfing,
    ...data,
    ...options
  }

  return axios(config)
    .then((response) => {
      const { data } = response
      if(data.status || data.result_code) {
        data.status_code = data.status || data.result_code
      }
      if(data.status_code !== 200) {
        if([561,562,563,564,542].find(code => code === data.status_code)) {
          stores.userStore && stores.userStore.isAuthenticated && stores.userStore.logout()
        }
        data.extra_msg && alert(data.extra_msg)
        throw data
      }

      return response
    })
}
