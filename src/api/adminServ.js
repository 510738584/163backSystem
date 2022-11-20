import ins from './request'
const baseUrl = 'http://localhost:5008/api/admin'

export const login = async function(loginForm){
  const resp = await ins().post(`${baseUrl}/login`, loginForm)
  return resp
}

export const register = async function(register){
  const resp = await ins().post(`${baseUrl}/loginAdd`, register)
  return resp
}

export const whoAmI = async function(id){
  return await ins().get(`${baseUrl}/whoami`,id)
}