import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer";
import './Stickers.css'
import StickerCards from "./StickerCards"
// import AddToCart from "../Cart/AddToCart"
import AddToFavorite from "../Favorites/AddToFavorite";
import { NavLink } from "react-router-dom";
import Popular from "./Categories/Popular";

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
        }, 1000)
    }, [dispatch])

    const stickers = Object.values(allStickers)


    // -------------------  Pagination  ------------------- //
    const loadMoreStickers = () => {
        setLoadMore(prev => prev + 12)
    }


    return (
        <>
            <div className="stickers-toppart_container">
                <span>Explore Stickers </span> /
            </div>

            <div className="allStickers_container">
                <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br />Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
                <span className="line-in-between"></span>

                <div className="sticker_wrapper">
                    <div className="sticker_filter">
                        <h4>SHOP COLLECTIONS</h4>
                        <div>
                            <div><NavLink to={'/explored-stickers'} className={'navlink'}>All</NavLink></div>
                            <div><NavLink className={'navlink'}>Recent</NavLink></div>
                            <div><NavLink to={'/explored-stickers/popular'} className={'navlink'}>Popular</NavLink></div>
                            {/* <div>Stickers by Designers</div> */}
                            <div>Categories</div>
                                <ul>
                                    <li className="filter-cato">Cute</li>
                                    <li className="filter-cato">Cool</li>
                                    <li className="filter-cato">Anime</li>
                                    <li className="filter-cato">Animal</li>
                                    <li className="filter-cato">Food</li>
                                </ul>
                        </div>
                    </div>

                    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                        <div className="sort-filter">
                            <div>sort <i className="fa-solid fa-arrow-up-a-z"></i></div>
                            <div>A-Z</div>

                        {isLoading ?(
                            <h2 className="loading">Loading...</h2>
                            
                        ) :(
                            <div>
                                {window.location.pathname.includes('/popular') ?(
                                    <>
                                    <Popular stickers={stickers} loadMore={loadMore} loadMoreStickers={loadMoreStickers}/>
                                    </>
                                ) :(
                                    <>
                                    <div className="sticker-cards_container">
                                        {stickers.slice(0, loadMore).map(sticker => {
        
                                            return (
                                                <div key={sticker?.id} className="stickers_container">
                                                    <StickerCards sticker={sticker} />
        
                                                    <AddToFavorite sticker={sticker} />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div style={{display:'flex', justifyContent:'center'}}>
                                        {loadMore >= stickers.length
                                            ? (null)
                                            : (<div onClick={loadMoreStickers} id="load-more">Load More Stickers</div>)
                                        }
                                    </div>
                                    </>
                                )}
                            </div>
                            
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}