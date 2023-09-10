import { RegisterType } from "../enum/RegisterType"

export interface IRegister {
  id: string,
  user_id: string,
  date_time: Date,
  type: RegisterType,
}
