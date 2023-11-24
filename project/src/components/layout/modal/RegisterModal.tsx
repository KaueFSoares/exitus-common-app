import { Dispatch, SetStateAction } from "react"
import { Select } from "@radix-ui/themes"
import { RegisterType } from "../../../types/Register"
import Modal from "./Modal"

interface Props {
  handleOnClose: Dispatch<SetStateAction<boolean>>
  type: RegisterType | null
  setType: Dispatch<SetStateAction<RegisterType | null>>
  handleDateStartChange: (date: string) => void
  handleDateEndChange: (date: string) => void
  dateStart: string
  dateEnd: string
}

const RegisterModal = ({
  handleOnClose,
  type,
  setType,
  handleDateStartChange,
  handleDateEndChange,
  dateStart,
  dateEnd,
}: Props) => {
  return (
    <Modal handleOnClose={handleOnClose} title="Filtros">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-semibold text-2xl px-2 flex items-center h-full">
          {"Tipo: "}
        </h2>

        <Select.Root defaultValue={type ? type : "none"} size={"3"} onValueChange={ (value) => setType(value === "none" ? null : value as RegisterType) }>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="in" className="text-xl">Entrada</Select.Item>
              <Select.Item value="out">Saída</Select.Item>
              <Select.Item value="none">Qualquer</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl px-2 my-4">{"Data:"}</h2>

        <div 
          className="flex justify-between gap-4 mb-4 bg-white rounded-xl py-2 px-4"
        >
          <p className="text-light-green font-semibold text-xl">
            De:
          </p>

          <input 
            type="date" 
            name="date-start" 
            id="" 
            value={dateStart}
            className="flex-grow text-light-green text-lg outline-none"
            onChange={(e) => handleDateStartChange(e.target.value)}
          />
        </div>

        <div 
          className="flex justify-between gap-4 bg-white rounded-xl py-2 px-4"
        >
          <p className="text-light-green font-semibold text-xl">
            Até:
          </p>

          <input 
            type="date" 
            name="date-end" 
            id="" 
            value={dateEnd}
            className="flex-grow text-light-green text-lg outline-none"
            onChange={(e) => handleDateEndChange(e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        className="bg-white text-light-green flex items-center justify-center p-2 w-full mt-4 font-bold text-2xl rounded-xl"
        onClick={() => handleOnClose(false)}
      >
        Concluir
      </button>

    </Modal>
  )
}

export default RegisterModal
