import Mock from 'mockjs'
const Random = Mock.Random

function createList(min=0, max=10) {
  const len = Random.integer(min, max)
  const arr = []
  for(let i=0;i<len;i++) {
    const obj = {
      username: Mock.nickname(),
      password: Random.id()
    }
    arr.push(obj)
  }
  return arr
}


export default [
  {
    url: '/login',
    method: 'post',
    response: res => {
      const user = {
        username: 'admin',
        password: '123456'
      }
      const flag = Mock.valid(user, res.body)
      if(!flag.length) {
        return {
          code: 200,
          message: 'ok',
          data: {
            username: 'admin',
            token: Random.guid()
          }
        }
      }else{
        return {
          code: 204,
          message: '用户名或密码错误',
          data: null
        }
      }
    }
  },
  {
    url: '/home',
    method: 'get',
    response: res => {
      const arr = createList()
      return [
        {
          title: Mock.nickname(),
          desc: Mock.text(),
          create_at: Random.datetime('yyyy-MM-dd HH:mm:ss'),
          total: arr.length,
          list: arr
        },
        {
          title: Mock.nickname(),
          desc: Mock.text(),
          create_at: Random.datetime('yyyy-MM-dd HH:mm:ss'),
          total: arr.length,
          list: arr
        },
        {
          title: Mock.nickname(),
          desc: Mock.text(),
          create_at: Random.datetime('yyyy-MM-dd HH:mm:ss'),
          total: arr.length,
          list: arr
        },
      ]
    }
  }
]
