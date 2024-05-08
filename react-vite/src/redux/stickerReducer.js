const LOAD_ALL_STICKERS = 'stickers/loadAllStickers'
const LOAD_SINGLE_STICKER = 'stickers/loadSingleSticker'
// const LOAD_CURRENT_STICKERS = 'stickers/loadCurrentStickers'
const CREATE_NEW_STICKERS = 'stickers/createNewStickers'
const DELETE_STICKER = 'stickers/deleteStickers'
const EDIT_STICKER = 'stickers/editStickers'

const LOAD_ALL_FAVORITES = 'stickers/loadAllFavorites'
const ADD_TO_FAVORITE = 'stickers/addToFavorite'
const DELETE_FROM_FAVORITE = 'stickers/deleteFromFavorite'

const SEARCH_STICKERS = 'stickers/searchStickers'


//action
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

// const loadCurrentSticker = (stickers) => {
//     return {
//         type: LOAD_CURRENT_STICKERS,
//         stickers
//     }
// }

const createNewSticker = (sticker) => {
    return {
        type: CREATE_NEW_STICKERS,
        sticker
    }
}

const deleteSticker = (sticker) => {
    return {
        type: DELETE_STICKER,
        sticker: sticker
    }
}

const editSticker = (sticker) => {
    return {
        type: EDIT_STICKER,
        sticker: sticker
    }
}



const loadAllFavorites = (stickers) => {
    return {
        type: LOAD_ALL_FAVORITES,
        stickers
    };
}

const addToFavorite = (sticker) => {
    return {
        type: ADD_TO_FAVORITE,
        sticker
    };
}

const deleteFromFavorite = (sticker) => {
    return {
        type: DELETE_FROM_FAVORITE,
        sticker
    };
}

const searchSticker = (stickers) => {
    return {
        type: SEARCH_STICKERS,
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

    const res = await fetch('/api/stickers/new-sticker', {
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
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        dispatch(deleteSticker(id));
    } else {
        throw new Error('Failed to delete sticker');
    }
};

export const thunkEditStickers = (sticker, id) => async (dispatch) => {
    const res = await fetch(`/api/stickers/${id}/edit-sticker`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sticker)
    });

    if (res.ok) {
        const newSticker = await res.json();
        dispatch(editSticker(newSticker));
        return newSticker;
    } else {
        throw new Error('Failed to edit sticker');
    }
};



export const thunkLoadAllFavorites = () => async (dispatch) => {
    const res = await fetch("/api/favorites/my-favorite-stickers");
    if (res.ok) {
        const allStickers = await res.json();
        dispatch(loadAllFavorites(allStickers));
        return allStickers;
    } else {
        throw new Error('Failed to load all favorite stickers');
    }
};

export const thunkAddToFavorite = (sticker, id) => async (dispatch) => {
    const res = await fetch(`/api/favorites/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sticker)
    })

    if (res.ok) {
        const sticker = await res.json();
        dispatch(addToFavorite(sticker));
        return sticker;
    }
    else {
        throw new Error('Failed to add to favorite stickers');
    }
}

export const thunkDeleteFromFavorite = (id) => async (dispatch) => {
    const res = await fetch(`/api/favorites/${id}/remove`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
        const sticker = await res.json();
        dispatch(deleteFromFavorite(sticker));
        return sticker;
    }
    else {
        throw new Error('Failed to delete from favorite stickers');
    }
}


export const thunkSearchStickers = (searchStickers) => async (dispatch) => {
    const res = await fetch(`/api/stickers/search/${encodeURIComponent(searchStickers)}`);

    if (res.ok) {
        const stickers = await res.json();
        dispatch(searchSticker(stickers))
    }
}

//reducer
const initialState = {}
export const stickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STICKERS:
            const newStates = {}
            action.allStickers.forEach(sticker => newStates[sticker.id] = sticker)
            return newStates

        case LOAD_SINGLE_STICKER:
            let nextState = {}
            nextState = { ...action.sticker }
            return nextState

        case CREATE_NEW_STICKERS:
            return { ...state, [action.sticker.id]: action.sticker };

        case DELETE_STICKER:
            let newState = { ...state };
            delete newState[action.sticker];
            return newState;

        case EDIT_STICKER:
            return { ...state, [action.sticker.id]: action.sticker };

        case LOAD_ALL_FAVORITES: {
            const newStates = {}
            action.stickers.forEach(sticker => newStates[sticker.id] = sticker)
            return newStates
        }

        case ADD_TO_FAVORITE:
            return { ...state, [action.sticker.id]: action.sticker };

        case SEARCH_STICKERS: {
            let nextState = {};
            action.stickers.forEach(sticker => nextState[sticker.id] = sticker);
            return nextState
        }
        
        default:
            return state
    }
} 