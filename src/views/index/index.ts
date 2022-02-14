import http from '../../http/index'
export function getList(type:string) {
  return http.get('/list', {
    params: {
      type
    }
  }).then(res=> res.data)
}