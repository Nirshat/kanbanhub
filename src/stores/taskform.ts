import { create } from "zustand";

interface State {
  opens: any[]
}

interface Actions {
  setOpens: (type:any) => void
  setCloses: (type:any) => void
}

export const useTaskForm = create<State & Actions>((set) => {
  return{
    opens: [],
    setOpens: (type) => set((state) => {
      return{
        ...state,
        opens: [type, ...state.opens]
      }
    }),
    setCloses: (type) => set((state) => {
      const closes = state.opens.filter((formType) => formType != type );
      return {
        ...state,
        opens: [...closes]
      }
    })
  }
})