import { axiosApi } from './axios'

export const getUserInfo = (data) => {
  return axiosApi('/user/get_user_info', 'post', data)
}
