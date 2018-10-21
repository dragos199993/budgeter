import axios from 'axios'
import store from '../store/index'
import router from '../router'

const url = 'http://localhost:5000/api/user/'

class UserService {
  static signUp (user) {
    return axios.post(`${url}signup`, user).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('jwt', response.data.token)
      if (localStorage.getItem('jwt') !== null) {
        store.commit('authentication/UPDATE_AUTHENTICATION', true)
        router.push('/')
      }
    })
  }
  static signIn (user) {
    return axios.post(`${url}signin`, user).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('jwt', response.data.token)
      if (localStorage.getItem('jwt') !== null) {
        store.commit('authentication/UPDATE_AUTHENTICATION', true)
        router.push('/')
      }
    })
  }
}

export default UserService
