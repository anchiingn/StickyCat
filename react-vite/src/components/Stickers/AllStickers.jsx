import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer";
import './Stickers.css'
import StickerCards from "./StickerCards"
// import AddToCart from "../Cart/AddToCart"
import AddToFavorite from "../Favorites/AddToFavorite";
import { NavLink, useParams } from "react-router-dom";

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
        }, 500)
    }, [dispatch])

    const stickers = Object.values(allStickers)


    // -------------------  Pagination  ------------------- //
    const loadMoreStickers = () => {
        setLoadMore(prev => prev + 12)
    }

    // if (window.location.pathname.includes('/popular')) {
    //     console.log('polular')
    // }
    // else {
    //     console.log('none')
    // }

    const popularSticker = stickers.filter(sticker => sticker.star.length >= 5)

    return (
        <>
            {isLoading ? (
                <h2 style={{ margin: 'auto' }}>Loading...</h2>
            ) : (
                <>
                    <div className="stickers-toppart_container">
                        <span>Explore Stickers </span> /
                    </div>

                    <div className="allStickers_container">
                        <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br />Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
                        <div className="line-in-between"></div>
                        
                        

                        <div className="sticker_wrapper">
                            <div className="sticker_filter">
                                <h4>SHOP COLLECTIONS</h4>
                                <div>
                                    <NavLink to={'/explored-stickers'}>All</NavLink>
                                    <div>Recent</div>
                                    <NavLink to={'/explored-stickers/popular'}>Popular</NavLink>
                                    <div>Stickers by Designers</div>
                                    <div>Categories</div>

                                    <div className="filter-cato">Cute</div>
                                    <div className="filter-cato">Cool</div>
                                    <div className="filter-cato">Anime</div>
                                    <div className="filter-cato">Animal</div>
                                    <div className="filter-cato">Food</div>
                                </div>
                            </div>

                            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <div className="sort-filter">
                                    <div>sort <i className="fa-solid fa-arrow-up-a-z"></i></div>
                                </div>

                                <div className="sticker-cards_container">
                                    {window.location.pathname.includes('/popular') ?(
                                        <>
                                        {popularSticker.slice(0, loadMore).map(sticker => {
    
                                            return (
                                                <div key={sticker?.id} className="stickers_container">
                                                    <StickerCards sticker={sticker} />
    
                                                    {/* add and remove from favorite */}
                                                    <AddToFavorite sticker={sticker} />
                                                </div>
                                            )
                                        })}
                                        </>
                                    ) :(
                                        <>
                                        {stickers.slice(0, loadMore).map(sticker => {
    
                                            return (
                                                <div key={sticker?.id} className="stickers_container">
                                                    <StickerCards sticker={sticker} />
    
                                                    {/* add and remove from favorite */}
                                                    <AddToFavorite sticker={sticker} />
                                                </div>
                                            )
                                        })}
                                        </>
                                    )}
                                </div>
                                {loadMore >= stickers.length
                                    ? (null)
                                    : (<div onClick={loadMoreStickers} id="load-more">Load More Stickers</div>)
                                }
                            </div>
                        </div>
                    </div>


                </>

            )}

        </>
    )
}