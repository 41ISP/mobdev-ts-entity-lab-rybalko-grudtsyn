import type { IPet } from "../types"
import { COLOR_LABELS } from "../types"
import type { Color } from "../types"

interface PetCardProps extends IPet {
    onDelete: (documentId: string) => void
}
export function PetCard({
    documentId,
    title,
    name,
    description,
    age,
    breed,
    isVaccinated,
    colors,
    weight,
    photo,
    onDelete,
}: PetCardProps)  {
    const imageUrl = photo?.url ? `https://strapi.kitek-pg.ru${photo.url}` : null
      return (
        <article className="card">
            <div className="card__cover">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={photo?.alternativeText ?? title}
                    />
                ) : (
                    <span>{title.charAt(0).toUpperCase()}</span>
                )}
                <b className="card__badge">{age} г.</b>
            </div>

            <div className="card__body">
                <h3>{title}</h3>

                {description && <p className="card__desc">{description}</p>}

                <p className="card__meta">
                    Кличка: {name} · Порода: {breed} · Привит:{" "}
                    {isVaccinated ? "да" : "нет"}
                </p>

                {weight != null && (
                    <p className="card__meta">Вес: {weight.toFixed(1)} кг</p>
                )}

                <div className="chips">
                    {colors && Object.entries(colors).map(([key, value], i) => (
                        <span key={i} className="chip">
                             {COLOR_LABELS[key as Color]}: {value as string}
                        </span>
                    ))}
                </div>
            </div>

            <footer className="card__footer">
                <strong>{name}</strong>
                <button className="link-btn" onClick={() => onDelete(documentId)}>
                    Удалить
                </button>
            </footer>
        </article>
    )
}