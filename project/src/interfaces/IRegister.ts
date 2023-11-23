import { RegisterEnum } from "../enum/RegisterType"

export interface IRegister {
  id: string,
  user_id: string,
  time: Date,
  type: RegisterEnum,
}

export interface IRegisterResponse {
  registers: {
    id: string,
    register_type: string,
    time: string,
    created_at: string,
    updated_at: string,
    user_id: string,
  }[],
  count: number,
}
