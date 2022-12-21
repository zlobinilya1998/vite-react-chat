import create from 'zustand'

const useStore = create((set) => ({
    user: null,
    setUser: (payload) => set({ user: payload }),
}))

export default useStore
