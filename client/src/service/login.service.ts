import { API } from './app.service'

class LogIn {
    logList: any[] = [];
    token = 'token';

    async loginUser(credentials: { email: string, password: string },role:string) {
        return await fetch(`${API}/register/login/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: credentials })
        })
            .then(data => data.json())
    }
    async signUpUser(credentials: { name: string, password: string, password1: string, email: string },role:string) {
        return await fetch(`${API}/register/signUp/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: credentials })
        })
            .then(data => data.json())
    }
    async approveHr(credentials: { _id: string, isAuth: boolean, section: string },role:string) {
        return await fetch(`${API}/register/auth/${role}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: credentials })
        })
            .then(data => data.json())
    }
    async getUserUseToken(token: string,role:string) {
        try {
            return await fetch(`${API}/register/useToken/${role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
            })
                .then(data => {
                    return data.json()
                })
        }
        catch (err) { console.error(err) }
    }

    getToken() {
        return this.getTokenLocal() || this.getTokenSession()|| '';
    }

    removeToken() {
        localStorage.removeItem(this.token);
        sessionStorage.removeItem(this.token);
    }

    setTokenSession(userToken: string) {
        const token = 'token'
        sessionStorage.setItem(token, userToken);
    }

    getTokenSession() {
        return sessionStorage.getItem(this.token);
    }

    setTokenLocal(userToken: string) {
        const token = 'token'
        localStorage.setItem(token, userToken);
    }

    getTokenLocal() {
        return localStorage.getItem(this.token);
    }

    refreshToken(token: string) {
        if (this.getTokenLocal()) {
            this.setTokenLocal(token)
        }
        else if (this.getTokenSession()) {
            this.setTokenSession(token)
        }
    }
}
export default new LogIn();