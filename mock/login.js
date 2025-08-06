// import { defineMockModule } from '../build/mock'
import { faker } from '@faker-js/faker'

export default {
  url: '/api/login',
  method: 'POST',
  response: ({ body }) => {
    if (body?.username === '菜虚鲲' && body?.password === 'ctrl') {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          id: '114514',
          username: '菜虚鲲',
          address: faker.location.city(),
          token: 'ji.ni.taimei',
        },
      }
    }

    return {
      code: 401,
      msg: '用户或密码错误',
    }
  },
}
