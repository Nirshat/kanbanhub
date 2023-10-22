import {create} from 'zustand'

interface State {
  show: boolean
}

interface Actions {
  setShow: (open:boolean) => void
}


export const useShowModal = create<State & Actions>((set) => {
  return {
    show: false,
    setShow: (open) => set((state) => {
      return {
        ...state,
        show: open
      }
    })
  }
}) 