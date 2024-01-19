import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadSingleSticker, thunkAddToFavorite, thunkDeleteFromFavorite } from "../../redux/stickerReducer"
import { useParams, NavLink } from "react-router-dom"
import ALlReviews from "../Reviews/AllReviews"
import { thunkLoadAllReviews } from "../../redux/reviewReducer"
import { thunkAddToCart, thunkLoadAllCarts } from "../../redux/cardReducer"
import StickerCards from "./StickerCards"



export default function StickerDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const sticker = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)
    const [cart, setCart] = useState(false)

    useEffect(() => {
        dispatch(thunkLoadSingleSticker(id))
        dispatch(thunkLoadAllReviews(id))
        
    }, [dispatch, id])
    
    const single_sticker = sticker ? Object.values(sticker) : []


    // ------ Add/Remove from Favorite ---------//
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


    // ------ Add To Cart ---------//
    const addToCart = async(e) => {
        e.preventDefault()

        setCart(true)

        setCart(true)
        setTimeout(() => {
            setCart(false)
        }, 2000)

        await dispatch(thunkAddToCart(single_sticker, id))
        await dispatch(thunkLoadAllCarts())
    }


    // ------ Go Back Previous Page ---------//
    // const goBack = async(e) => {
    //     e.preventDefault()

    //     navigate(-1)
    // }


    // ------ Get Shipdate ---------//
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

    return (
        <>
        {single_sticker && single_sticker.length > 0 && single_sticker[0].user && single_sticker[0].user.length > 0 &&(
            <>
            <div className="stickers-toppart_container">
                <NavLink to={'/'} className={'navlink'}>Home</NavLink> 
                /
                <NavLink to={'/explored-stickers'} className={'navlink'}>Explored Stickers</NavLink> 
                /
                <NavLink className={'navlink'}>{single_sticker[0]?.title}</NavLink>
            </div>


            <div id="sticker-detail_container">
                <img id='sticker-detail_image' src={single_sticker[0]?.image} alt={single_sticker[0]?.title} />

                <div id='sticker-detail_infos'>
                    <div id="top-part">  
                        <div id="title">{single_sticker[0]?.title}</div>
                        <div id="price">${single_sticker[0]?.price}</div>
                    </div>
                    <div id="name">By: {single_sticker[0]?.user[0]?.firstname} {single_sticker[0]?.user[0]?.lastname}</div>
                    
                    {user && single_sticker[0]?.ownerId !== user?.id && (
                    <div id="cart-shipdate">
                        <div >
                            <div>
                                <button id="addToCart" onClick={addToCart}>Add to Cart</button>

                                {single_sticker[0]?.favorited?.length === 0 || single_sticker[0]?.favorited[0]?.userId !== user?.id ?(
                                    <button className="favorite-button" onClick={addToFavorite}><i className="fa-regular fa-heart"></i></button>
                                ): (
                                    <button className="favorite-button" onClick={removeFromFavorite}><i className="fa-solid fa-heart"></i></button>
                                )}
                            </div>

                            {cart && (
                                <div id="cart-noti">Sticker has been added to cart</div>
                            )}
                        </div>

                        <div>Estimated to Ship {monthName} {day}, {year}</div>
                    </div>
                    )}

                    <div id="message">
                        <div style={{fontWeight:'bold'}}>Message from creator:</div>
                        <div style={{margin:'0px 20px'}}>{single_sticker[0]?.message}</div>
                    </div>

                    <div >
                        {/* <div>product detail</div> */}
                        {/* <button onClick={() => setShow(!show)}> v</button>
                        {!show && ( */}
                            <>
                                <div>
                                    <div style={{fontWeight:'bold', marginTop:'10px'}}>Dimensions:</div>
                                    <div style={{margin:'0px 20px'}}>
                                        <div id="height">Height: {single_sticker[0]?.height} inchs</div>
                                        <div id="width">Width: {single_sticker[0]?.width} inchs</div>
                                    </div>
                                    {/* <div>material:</div>
                                    <div>Care Instructions:</div> */}
                                </div>
                            </>
                        {/* )} */}
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

                </div>
            </div>


            {/*  ------ Get Reviews --------- */}
            <div id="review_container">
                <ALlReviews sticker={single_sticker} id={id}/>
            </div>

            </>
        )}
        </>
    )
}