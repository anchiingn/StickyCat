import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { thunkAddToCart } from "../../redux/cardReducer"
import { thunkLoadAllCarts } from "../../redux/cardReducer"
import { thunkAddToFavorite, thunkDeleteFromFavorite } from "../../redux/stickerReducer"
import './Stickers.css'
import StickerCards from "./StickerCards"
import { NavLink } from "react-router-dom"


export default function AllStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)
    const [loadMore, setLoadMore] = useState(12)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [dispatch])

    const stickers = Object.values(allStickers)


    // -------------------  Pagination  ------------------- //
    const loadMoreStickers = () => {
        setLoadMore(prev => prev + 12)
    }


    return (
        <>
            {isLoading ? (
                <h2 style={{ margin: 'auto' }}>Loading...</h2>
            ) : (
                <>
                    <div className="stickers-toppart_container">
                        <NavLink className={'navlink'} style={{ cursor: 'default' }}>Explore Stickers </NavLink>
                        /
                    </div>

                    <div className="allStickers_container">
                        <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br />Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
                        <div className="line-in-between"></div>
                        <div className="sticker-cards_container">
                            {stickers.slice(0, loadMore).map(sticker => {


                                //add and remove from favorite
                                const addToFavorite = async (e) => {
                                    e.preventDefault()
                                    await dispatch(thunkAddToFavorite(sticker, sticker.id))
                                    await dispatch(thunkLoadAllStickers())
                                }
                                ///////////////////////////////

                                const removeFromFavorite = async (e) => {
                                    e.preventDefault()
                                    await dispatch(thunkDeleteFromFavorite(sticker?.favorited[0]?.id))
                                    await dispatch(thunkLoadAllStickers())
                                }

                                //add to cart
                                const addToCart = async (e) => {
                                    e.preventDefault()

                                    await dispatch(thunkAddToCart(sticker, sticker.id))
                                    await dispatch(thunkLoadAllCarts())
                                }
                                /////////////

                                return (
                                    <div key={sticker?.id} className="stickers_container">
                                        <StickerCards sticker={sticker} />

                                        {/* add and remove from favorite */}
                                        {user ? (
                                            sticker?.ownerId !== user.id && (
                                                <div>
                                                    {sticker?.favorited?.length === 0 ? (
                                                        <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={addToFavorite}></i>
                                                    ) : (
                                                        <i className="fa-solid fa-heart favorite-button" style={{ fontSize: '16px' }} onClick={removeFromFavorite}></i>
                                                    )}
                                                </div>
                                            )
                                        ) : (
                                            <div>
                                                <NavLink to="/login" className="navlink">
                                                    <i className="fa-regular fa-heart favorite-button" style={{ fontSize: '16px' }}></i>
                                                </NavLink>
                                            </div>
                                        )}

                                        {/* add to cart */}
                                        {user ? (
                                            sticker.ownerId !== user?.id && (
                                                <div className="cart_hover" onClick={addToCart}>
                                                    Add to cart
                                                </div>
                                            )
                                        ) : (
                                            <NavLink to="/login" className="navlink">
                                                <div className="cart_hove" >
                                                    Add to cart
                                                </div>
                                            </NavLink>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        {loadMore >= stickers.length
                            ? (null)
                            : (<div onClick={loadMoreStickers} id="load-more">Load More Stickers</div>)
                        }
                    </div>


                </>

            )}

        </>
    )
}