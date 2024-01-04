const LOAD_ALL_STICKERS = 'stickers/loadAllStickers'
const LOAD_SINGLE_STICKER = 'stickers/loadSingleSticker'

const loadAllStickers = (allStickers) => {
    return {
        type: LOAD_ALL_STICKERS,
        allStickers
    }
}

const loadSingleSticker = (sticker) => {
    return {
        type: LOAD_SINGLE_STICKER,
        sticker
    }
}

//thunks
export const thunkLoadAllStickers = () => async (dispatch) => {
    const res = await fetch('/api/stickers')

    if (res.ok) {
        const allStickers = await res.json()
        dispatch(loadAllStickers(allStickers))
        return allStickers
    }
}

export const thunkLoadSingleSticker = (id) => async (dispatch) => {
    const res = await fetch(`/api/stickers/${id}`)

    if (res.ok) {
        const sticker = await res.json()
        dispatch(loadSingleSticker(sticker))
        return sticker
    }
}

export const thunkLoadCurrentStickers = () => async (dispatch) => {
    const res = await fetch(`/api/stickers/my-stickers`)

    if (res.ok) {
        const allStickers = await res.json()
        dispatch(loadAllStickers(allStickers))
        return allStickers
    }
}

//reducer
const initialState = {}
export const stickerReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STICKERS: 
            return {...state, ...action.allStickers}
        case LOAD_SINGLE_STICKER:
            return {...state, ...action.sticker}
        default:
            return state
    }
} 