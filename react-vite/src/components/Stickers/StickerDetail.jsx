import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { thunkLoadSingleSticker, thunkAddToFavorite, thunkDeleteFromFavorite } from "../../redux/stickerReducer"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import ALlReviews from "../Reviews/AllReviews"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer"


export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const reviewRef = useRef()
    const sticker = useSelector(state => state?.stickers)
    const fetchReviews = useSelector(state => state?.reviews)
    const user = useSelector(state => state.session.user)
    const [cart, setCart] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
        dispatch(thunkLoadAllReviews(id))
        
    }, [dispatch, id])
    
    const single_sticker = sticker ? Object.values(sticker) : []
    const reviews = Object.values(fetchReviews)


    // -------------------  Add/Remove from Favorite ------------------- //
    const addToFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkAddToFavorite(single_sticker, id))
        await dispatch(thunkLoadSingleSticker(id))
    }

    const removeFromFavorite = async(e) => {
        e.preventDefault()
        await dispatch(thunkDeleteFromFavorite(single_sticker[0]?.favorited[0]?.id))
        await dispatch(thunkLoadSingleSticker(id))
    }


    // ------------------- Add To Cart ------------------- //
    const addToCart = async(e) => {
        e.preventDefault()

        setCart(true)

        setTimeout(() => {
            setCart(false)
        }, 2000)

        await dispatch(thunkAddToCart(single_sticker, id))
        await dispatch(thunkLoadAllCarts())
    }


    // -------------------  Get Shipdate ------------------- //
    const date = new Date(new Date().getTime()+(10*24*60*60*1000))
    const shipdate = new Date(date)

    const day = shipdate.getDate()
    const month = shipdate.getMonth()
    const year = shipdate.getFullYear()

    let monthName =''
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < months.length; i++) {
        if (month === i) {
            monthName = months[i]
            break
        }
    }

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

       
    // -------------------  Scroll To Review  ------------------- //
    const scrollToReview = () => {
        window.scrollTo({
            top: reviewRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    return (
        <>
        <div className='goback' onClick={() => navigator(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
        {single_sticker && single_sticker.length > 0 && single_sticker[0].user && single_sticker[0].user.length > 0 &&(
            <>

            <div id="sticker-detail_container">
                <div>
                    <img id='sticker-detail_image' src={single_sticker[0]?.image} alt={single_sticker[0]?.title} />

                    <div id='sticker-detail_infos'>
                        <div id="star-rating">
                        {[1, 2, 3, 4, 5].map((starNum, index) => {
                            return (
                                <div key={index}>
                                    <i className={`fa-solid fa-star`} style={{
                                        color: starRating >= starNum ? 'var(--color-red)' : 'rgb(187, 182, 178)',
                                        fontSize:'8px'
                                    }}></i>
                                </div>
                        ) })}

                        <div style={{display:'flex', alignItems:'flex-end', marginTop:'-2px', paddingLeft:'5px'}}>
                            {/* {starRating.toFixed(1)}  */}
                            <div onClick={() => scrollToReview()}>(<span style={{textDecoration:'underline', cursor:'pointer'}}>{reviews?.length}</span>)</div>
                        </div>

                        </div>

                        <div id="top-part">  
                            <div id="title">{single_sticker[0]?.title}</div>
                            <div id="price">${single_sticker[0]?.price}</div>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div id="name">By: {single_sticker[0]?.user[0]?.firstname} {single_sticker[0]?.user[0]?.lastname}</div>
                            {user ?(
                                single_sticker[0]?.ownerId !== user.id && (
                                    <div>
                                        {single_sticker[0]?.favorited?.length === 0 ? (
                                            <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={addToFavorite}></i>
                                        ) : (
                                            <i className="fa-solid fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={removeFromFavorite}></i>
                                        )}
                                    </div>
                            ) 
                            ) :(
                                <div>
                                    <NavLink to="/login" className="navlink">
                                    <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }}></i>
                                    </NavLink>
                                </div>
                            )}

                        </div>
                        
                        {user ?(
                            single_sticker[0]?.ownerId !== user?.id && (
                                <div id="cart-shipdate">
                                    <div style={{width:'100%', height:'fit-content'}}>
                                        {cart && (
                                            <div id="cart-noti">Sticker has been added to cart</div>
                                        )} 
                                        <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                                            <button id="addToCart" onClick={addToCart}>Add to Cart</button>
                                        </div>

                                    </div>

                                    <div className="Estimated_shipDate">
                                        <i className="fa-solid fa-truck-fast"  />
                                        Estimated to Ship {monthName} {day}, {year}
                                    </div>
                                </div>
                        ) 
                        ) :(
                            <div id="cart-shipdate">
                                <div >
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <NavLink to="/login" className="navlink">
                                        <button id="addToCart">
                                            Add to Cart
                                        </button>
                                        </NavLink>
                                    </div>

                                </div>
                            </div>
                        )}

                        <div id="message">
                            <div style={{fontWeight:'bold'}}>Message from creator:</div>
                            <div style={{margin:'0px 20px'}}>{single_sticker[0]?.message}</div>
                        </div>

                    
                        <div>
                            <div style={{fontWeight:'bold', marginTop:'10px'}}>Dimensions:</div>
                            <div style={{margin:'0px 20px'}}>
                                <div id="height">Height: {single_sticker[0]?.height}&quot; </div>
                                <div id="width">Width: {single_sticker[0]?.width}&quot; </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>


            {/*  ------ Get Reviews --------- */}
            <div id="review_container" ref={reviewRef}>
                <ALlReviews sticker={single_sticker} id={id}/>
            </div>
            

            </>
        )}
        </>
    )
}