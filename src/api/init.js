import store from '@/store'

if(localStorage.getItem('token')){
  store.commit('user/setUser', JSON.parse(localStorage.getItem('token')))
}