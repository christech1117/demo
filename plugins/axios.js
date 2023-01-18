import { Message } from 'element-ui'

export default function({ $axios, redirect }) {
  $axios.onRequest(
    config => {
      if (localStorage.getItem('token')) {
        config.headers['Authorization'] = `${localStorage.getItem('token')}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    response => {
      const res = response.data

      if (res.status !== 'success') {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5000
        })
      } else {
        return res
      }
    },
    error => {
      if (error.message === 'Request failed with status code 403') {
        localStorage.removeItem('token')
        redirect('/')
      } else {
        Message({
          message: error.response ? error.response.data.message : error.message,
          type: 'error',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
  )
}
