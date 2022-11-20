
export default{
  namespaced: true,
  state:{
    userInfo:{}
  },
  mutations:{
    setUser(state,payload){
      state.userInfo = payload
    }
  },
  actions:{
  }
}