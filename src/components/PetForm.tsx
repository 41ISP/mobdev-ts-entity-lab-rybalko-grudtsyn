import { useState, type FormEvent } from "react"
import { usePetsStore } from "../usePetsStore"
import type { IPetInput } from "../types"

const initialForm: IPetInput = {
    title: "",
    name: "",
    description: "",
    age: 0,
    breed: "",
    isVaccinated: false,
    colors: {

    },
    weight: 0,
}


export function PetForm() {
    const [form, setForm] = useState<IPetInput>(initialForm)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const addPet = usePetsStore((state) => state.addPet)

    const onChange = <K extends keyof IPetInput>(key: K, value: IPetInput[K]) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            await addPet(form)
            setForm(initialForm)
        } catch (err: any) {
            setError(err.message ?? "Не удалось создать питомца")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить питомца</h2>

            {error && <p className="error">{error}</p>}

            <label className="field">
                Вид
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => onChange("title", e.target.value)}
                />
            </label>

            <label className="field">
                Имя
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    value={form.description ?? ""}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </label>

            <label className="field">
                Возраст
                <input
                    type="number"
                    min={0}
                    step={1}
                    value={form.age}
                    onChange={(e) => onChange("age", Number(e.target.value))}
                />
            </label>

            <label className="field">
                Порода
                <input
                    type="text"
                    value={form.breed ?? ""}
                    onChange={(e) => onChange("breed", e.target.value)}
                />
            </label>

            <label className="check">
                <input
                    type="checkbox"
                    checked={form.isVaccinated}
                    onChange={(e) => onChange("isVaccinated", e.target.checked)}
                />
                Привит
            </label>

            <label className="field">
                Цвет меха
                <input
                    type="text"
                    value={form.colors?.fur ?? ""}
                    onChange={(e) =>
                        onChange("colors", { ...form.colors, fur: e.target.value })
                    }
                />
            </label>

            <label className="field">
                Цвет глаз
                <input
                    type="text"
                    value={form.colors?.eyes ?? ""}
                    onChange={(e) =>
                        onChange("colors", { ...form.colors, eyes: e.target.value })
                    }
                />
            </label>

            <label className="field">
                Цвет кожи
                <input
                    type="text"
                    value={form.colors?.skin ?? ""}
                    onChange={(e) =>
                        onChange("colors", { ...form.colors, skin: e.target.value })
                    }
                />
            </label>

            <label className="field">
                Вес
                <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.weight ?? 0}
                    onChange={(e) => onChange("weight", Number(e.target.value))}
                />
            </label>

              <label className="field">
                Фото
                <input type="file"/>
            </label>

            <button className="btn" disabled={isLoading}>
                {isLoading ? "Сохраняем..." : "Добавить"}
            </button>
        </form>
    )
}
