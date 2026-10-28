import { create } from "zustand"
import { api } from "./api"
import type { IPet } from "./types"
import type { IPetInput } from "./types"


interface IPetsState {
    pets: IPet[]
    isLoading: boolean
    error: string | null
    fetchPets: () => Promise<void>
    addPet: (input: IPetInput) => Promise<void>
    removePet: (documentId: string) => Promise<void>
}

export const usePetsStore = create<IPetsState>((set, get) => ({
    pets: [],
    isLoading: false,
    error: null,

    fetchPets: async () => {
        set({ isLoading: true, error: null })
        try {
            const data = await api.getPets()
            console.log(data)
            set({ pets: data })
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || "Ошибка загрузки котов"
            set({ error: msg })
        } finally {
            set({ isLoading: false })
        }
    },

    addPet: async (input) => {
        set({ isLoading: true, error: null })
        try {
            await api.createPet(input)
            await get().fetchPets() 
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || "Ошибка создания"
            set({ error: msg })
            throw err 
        } finally {
            set({ isLoading: false })
        }
    },

    removePet: async (documentId) => {
        try {
            await api.deletePet(documentId)
            await get().fetchPets()
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || "Ошибка удаления"
            set({ error: msg })
        }
    },
}))