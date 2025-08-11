import { faker } from '@faker-js/faker'

export default [
  {
    url: '/api/getUserList',
    method: 'GET',
    response: ({ query }) => {
      return {
        code: 200,
        message: '成功',
        total: 0,
        data: [],
      }
    },
  },
  {
    url: '/api/getUserInfo',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          username: '菜虚鲲',
          age: 25,
          address: faker.location.city(),
        },
      }
    },
  },
]
