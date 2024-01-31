import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateReview from "./CreateReview"
import DeleteReview from "./DeleteReview"
import EditReview from "./EditReview"
import { thunkLoadSingleSticker } from "../../redux/stickerReducer"
import './Reviews.css'
import { NavLink } from "react-router-dom"

export default function ALlReviews({ sticker, id }) {
    const dispatch = useDispatch()
    const fetchAllReviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const [ loadMore, setLoadMore ] = useState(5)


    useEffect(() => {
        dispatch(thunkLoadAllReviews(id))
        dispatch(thunkLoadSingleSticker(id))
    }, [dispatch, id])

    if (!fetchAllReviews) return null

    const reviews = fetchAllReviews ? Object.values(fetchAllReviews) : []
    reviews.sort((a,b) => b.id - a.id)  //newest review on top

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


    // -------------------  Pagination  ------------------- //
    const loadMoreReviews = () => {
        setLoadMore( prev => prev + 5)
    }


    return (
        <>
            <div id="reviews_container">
                <div id="reviews-top_container">
                    <div style={{ fontWeight: 'bold', fontSize:'20px'}}>Reviews:</div>
                    
                    <div id="create-review">
                    {user ? (
                        sticker[0].ownerId === user.id  ? (
                            <div style={{marginTop:'20px'}}>Already Reviewed</div>
                        ) : (
                            <button style={{ listStyle: 'none', marginTop: '20px' }}>
                                <OpenModalMenuItem
                                    itemText='Write a Review'
                                    modalComponent={<CreateReview reviews={reviews} sticker={sticker[0]} />}
                                />
                            </button>
                        )
                    ) : (
                        <button style={{ listStyle: 'none', marginTop: '20px' }}>
                            <NavLink to='/login' className={'navlink'}>
                                Write a Review
                            </NavLink>
                        </button>
                    )}
                    </div>

                </div>
                <div id="star-rating" style={{marginTop:'5px', marginBottom:'10px', paddingBottom:'40px', borderBottom: '1px solid var(--color-black)'}}>
                    {[1, 2, 3, 4, 5].map((starNum) => {
                        return (
                            <div>
                                <i className={`fa-solid fa-star`} style={{
                                    color: starRating >= starNum ? 'var(--color-red)' : 'rgb(187, 182, 178)',
                                    fontSize:'20px'
                                }}></i>
                            </div>
                    ) })}
                    <div style={{marginLeft:'5px'}}>{starRating.toFixed(1)} ({reviews?.length})</div>
                </div>       
                             
                {reviews.length > 0 ? (
                    reviews.slice(0, loadMore).map(review => {
                        const date = new Date(review.createAt)
    
                        const day = date.getDate()
                        const month = date.getMonth() + 1
                        const year = date.getFullYear()

                        return (
                            <div key={review.id}>
                                <div id="star-rating" style={{marginTop:'25px', marginBottom:'10px'}}>
                                    {[1, 2, 3, 4, 5].map((starNum) => {
                                        return (
                                        <div>
                                            <i className={`fa-solid fa-star`} style={{
                                                color: review?.star >= starNum ? 'var(--color-red)' : 'rgb(187, 182, 178)',
                                                fontSize:'8px'
                                            }}></i>
                                        </div>
                                    ) })}
                                </div>
                                <div className="reviews">
                                    <div> <i className="fas fa-user-circle" style={{fontSize:'18px', marginRight:'10px'}}/>{review.user?.firstname} {review.user?.lastname}</div>
                                    <div id="review-date">{month}/{day}/{year}</div>
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

                <div style={{display:'flex', justifyContent:'center'}}>
                    {loadMore >= reviews.length 
                        ? (null)
                        : (<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                               <div onClick={loadMoreReviews} id="load-more"> Load More Reviews </div>
                               <span style={{marginTop:'20px'}}>or</span>
                           </div>)
                    }
                </div>

                <div id="create-review">
                    {user ? (   // If there is log-in user
                        sticker[0].ownerId === user.id ? (
                        <button style={{ display: 'none' }}>
                            <OpenModalMenuItem
                            itemText="Write a Review"
                            modalComponent={<CreateReview reviews={reviews} sticker={sticker[0]} />}
                            />
                        </button>
                        ) : (
                        reviews.some((review) => review?.user?.id === user.id) ? (
                            <div style={{ marginTop: '20px' }}>Already Reviewed</div>
                        ) : (
                            <button style={{ listStyle: 'none', marginTop: '20px' }}>
                            <OpenModalMenuItem
                                itemText="Write a Review"
                                modalComponent={<CreateReview reviews={reviews} sticker={sticker[0]} />}
                            />
                            </button>
                        )
                        )
                    ) : (       // If there is no log-in user
                        <button style={{ listStyle: 'none', marginTop: '20px' }}>
                        <NavLink to="/login" className="navlink">
                            Write a Review
                        </NavLink>
                        </button>
                    )}
                    </div>



            </div>
        </>
    )
}