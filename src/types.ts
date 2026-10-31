export interface Root {
  data: IPet[]
  meta: Meta
}

export interface IPet {
  id: number
  documentId: string
  title: string
  name: string
  description?: string
  age: number
  breed?: string
  isVaccinated: boolean
  colors?: Colors
  weight?: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  photo?: Photo
}

export interface Colors {
  fur?: string
  eyes?: string
  skin?: string
}

export interface Photo {
  id: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  focalPoint: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Formats {
  small: Small
  medium: Medium
  thumbnail: Thumbnail
}

export interface Small {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface Medium {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface Thumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}


export type IPetInput = Omit<
    IPet,
    "id" | "documentId" | "createdAt" | "updatedAt" | "photo" | "publishedAt"
>

export const COLORS = ["fur", "eyes", "skin"] as const
export type Color = (typeof COLORS)[number]

export const COLOR_LABELS: Record<Color, string> = {
    fur: "Мех",
    eyes: "Глаза",
    skin: "Кожа",
}