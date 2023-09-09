import { RegisterType } from "../enum/RegisterType"

export interface IRegister {
  id: number,
  user_id: number,
  date_time: Date,
  type: RegisterType,
}
