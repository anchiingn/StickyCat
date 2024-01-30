import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadSingleSticker, thunkAddToFavorite, thunkDeleteFromFavorite, thunkLoadAllStickers } from "../../redux/stickerReducer"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import { useParams, NavLink } from "react-router-dom"

import './Stickers.css'


export default function StickerCards({ sticker }) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     dispatch(thunkLoadAllReviews(sticker.reviews.id))
        
    // }, [dispatch, id])


     // -------------------  Add/Remove from Favorite ------------------- //
     const addToFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkAddToFavorite(sticker, sticker.id))
        await dispatch(thunkLoadAllStickers())
    }

    const removeFromFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromFavorite(sticker?.favorited[0]?.id))
        await dispatch(thunkLoadAllStickers())
    }

     // -------------------  Star Rating  ------------------- //
     let starRating = 0
     if (sticker.reviews && sticker.reviews.length >= 1) { //check if it their is review before iteration
        for (let review of sticker.reviews) {
          starRating += (review?.star) / sticker.reviews.length;
        }
      } else if (sticker.reviews && sticker.reviews.length === 1) {
        starRating = sticker.reviews[0]?.star;
      }

    return (
        <>
        {sticker && sticker.users && sticker.users.length > 0 &&(
            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                <div style={{position:'relative'}}>
                    <div className="sticker-images_container">
                        <img src={sticker?.image} alt={sticker?.title}/>
                    </div>
                    <div className="sticker-details_top">
                        <div>
                            <div style={{fontWeight:'bold'}}>{sticker?.title}</div>
                            <div>${sticker?.price}</div>
                        </div>
                        <div>
                            <div style={{color:'var(--hover-grey'}}>By: {sticker?.users[0]?.firstname} {sticker?.users[0]?.lastname}</div>
                            {user && sticker.ownerId !== user.id && (
                                <div>
                                    {sticker?.favorited?.length === 0 ? (
                                        <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={addToFavorite}></i>
                                    ) : (
                                        <i className="fa-solid fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={removeFromFavorite}></i>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <div id="star-rating">
                            {[1, 2, 3, 4, 5].map((starNum) => {
                                return (
                                    <div>
                                        <i className={`fa-solid fa-star`} style={{
                                            color: starRating >= starNum ? 'var(--color-red)' : 'rgb(187, 182, 178)',
                                            fontSize:'8px'
                                        }}></i>
                                    </div>
                            ) })}

                            <div style={{display:'flex', alignItems:'flex-end', marginTop:'-2px', paddingLeft:'5px'}}>
                                {starRating.toFixed(1)} ({sticker?.reviews?.length})
                            </div>
                            </div>
                        </div>
                    </div>
                    {sticker?.reviews?.length > 1 && (
                        <div id="best-seller">
                            <img src="https://stickycat.s3.us-east-2.amazonaws.com/Screen_Shot_2024-01-17_at_3.15.46_PM+2.png" alt="" />
                            <div>Best Seller</div>
                        </div>
                    )}
                </div>
            </NavLink>
        )}
        </>
    )
}