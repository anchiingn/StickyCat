import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkDeleteReviews, thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkLoadSingleSticker } from "../../redux/stickerReducer"
import { useNavigate } from "react-router-dom"

export default function DeleteReview({ review, id, sticker }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()
// console.log(sticker)
    const delete_review = async (e) => {
        e.preventDefault()

        console.log('before')
        await dispatch(thunkDeleteReviews(review.id));
        await dispatch(thunkLoadAllReviews(sticker.id));
        await dispatch(thunkLoadSingleSticker(sticker.id));
        // window.location.reload(true);
        closeModal();
        console.log('after')

    }
    return (
        <>
            <div>
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