import { thunkCreateNewReviews, thunkLoadAllReviews } from "../../redux/reviewReducer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkLoadSingleSticker } from "../../redux/stickerReducer";


export default function CreateReview () {
    const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [review, setReview] = useState('')
    const [star, setStar] = useState(0)
    let [hover, setHover ] = useState('') 
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState({})

    useEffect(() => {
        const errors = {}
            if (!star) {
                errors.star = 'Star must be 1-5'
            }
            if (!review) {
                errors.review = 'Review is required'
            }
            if (review && review.length > 100) {
                errors.review = 'Must contain 100 characters long'
            }
        
    
        setValidation(errors);
    
    }, [review, star]);

    const onSubmit = async(e) => {
        e.preventDefault()

        setSubmit(true)

        const new_review = {
            review,
            star
        }

        await dispatch(thunkCreateNewReviews(new_review, id))
        await dispatch(thunkLoadAllReviews(id))
        await dispatch(thunkLoadSingleSticker(id))
        navigate(`/stickers/${id}`)
        closeModal()
    }
    console.log(validation.review)
    return (
        <>
            <div className="review-form_container">
                <div>Post Review</div>
                {validation.review && submit && <p className="errors">{validation.review}</p>}
                {validation.star && submit && <p className="errors">{validation.star}</p>}
                <form onSubmit={onSubmit} id="review_form">
                    <div id="review-star">
                        {[1, 2, 3, 4, 5].map((starNum, index) => {
                            let currentStar = index + 1;
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
                                        color: (hover || star ) >= currentStar ? 'var(--color-red)' : 'black'
                                    }}></i>
                                </label>
                        )})}
                    </div>

                    <div id="post-review">
                        <textarea 
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                        <button>submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}