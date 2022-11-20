import router from './index';

router.beforeEach((to, from, next) =>{
  if(to.meta.auth){
    let token = localStorage.getItem('token')
    if(token) {
      next()
    }else{
      next({
        name:'Login'
      })
    }
  }else{
    next()
  }
})