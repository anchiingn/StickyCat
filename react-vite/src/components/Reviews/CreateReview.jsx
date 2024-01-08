import { thunkCreateNewReviews, thunkLoadAllReviews } from "../../redux/reviewReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkLoadSingleSticker } from "../../redux/stickerReducer";


export default function CreateReview ({ reviews, sticker }) {
    const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [review, setReview] = useState('')
    const [star, setStar] = useState(0)

    const onSubmit = async(e) => {
        e.preventDefault()

        const new_review = {
            review,
            star
        }

        await dispatch(thunkCreateNewReviews(new_review, id))
        await dispatch(thunkLoadAllReviews(id))
        await dispatch(thunkLoadSingleSticker(id))
        closeModal()

    }
    return (
        <>
            <div>create</div>
            <form onSubmit={onSubmit}>
                <label>Review</label>
                <textarea 
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <label>Star</label>
                <input 
                    type="radio"
                    value={star}
                    onChange={e => setStar(e.target.value)}
                />
                <button>submit</button>
            </form>
        </>
    )
}