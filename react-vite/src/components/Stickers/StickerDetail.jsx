import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadSingleSticker, thunkAddToFavorite, thunkLoadAllStickers, thunkLoadCurrentStickers } from "../../redux/stickerReducer"
import { useParams,useNavigate } from "react-router-dom"
import ALlReviews from "../Reviews/AllReviews"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkAddToCart } from "../../redux/cardReducer"

export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const sticker = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    const [show, setShow] = useState(false)


    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
        dispatch(thunkLoadAllReviews(id))
    }, [dispatch, id])
    
    const single_sticker = sticker ? Object.values(sticker) : []

    const addToFavorite = async(e) => {
        e.preventDefault()

        await dispatch(thunkAddToFavorite(single_sticker, id))
    }

    const addToCart = async(e) => {
        e.preventDefault()

        await dispatch(thunkAddToCart(single_sticker, id))
    }

    const goBack = async(e) => {
        e.preventDefault()

        await dispatch(thunkLoadAllStickers())
        navigate(-1)
    }

    const date = new Date(new Date().getTime()+(10*24*60*60*1000))
    const shipdate = new Date(date)
    console.log(shipdate)

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
    
    return (
        <>
        {single_sticker && single_sticker.length > 0 && single_sticker[0].user && single_sticker[0].user.length > 0 &&(
            <>
            <div id="sticker-detail_container">
                <img id='sticker-detail_image' src={single_sticker[0]?.image} alt={single_sticker[0]?.title} />

                <div id='sticker-detail_infos'>
                    <div id="top-part">  
                        <div id="title">{single_sticker[0]?.title}</div>
                        <div id="price">${single_sticker[0]?.price}</div>
                    </div>
                    <div id="name">By: {single_sticker[0]?.user[0]?.firstname} {single_sticker[0]?.user[0]?.lastname}</div>
                    
                    <div id="cart-shipdate">
                        <button id="addToCart" onClick={addToCart}>Add to Cart</button>
                        <div>Estimated to Ship {monthName} {day}, {year}</div>
                    </div>

                    <div id="message">
                        <div>Message from creator:</div>
                        <div>{single_sticker[0]?.message}</div>
                    </div>

                    <div >
                        <div>product detail</div>
                        <button onClick={e => setShow(!show)}> v</button>
                        {show && (
                            <>
                                <div>
                                    <div>Dimensions</div>
                                    <div>
                                        <div id="height">Height: {single_sticker[0]?.height}</div>
                                        <div id="width">Width: {single_sticker[0]?.width}</div>
                                    </div>
                                    <div>material</div>
                                    <div>Care Instructions</div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* <div>
                        <div>How do StickerCat Work?</div>
                        <button onClick={e => setShow(!show)}> v</button>
                        {show && (
                            <>
                                <div>Design</div>
                                <div>
                                    design ......
                                </div>
                                <div>launch</div>
                                <div>
                                    launch ......
                                </div>
                                <div>make</div>
                                <div>
                                    make ......
                                </div>
                                <div>ship</div>
                                <div>
                                    ship ......
                                </div>
                            </>
                        )}
                    </div> */}

                    {user && single_sticker[0]?.ownerId !== user.id && (
                        <div>
                            <button onClick={addToFavorite}>Favorite</button>
                        </div>
                    )}
                </div>
            </div>
            <div id="review_container">
                <ALlReviews sticker={single_sticker} id={id}/>
            </div>
            <button onClick={goBack}>go back</button>
            </>
        )}
        </>
    )
}