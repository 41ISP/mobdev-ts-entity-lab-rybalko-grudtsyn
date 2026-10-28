import axios from "axios";
import type { IPet } from "./types";


export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

export const api = {
    getPets: async () => {
        const res = await apiInstance.get<{ data: IPet[] }>("/pets?populate=*")
        console.log(res)
        return res.data.data
    },
    createPet: async (input: any) => {
        const res = await apiInstance.post("/pets", { data: input })
        return res.data
    },
    deletePet: async (documentId: string) => {
        await apiInstance.delete(`/pets/${documentId}`)
    },
}