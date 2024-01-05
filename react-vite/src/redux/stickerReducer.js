import AllStickers from "../components/Stickers/AllStickers/AllStickers"

const LOAD_ALL_STICKERS = 'stickers/loadAllStickers'
const LOAD_SINGLE_STICKER = 'stickers/loadSingleSticker'
const LOAD_CURRENT_STICKERS = 'stickers/loadCurrentStickers'
const CREATE_NEW_STICKERS = 'stickers/createNewStickers'
const DELETE_STICKER = 'stickers/deleteStickers'

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

const loadCurrentSticker = (stickers) => {
    return {
        type: LOAD_CURRENT_STICKERS,
        stickers
    }
}

const createNewSticker = (stickers) => {
    return {
        type: CREATE_NEW_STICKERS,
        stickers
    }
}

const deleteSticker = (sticker) => {
    return {
        type: DELETE_STICKER,
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
        console.log(allStickers)
        dispatch(loadCurrentSticker(allStickers))
        return allStickers
    }
}

export const thunkCreateNewStickers = (sticker) => async (dispatch) => {

    const res = await fetch('/api/stickers/new', {
        method: 'POST',
        // headers: { "Content-Type": "application/json" },
        body: sticker
    });

    if (res.ok) {
        const newSticker = await res.json();
        dispatch(createNewSticker(newSticker));
        return newSticker;
    } else {
        throw new Error('Failed to create new sticker');
    }

};

export const thunkDeleteStickers = (id) => async (dispatch) => {

    const res = await fetch(`/api/stickers/${id}/delete-sticker`, {
        method: 'DELETE',
        // headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        dispatch(deleteSticker(id));
        return id;
    } else {
        throw new Error('Failed to delete sticker');
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
        case LOAD_CURRENT_STICKERS:
            return { ...state, ...action.stickers }
        case CREATE_NEW_STICKERS:
            return { ...state, [action.stickers.id]: action.stickers };
        case DELETE_STICKER: {
            let newState = { ...state };
            delete newState[action.sticker];
            return newState;
        }
        default:
            return state
    }
} 