
import axios from 'axios';

export default function(){
  const token = localStorage.getItem('token');
  let ins = axios;
  if(token){
    ins = axios.create({
      headers:{
        authorization: 'bearer ' + token,
      }
    })
  }
  ins.interceptors.response.use((resp) => {
    try{
      if(resp.headers.authorization){
        localStorage.setItem('token', resp.headers.authorization)
      }
    }catch(err){return null}
    return resp.data;
  }, err =>{
    if (err.response.status === 403) {
      //响应的时候，如果响应码是403，说明没有token或token失效，需要在本地删除token
      localStorage.removeItem('token')
    }
    return Promise.reject(err);
  })
  return ins;
}

