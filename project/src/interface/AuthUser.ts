import { RoleType } from "../enum/RoleType"

export interface AuthUser {
    email: string
    role: RoleType
}