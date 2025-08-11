import type { FormRules } from 'tdesign-mobile-vue'
import type { ProfileForm } from './types'

export const rules: FormRules<ProfileForm> = {
  username: [{ validator: (val: any) => val !== '', message: '请输入用户名', trigger: 'blur' }],
  gender: [{ validator: (val: any) => val !== '', message: '请选择性别', trigger: 'change' }],
  birthday: [{ validator: (val: any) => val !== '', message: '请选择性别', trigger: 'change' }],
  address: [{ validator: (val: any) => val !== '', message: '请选择地址', trigger: 'change' }],
  bio: [{ validator: (val: any) => val !== '', message: '请输入个人简介', trigger: 'blur' }],
}
