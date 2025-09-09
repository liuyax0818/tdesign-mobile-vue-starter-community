export interface UserTag {
  label: string
  icon: string
}

export interface UserInfo {
  id?: string
  username: string
  avatar: string
  address: string
  gender: 'man' | 'women' | 'secret'
  birthday: string
  bio?: string
  tags?: UserTag[]
  token?: string
}
