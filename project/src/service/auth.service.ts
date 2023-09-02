import { RoleType } from "../enum/RoleType";
import { API } from "./api";

export interface AuthData {
    authenticated: boolean
    access_token?: string
    token_type?: string
    expires_in?: number
    refresh_token?: string
    role?: RoleType
}

export const onPageLoad = async () => {
    const access_token = localStorage.getItem("access_token")
    const token_type = localStorage.getItem("token_type")
    const expires_in = parseInt(localStorage.getItem("expires_in") || "0")
    const refresh_token = localStorage.getItem("refresh_token")
    const role = localStorage.getItem("role") as RoleType

    const isTokenValid = expires_in < Date.now()

    if (access_token && isTokenValid) {
        return {
            authenticated: true,
            access_token: access_token,
            token_type: token_type,
            expires_in: expires_in,
            refresh_token: refresh_token,
            role: role
        } as AuthData
    }

    if (access_token && !isTokenValid) {
        const authUser = await refresh(refresh_token!)
            .then((data) => {
                saveToLocalStorage(data)
                return data
            })

        authUser.authenticated = true

        return authUser
    }

    return {
        authenticated: false,
    } as AuthData
}

export const onLogin = async (email: string, password: string) => {
    const response = await API.post("/login.json", {
        email: email,
        password: password
    })

    if (response.status !== 200) {
        throw new Error("Login failed")
    }

    const data = response.data as AuthData

    saveToLocalStorage(data)

    data.authenticated = true

    return data
}

const refresh = async (refresh_token: string) => {
    const response = await API.post("/refresh.json", {
        refresh_token: refresh_token
    })

    const data = response.data as AuthData

    return data
}

const clearLocalStorage = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("token_type")
    localStorage.removeItem("expires_in")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("role")
}

const saveToLocalStorage = (data: AuthData) => {
    localStorage.setItem("access_token", data.access_token!)
    localStorage.setItem("token_type", data.token_type!)
    localStorage.setItem("expires_in", (data.expires_in! + Date.now()).toString())
    localStorage.setItem("refresh_token", data.refresh_token!)
    localStorage.setItem("role", data.role!)
}