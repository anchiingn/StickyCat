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

    // -------------------  Star Rating  ------------------- //
    let starRating = 0
    for (let review of reviews) {
        if (reviews?.length >= 1) {
            starRating += (review?.star)/reviews?.length
        }
        else {
            starRating = review?.star
        }
    }


    // -------------------  Review Date  ------------------- //
    // let day;
    // let month;
    // let year;

    // for (let reviewDate of reviews) {
    //     console.log(reviewDate.crea)
    //     const date = new Date(reviewDate.createAt)
    
    //     day = date.getDate()
    //     month = date.getMonth() + 1
    //     year = date.getFullYear()
    // }

    return (
        <>
            <div id="reviews_container">
                <div id="reviews-top_container">
                    <div style={{ fontWeight: 'bold', fontSize:'20px'}}>Reviews:</div>
                </div>
                <div id="star-rating" style={{marginTop:'5px', marginBottom:'10px', paddingBottom:'40px', borderBottom: '1px solid var(--color-black)'}}>
                    {[1, 2, 3, 4, 5].map((starNum) => {
                        return (
                            <div>
                                <i className={`fa-solid fa-star`} style={{
                                    color: starRating >= starNum ? 'var(--color-red)' : 'black',
                                    fontSize:'20px'
                                }}></i>
                            </div>
                    ) })}
                    <div>{starRating.toFixed(1)} ({reviews?.length})</div>
                </div>                    
                {reviews.length > 0 ? (
                    reviews.map(review => {
                        return (
                            <div key={review.id}>
                                <div id="star-rating" style={{marginTop:'25px', marginBottom:'10px'}}>
                                    {[1, 2, 3, 4, 5].map((starNum) => {
                                        return (
                                        <div>
                                            <i className={`fa-solid fa-star`} style={{
                                                color: review?.star >= starNum ? 'var(--color-red)' : 'black',
                                                fontSize:'8px'
                                            }}></i>
                                        </div>
                                    ) })}
                                </div>
                                <div className="reviews">
                                    <div> <i className="fas fa-user-circle" style={{fontSize:'18px', marginRight:'10px'}}/>{review.user?.firstname} {review.user?.lastname}</div>
                                    {/* <div id="review-date">{month}/{day}/{year}</div> */}
                                </div>

                                <div className="user-review">
                                    <div style={{marginBottom:'15px'}}> - {review.review}</div>
                                    {user && user.id === review.userId &&(
                                        <div id="review_edit-delete">
                                            <div>
                                                <OpenModalMenuItem 
                                                itemText='Edit'
                                                modalComponent={<EditReview reviewDetail={review} id={id} sticker={sticker[0]}/>}
                                                />
                                            </div>
                                            <div>
                                                <OpenModalMenuItem 
                                                itemText='Delete'
                                                modalComponent={<DeleteReview review={review} id={id} sticker={sticker[0]}/>}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No reviews available.</div>
                )}

                <div id="create-review">
                    {user && sticker[0].ownerId !== user?.id &&(
                        <button style={{listStyle:'none', marginTop:'20px'}}>
                            <OpenModalMenuItem 
                                itemText='- WRITE A REVIEW -'
                                modalComponent={<CreateReview reviews={reviews} sticker={sticker[0]}/>}
                            />
                        </button>
                    )}
                </div>

            </div>
        </>
    )
}