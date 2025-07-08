import axios from 'axios'
import { store } from '../store/index'
import { logout } from "../store/slice/authSlice"
// import { useTokenRefresh } from '../hooks/useTokenRefresh' // Not used directly in this file

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
console.log("BASE_URL:", BASE_URL)
const SERVICE_BASE_URLS = {
  user: `${BASE_URL}/api/v1/user`,
}

export default class HttpClient {

  constructor(service) {
    const baseURL = SERVICE_BASE_URLS[service]

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 20000,
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = store.getState()?.user?.token
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status
          const originalRequestUrl = error.config?.url

          switch (status) {
            case 401:
              if (originalRequestUrl !== '/auth/refresh-token') {
                console.warn(
                  'Global interceptor: Unauthorized. Logging out and redirecting to login.'
                )
                store.dispatch(logout())
                window.location.href = '/login'
              } else {
                console.warn(
                  'Global interceptor: Unauthorized on /refresh-token. Letting useTokenRefresh handle.'
                )
              }
              break
            case 403:
              console.warn('Forbidden.')
              break
            case 404:
              console.warn('Not Found.')
              break
            case 500:
              console.error('Server Error.')
              break
            default:
              console.warn('API Error:', error.response.data)
          }

          // Normalized error formatting
          let errorMessage = error.message || 'API Error'
          const data = error.response.data
          if (
            data &&
            typeof data === 'object' &&
            'message' in data &&
            typeof data.message === 'string'
          ) {
            errorMessage = data.message
          }

          const err = new Error(errorMessage)
          err.response = error.response
          err.data = data
          return Promise.reject(err)
        }

        return Promise.reject(error)
      }
    )
  }

  getAxios() {
    return this.axiosInstance
  }
}
