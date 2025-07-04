import HttpClient from "../lib/axiosInstance"

class Authservice {
    private api: HttpClient
    constructor() {
        this.api = new HttpClient("user")
    }

    async signup(userData: any) {
        try {
            const response = await this.api.getAxios().post('/register', userData)
            return response
        } catch (error: any) {
            console.log("Register failed:", error.message)
            throw error
        }
    }

    async login(userData: any) {
        try {
            const response = await this.api.getAxios().post('/login', userData)
            return response
        } catch (error: any) {
            console.log("Login failed:", error.message)
            throw error
        }
    }

    // Email Verification
    async verifyEmailToken(token: string) {
        try {
            const response = await this.api.getAxios().get(`/auth/verify-email?token=${token}`)
            return response
        } catch (error: any) {
            console.log("Email verification failed:", error.message)
            throw error
        }
    }
}

export default new Authservice()
