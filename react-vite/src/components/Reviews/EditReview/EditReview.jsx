import { thunkEditReviews, thunkLoadAllReviews } from "../../../redux/reviewReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkLoadSingleSticker } from "../../../redux/stickerReducer";


export default function EditReview ({ reviewDetail, sticker }) {
    console.log(reviewDetail)
    const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [review, setReview] = useState(reviewDetail?.review)
    const [star, setStar] = useState(reviewDetail?.star)

    useEffect(() => {
        if (reviewDetail) {
            setReview(review ? review : reviewDetail.review)
            setStar(star ? star : reviewDetail.star)
        }
    }, [reviewDetail, review, star])

    const onSubmit = async(e) => {
        e.preventDefault()

        const new_review = {
            review,
            star
        }
        console.log(new_review)

        await dispatch(thunkEditReviews(new_review, reviewDetail?.id))
        await dispatch(thunkLoadAllReviews(sticker?.id))
        await dispatch(thunkLoadSingleSticker(sticker?.id))
        closeModal()

    }
    return (
        <>
            <div>edit</div>
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