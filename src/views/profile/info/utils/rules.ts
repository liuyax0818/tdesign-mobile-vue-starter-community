import type { FormRules, UploadFile } from 'tdesign-mobile-vue'
import type { ProfileForm } from './types'

export const rules: FormRules<ProfileForm> = {
  username: [
    { validator: (val: any) => val !== '', message: '用户名不能为空', trigger: 'blur' },
    { min: 2, message: '用户名至少需要2个字符', trigger: 'blur' },
    { max: 20, message: '用户名不能超过20个字符', trigger: 'blur' },
    {
      pattern: /^[\u4E00-\u9FA5\w\s]+$/,
      message: '用户名只能包含中文、英文、数字、下划线和空格',
      trigger: 'blur',
    },
  ],
  gender: [
    { validator: (val: any) => val !== '', message: '请选择性别', trigger: 'change' },
  ],
  birthday: [
    { validator: (val: any) => val !== '', message: '请选择生日', trigger: 'change' },
    {
      validator: (val: string) => {
        const birthDate = new Date(val)
        const today = new Date()
        if (birthDate.getFullYear() > today.getFullYear()) {
          return false
        }
        const age = today.getFullYear() - birthDate.getFullYear()
        return age >= 0 && age <= 150
      },
      message: '请选择一个有效的生日日期',
      trigger: 'change',
    },
  ],
  address: [
    { validator: (val: any) => val !== '', message: '请选择地址', trigger: 'change' },
  ],
  bio: [
    { validator: (val: any) => val !== '', message: '请输入个人简介', trigger: 'blur' },
  ],
  photos: [
    {
      validator: (val: UploadFile[]) => val.length <= 12,
      message: '最多上传12张照片',
      trigger: 'change',
    },
  ],
}
