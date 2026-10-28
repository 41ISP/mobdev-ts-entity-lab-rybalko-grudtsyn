import { useState, FormEvent } from "react"
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
        fur: "",
        eyes: "",
        skin: "",
    },
    weight: 0,
}


export function PetForm() {
    const [form, setForm] = useState<IPetInput>(initialForm)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const addPet = usePetsStore((state) => state.addPet)

    const setField = <K extends keyof IPetInput>(field: K, value: IPetInput[K]) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError(null)
        setIsSubmitting(true)

        try {
            await addPet(form)
            setForm(initialForm)
        } catch (err: any) {
            setSubmitError(err.message ?? "Не удалось создать питомца")
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Добавить питомца</h2>

            {submitError && <p className="error">{submitError}</p>}

            <label className="field">
                Вид
                <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                />
            </label>

            <label className="field">
                Имя
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    value={form.description ?? ""}
                    onChange={(e) => setField("description", e.target.value)}
                />
            </label>

            <label className="field">
                Возраст
                <input
                    type="number"
                    min={0}
                    step={1}
                    value={form.age}
                    onChange={(e) => setField("age", Number(e.target.value))}
                />
            </label>

            <label className="field">
                Порода
                <input
                    type="text"
                    value={form.breed ?? ""}
                    onChange={(e) => setField("breed", e.target.value)}
                />
            </label>

            <label className="check">
                <input
                    type="checkbox"
                    checked={form.isVaccinated}
                    onChange={(e) => setField("isVaccinated", e.target.checked)}
                />
                Привит
            </label>

            <label className="field">
                Цвет меха
                <input
                    type="text"
                    value={form.colors.fur ?? ""}
                    onChange={(e) =>
                        setField("colors", { ...form.colors, fur: e.target.value })
                    }
                />
            </label>

            <label className="field">
                Цвет глаз
                <input
                    type="text"
                    value={form.colors.eyes ?? ""}
                    onChange={(e) =>
                        setField("colors", { ...form.colors, eyes: e.target.value })
                    }
                />
            </label>

            <label className="field">
                Цвет кожи
                <input
                    type="text"
                    value={form.colors.skin ?? ""}
                    onChange={(e) =>
                        setField("colors", { ...form.colors, skin: e.target.value })
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
                    onChange={(e) => setField("weight", Number(e.target.value))}
                />
            </label>

              <label className="field">
                Фото
                <input type="file"/>
            </label>

            <button className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Сохраняем..." : "Добавить"}
            </button>
        </form>
    )
}
