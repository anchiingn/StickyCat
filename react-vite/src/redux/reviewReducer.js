const LOAD_ALL_REVIEWS = 'reviews/loadAllReviews'
const CREATE_NEW_REVIEW = 'reviews/createNewReviews'
const EDIT_REVIEW = 'reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const loadAllReviews = (allReviews) => {
    return {
        type: LOAD_ALL_REVIEWS,
        allReviews
    }
}

const createNewReview = (reviews) => {
    return {
        type: CREATE_NEW_REVIEW,
        reviews
    }
}

const editReview = (reviews) => {
    return {
        type: EDIT_REVIEW,
        reviews
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//thunks
export const thunkLoadAllReviews = (id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`)

    if (res.ok) {
        const allReviews = await res.json()
        dispatch(loadAllReviews(allReviews))
        return allReviews
    }
}

export const thunkCreateNewReviews = (review, id) => async (dispatch) => {
    const res = await fetch(`/api/stickers/${id}/new-review`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newreview = await res.json();
        dispatch(createNewReview(newreview));
        return newreview;
    } else {
        throw new Error('Failed to create new review');
    }
};

export const thunkEditReviews = (review, id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}/edit-review`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const newreview = await res.json();
        console.log('newreview', newreview)
        dispatch(editReview(newreview));
        return newreview;
    } else {
        throw new Error('Failed to edit review');
    }
};

export const thunkDeleteReviews = (id) => async (dispatch) => {
    console.log('before fetch', id)
    const res = await fetch(`/api/reviews/${id}/delete-review`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    });
    console.log('after fetch', id)

    if (res.ok) {
        dispatch(deleteReview(id));
        return id;
    } else {
        throw new Error('Failed to delete review');
    }

};

//reducer
const initialState = {}
export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            const newStates = {}
            action.allReviews.forEach(review => newStates[review.id] = review)
            return newStates
        case CREATE_NEW_REVIEW:
            return { ...state, [action.reviews.id]: action.reviews };
        case EDIT_REVIEW:
            return { ...state, [action.reviews.id]: action.reviews };
        case DELETE_REVIEW:
            let newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        default:
            return state
    }
} 