import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'

export default class UserStore {
  @persist @observable saveEmail
  @persist @observable session_key
  @persist('object') @observable currentUser
  @persist @observable isAuthenticated
  constructor() {
    this.currentUser = {}
    this.isAuthenticated = null
    this.saveEmail = ''
    this.session_key = ''
  }

  @action authenticate = ({ key: session_key, ...user }) => {
    this.isAuthenticated = true
    this.session_key = session_key
    this.currentUser = user
  }

  @action setSaveEmail = (email) => {
    this.saveEmail = email
  }

  @action logout = (options = {}) => {
    const { isRedirect = true } = options
    this.currentUser = {}
    this.isAuthenticated = null
    this.session_key = ''
    if(isRedirect) {
      window.location.href = '/'
    }
  }
}
