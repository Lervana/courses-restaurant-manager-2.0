import {
    getOne,
    getDataPath,
    add,
    update,
    remove,
    getAll,
} from 'src/services/utils.service'

import {
    TMenuItem,
    TMenu,
    TCategorizedMenu,
    TCategory,
} from 'src/types/model.types'

const MENU_FILE_PATH = getDataPath('menu.json')

export const MENU_ERRORS = {
    MENU_001: {
        key: 'MENU_001',
        status: 500,
        message: 'Cannot read menu file',
    },
    MENU_002: {
        key: 'MENU_002',
        status: 400,
        message: 'Cannot add this item, id and name must be unique',
    },
    MENU_003: {
        key: 'MENU_003',
        status: 404,
        message: 'Menu item with given id not found',
    },
    MENU_004: {
        key: 'MENU_004',
        status: 400,
        message: 'Cannot update this item, id and name must be unique',
    },
}

export const getMenu = (): TMenu => {
    return getAll({
        dataFilePath: MENU_FILE_PATH,
        dataFileNotFoundError: MENU_ERRORS.MENU_001.key,
    })
}

export const getMenuItem = (id: string): TMenuItem | undefined => {
    return getOne({
        id,
        dataFilePath: MENU_FILE_PATH,
        dataFileNotFoundError: MENU_ERRORS.MENU_001.key,
    })
}

export const getCategorizedMenu = (): TCategorizedMenu => {
    const menu = getMenu()
    const parsedItems = menu.items.reduce((old, current) => {
        const item = { ...old }
        if (!item[current.category]) item[current.category] = []
        item[current.category].push(current)
        return item
    }, {} as Record<TCategory, TMenuItem[]>)

    return { ...menu, items: parsedItems }
}

export const addToMenu = (item: TMenuItem): TMenuItem => {
    return add({
        dataFilePath: MENU_FILE_PATH,
        dataFileNotFoundError: MENU_ERRORS.MENU_001.key,
        dataNotUniqueError: MENU_ERRORS.MENU_002.key,
        isUnique: (oldItem) =>
            !(oldItem.id === item.id || oldItem.name === item.name),
        newItem: {
            id: '',
            category: item.category,
            name: item.name,
            price: item.price,
        },
    })
}

export const updateMenuItem = (id: string, item: TMenuItem) => {
    update({
        id,
        dataFilePath: MENU_FILE_PATH,
        dataFileNotFoundError: MENU_ERRORS.MENU_001.key,
        dataNotUniqueError: MENU_ERRORS.MENU_004.key,
        dataNotFoundError: MENU_ERRORS.MENU_003.key,
        isUnique: (oldItem) => {
            if (oldItem.id === id) return true
            return !(oldItem.id === item.id || oldItem.name === item.name)
        },
        updatedItem: {
            id: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
        },
    })
}

export const deleteMenuItem = (id: string) => {
    remove({
        id,
        dataFilePath: MENU_FILE_PATH,
        dataFileNotFoundError: MENU_ERRORS.MENU_001.key,
        dataNotFoundError: MENU_ERRORS.MENU_003.key,
    })
}
