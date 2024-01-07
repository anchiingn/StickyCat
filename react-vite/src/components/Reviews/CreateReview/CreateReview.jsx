import { thunkCreateNewReviews, thunkLoadAllReviews } from "../../../redux/reviewReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkLoadSingleSticker } from "../../../redux/stickerReducer";


export default function CreateReview () {
    const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)

    const onSubmit = async(e) => {
        e.preventDefault()

        const new_review = {
            review,
            rating
        }

        await dispatch(thunkCreateNewReviews(new_review, id))
        await dispatch(thunkLoadAllReviews(id))
        await dispatch(thunkLoadSingleSticker(id))
        .then(closeModal())

    }
    return (
        <>
            <div>hello</div>
            <form onSubmit={onSubmit}>
                <label>Review</label>
                <textarea 
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <label>Rating</label>
                <input 
                    type="radio"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                />
                <button>submit</button>
            </form>
        </>
    )
}