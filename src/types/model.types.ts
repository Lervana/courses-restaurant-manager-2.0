// COMMON
export type TItem = {
    id: string
}

export type TData<T extends TItem> = {
    createDate: string
    lastUpdateDate: string
    items: T[]
}

// MENU
export const Categories = [
    'Nibbles',
    'Starters',
    'Salads',
    'Soups',
    'Rice',
    'Sushi Rolls',
    'Sushi Sets',
    'Drinks',
] as const

export type TCategory = typeof Categories[number]

export type TMenuItem = {
    id: string
    name: string
    price: number
    category: TCategory
}

export type TMenu = TData<TMenuItem>

export type TCategorizedMenu = {
    createDate: string
    lastUpdateDate: string
    items: Record<TCategory, TMenuItem[]>
}
