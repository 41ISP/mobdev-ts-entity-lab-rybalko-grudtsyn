import { PetCard } from "./components/PetCard"
import { PetForm } from "./components/PetForm"
import { useEffect } from "react"
import { usePetsStore } from "./usePetsStore"
import "./App.css"

export default function App() {
    const { pets, isLoading, error, fetchPets, removePet } = usePetsStore()

    useEffect(() => {
        fetchPets()
    }, [])

    const petsCount = pets?.length ?? 0

    if (isLoading && pets.length === 0) {
        return (
            <div className="layout">
                <header className="top">
                    <h1>Мои питомцы</h1>
                </header>
                <main>
                    <p className="hint">Загрузка…</p>
                </main>
            </div>
        )
    }
     return (
        <div className="layout">
            <header className="top">
                <h1>Мои питомцы</h1>
                <span className="pill">{petsCount}</span>
            </header>

            <aside>
                <PetForm />
            </aside>

            <main>
                {error && <p className="error">Ошибка: {error}</p>}

                {!isLoading && petsCount === 0 && !error && (
                    <p className="hint">Добавьте питомца</p>
                )}

                <div className="grid">
                    {pets?.map((pet) => (
                        <PetCard key={pet.documentId} {...pet} onDelete={removePet}/>
                    ))}
                </div>
            </main>
        </div>
    )
}
