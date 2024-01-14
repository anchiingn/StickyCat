import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateReview from "./CreateReview"
import DeleteReview from "./DeleteReview"
import EditReview from "./EditReview"
import { thunkLoadSingleSticker } from "../../redux/stickerReducer"
import './Reviews.css'

export default function ALlReviews({ sticker, id }) {
    const dispatch = useDispatch()
    const fetchAllReviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadAllReviews(id))
        dispatch(thunkLoadSingleSticker(id))
    }, [dispatch, id])

    if (!fetchAllReviews) return null

    const reviews = fetchAllReviews ? Object.values(fetchAllReviews) : []
    // console.log(reviews)

    let starRating = 0
    for (let review of reviews) {
        if (reviews?.length >= 1) {
        starRating += (review?.star)/2
        }
        else {
            starRating = review?.star
        }
    }

    return (
        <>
            <div id="reviews_container">
                <div id="reviews-top_container">
                    <div style={{ fontWeight: 'bold' }}>Customer Reviews:</div>
                    <div>total reviews: {reviews.length} ------ total Rating: {starRating.toFixed(1)}</div>
                </div>
                    
                {reviews.length > 0 ? (
                    reviews.map(review => {
                        return (
                            <div key={review.id}>
                                <div className="reviews">
                                <div>{review.user?.firstname} {review.user?.lastname}</div>
                                {user && user.id === review.userId &&(
                                    <div id="review_edit-delete">
                                        <OpenModalMenuItem 
                                        itemText='Delete'
                                        modalComponent={<DeleteReview review={review} id={id} sticker={sticker[0]}/>}
                                        />
                                        <OpenModalMenuItem 
                                        itemText='edit'
                                        modalComponent={<EditReview reviewDetail={review} id={id} sticker={sticker[0]}/>}
                                        />
                                    </div>
                                )}
                                </div>

                                <div className="reviews">
                                    <div> {review.review}</div>
                                    {/* <div>stars:{review.star}</div> */}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No reviews available.</div>
                )}
                {user && (
                    <button>
                        <OpenModalMenuItem 
                            itemText='Give me Review'
                            modalComponent={<CreateReview reviews={reviews} sticker={sticker[0]}/>}
                        />
                    </button>
                )}
            </div>
        </>
    )
}