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
    let [hover, setHover ] = useState('') 

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
                {[1, 2, 3, 4, 5].map((starNum, index) => {
                    let currentStar = index + 1;
                    console.log(currentStar, starNum, hover)
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
                            )
                        })}
                <button>submit</button>
            </form>
        </>
    )
}