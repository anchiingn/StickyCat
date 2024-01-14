import { thunkEditReviews, thunkLoadAllReviews } from "../../redux/reviewReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkLoadSingleSticker } from "../../redux/stickerReducer";


export default function EditReview ({ reviewDetail, sticker }) {
    console.log(reviewDetail)
    const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [review, setReview] = useState(reviewDetail?.review)
    const [star, setStar] = useState(reviewDetail?.star)
    const [hover, setHover ] = useState('') 

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
            <div className="review-form_container">
                <div>Edit Review</div>
                <form onSubmit={onSubmit} id="review_form">
                    <div id="review-star">
                        {[1, 2, 3, 4, 5].map((starNum, index) => {
                            let currentStar = index + 1;
                            // console.log(currentStar, starNum, hover)
                            return (
                                <label
                                    key={starNum}
                                    onMouseEnter={() => setHover(currentStar)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <input
                                        key={starNum}
                                        name={`starNum${starNum}`}
                                        type="radio"
                                        value={currentStar}
                                        onChange={e => setStar(e.target.value)}
                                    />
                                    <i className={`fa-solid fa-star`} style={{
                                        color: (hover || star ) >= currentStar ? 'orangered' : 'black'
                                    }}></i>
                                </label>
                        )})}
                    </div>

                    <div id="post-review">
                        <textarea 
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                        />
                        <button>submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}