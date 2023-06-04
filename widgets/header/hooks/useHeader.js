import { create } from 'zustand'

const initState = {
  title: '',
}

const useHeader = create((set, get) => ({
  ...initState,
  reset: () => {
    set(initState)
  },
  setHeader: props => {
    set({ ...props })
  },
  setTitle: text => {
    set({ title: text })
  }
}))

export default useHeader