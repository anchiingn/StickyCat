import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllReviews } from "../../../redux/reviewReducer"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import CreateReview from "../CreateReview/CreateReview"
import DeleteReview from "../DeleteReview/DeleteReview"
import { thunkLoadSingleSticker } from "../../../redux/stickerReducer"


export default function ALlReviews({ sticker, id }) {
    const dispatch = useDispatch()
    const fetchAllReviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    // console.log(user)
    useEffect(() => {
        dispatch(thunkLoadAllReviews(id))
        dispatch(thunkLoadSingleSticker(id))
    }, [dispatch, id])

    if (!fetchAllReviews) return null

    const reviews = fetchAllReviews ? Object.values(fetchAllReviews) : []
    // console.log(reviews)
    return (
        <>
            <div>
                <div style={{ fontWeight: 'bold' }}>this is all reviews</div>
                {reviews.length > 0 ? (
                    reviews.map(review => {
                        // console.log(review);
                        return (
                            <div>
                                <div>Review by: {review.user?.firstname}</div>
                                <div style={{ color: 'red' }}>Review: {review.review}</div>
                                {user && user.id === review.userId &&(
                                    <OpenModalMenuItem 
                                    itemText='Delete'
                                    modalComponent={<DeleteReview review={review} id={id}/>}
                                    />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>No reviews available.</div>
                )}
                {user && (
                    <OpenModalMenuItem 
                        itemText='Give me Review'
                        modalComponent={<CreateReview reviews={reviews} />}
                    />
                )}
            </div>
        </>
    )
}