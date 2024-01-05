const LOAD_ALL_STICKERS = 'stickers/loadAllStickers'
const LOAD_SINGLE_STICKER = 'stickers/loadSingleSticker'
const CREATE_NEW_STICKERS = 'stickers/createNewStickers'

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

const createNewSticker = (stickers) => {
    return {
        type: CREATE_NEW_STICKERS,
        stickers
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

export const thunkCreateNewStickers = (sticker) => async (dispatch) => {
    try {
        const res = await fetch('/api/stickers/new', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sticker)
        });

        if (res.ok) {
            const newSticker = await res.json();
            dispatch(createNewSticker(newSticker));
            return newSticker;
        } else {
            // Handle non-OK response (e.g., res.status !== 200)
            // You might want to throw an error, log the response, or handle it according to your app's requirements
            throw new Error('Failed to create new sticker');
        }
    } catch (error) {
        // Handle fetch errors (e.g., network issues, server errors)
        console.error('Error creating new sticker:', error);
        throw new Error('Failed to create new sticker');
    }
};

//reducer
const initialState = {}
export const stickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STICKERS:
            return { ...state, ...action.allStickers }
        case LOAD_SINGLE_STICKER:
            return { ...state, ...action.sticker }
        case CREATE_NEW_STICKERS:
            return { ...state, [action.stickers.id]: action.stickers };
        default:
            return state
    }
} 