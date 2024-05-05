import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadCurrentStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import OpenModalMenuItem from "../OpenModalButton/OpenModalMenuItem"
import DeleteSticker from "./DeleteSticker"
// import { thunkLoadAllReviews } from "../../redux/reviewReducer"

export default function CurrentStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state.stickers)
    const user = useSelector(state => state.session?.user)
    const [ isLoading, setIsLoading ] = useState(true)
    
    useEffect(() => {
        dispatch(thunkLoadCurrentStickers())
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [dispatch])

    const stickers = Object.values(allStickers)
    stickers.sort((a,b) => b.id - a.id)
    
    

    return (
        <>
        {isLoading ?(
            <h2 style={{margin:'auto'}}>Loading...</h2>
        ) :(
            <>
            {user && (
                <>
                    <div className="stickers-toppart_container">
                    <NavLink className={'navlink'} style={{cursor:'default'}}>My Stickers</NavLink> 
                    /
                    </div>

                    <div className="allStickers_container">
                        {stickers.length === 0 ?(
                            <>
                                <div className="user-stickers_container">
                                    {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Sticky Stickers</div> */}
                                    <p className="user-paragraph">Oops! Your sticker collection seems a bit bare. Let's create a charming masterpiece together!</p>
                                    <div className="line-in-between"></div>
                                    <button className="user-button">
                                        <NavLink to={'/new-sticker'} className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}>Create Sticker</NavLink>
                                    </button>
                                </div>
                            </>
                        ) :(
                            <>
                                {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Sticky Stickers</div> */}
                                {/* <div className="line-in-between"></div> */}
                                <div className="sticker-cards_container"> 
                                {stickers.map(sticker => {

                                    // -------------------  Star Rating  ------------------- //
                                    let starRating= 0;
                                    if (sticker.reviews && sticker.reviews.length >= 1) { //check if it their is review before iteration
                                    for (let review of sticker.reviews) {
                                        starRating += (review?.star) / sticker.reviews.length;
                                    }
                                    }

                                    if (user?.id === sticker?.ownerId) {
                                        return (
                                        <div key={sticker?.id} className="stickers_container">
                                            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                                                <div className="sticker-images_container">
                                                    <img src={sticker?.image} alt={sticker?.title} />
                                                </div>
                                                <div className="sticker-details_top">
                                                    <div>
                                                        <div style={{fontWeight:'bold'}}>{sticker?.title}</div>
                                                        <div>${sticker?.price}</div>
                                                    </div>

                                                    <div style={{color:'var(--hover-grey'}}>By: {user?.firstname} {user?.lastname}</div>
                                                    
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

                                            </NavLink>
                                            <div className="sticker-details_bottom">
                                                <NavLink to={`/${sticker.id}/edit-sticker`} className={'navlink'}>Edit</NavLink>
                                                <div style={{listStyle:'none', cursor:'pointer'}}>
                                                    <OpenModalMenuItem
                                                    itemText='Delete'
                                                    modalComponent={<DeleteSticker sticker={sticker} />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            </>
        )}
        </>
    )
}