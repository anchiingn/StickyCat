import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkDeleteReviews, thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkLoadSingleSticker } from "../../redux/stickerReducer"

export default function DeleteReview({ review, sticker }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const delete_review = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteReviews(review.id));
        await dispatch(thunkLoadAllReviews(sticker.id));
        await dispatch(thunkLoadSingleSticker(sticker.id));
        
        closeModal();

    }
    return (
        <>
            <div className="delete-review_container">
                <div>Confirm Delete</div>
                <div>Are you sure you want to remove this review?</div>
                <div>
                    <button onClick={delete_review}>Yes </button>
                    <button onClick={closeModal}>No </button>
                </div>
            </div>
        </>
    )
}