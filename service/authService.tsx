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
}

export default new Authservice()
