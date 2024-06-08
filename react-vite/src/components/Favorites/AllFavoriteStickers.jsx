import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllFavorites } from "../../redux/stickerReducer"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { NavLink } from "react-router-dom"
import DeleteFavorites from "./DeleteFavorites"
import StickerCards from "../Stickers/StickerCards"
import AddToCart from "../Cart/AddToCart"


export default function AllFavoriteStickers() {
    const dispatch = useDispatch()
    const fetchAllFavorites = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        dispatch(thunkLoadAllFavorites())
        setTimeout(() => {
            setIsLoading(false)
        }, 200)
    }, [dispatch])

    const favorite_stickers = fetchAllFavorites ? Object.values(fetchAllFavorites) : []
    favorite_stickers.sort((a,b) => b?.id - a?.id)

    return (
    <>
    {isLoading ? (
        <h2 style={{margin:'auto'}}>Loading...</h2>
    ) :(
        <>
        {user && (
            <>
            {/* <div style={{display:'flex', flexDirection:'column', backgroundColor:'aqua', height:'max-content'}}> */}
                
            <div className="stickers-toppart_container">
                <NavLink className={'navlink'} style={{cursor:'default'}}>My Favorite Stickers</NavLink> 
                /
            </div>

        <div style={{ display:'flex', justifyContent:'center'}}>
            <div className="allStickers_container" id="user-stickers_container">
                {favorite_stickers.length === 0 ?(
                        <>
                        <div className="user-stickers_container"> 
                            {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Favorite Sticky Stickers</div> */}
                            <p className="user-paragraph">Oops! Your sticker collection seems a bit bare. Let&apos;s explored all charming masterpiece together!</p>
                            <div className="line-in-between"></div>
                            <button className="user-button">
                                <NavLink to={'/explored-stickers'} className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}>Explore Sticker</NavLink>
                            </button>
                        </div>
                        </>
                    ) :(
                        <>
                        {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Favorite Sticky Stickers</div>
                        <div className="line-in-between"></div> */}
                            <div className="sticker-cards_container">
                                {favorite_stickers.map(sticker => {
                                    // -------------------  Star Rating  ------------------- //
                                    // let starRating= 0;
                                    // if (sticker.stickers && sticker.stickers.length > 0 ) { //check if it their is review before iteration
                                    // for (let star of sticker.stickers[0]?.star) {
                                    //     starRating += (star) / sticker.stickers[0]?.star?.length;
                                    // }
                                    // }
                                    // Check if sticker and sticker.stickers exist and have at least one element
                                    if (sticker && sticker.stickers && sticker.stickers.length > 0 && sticker.userId === user.id) {
                                    return (
                                        <div key={sticker?.id} className="stickers_container">
                                            <StickerCards sticker={sticker.stickers[0]} />
                                            <div className="sticker-details_bottom">
                                                <div></div>
                                                <div style={{listStyle:'none', cursor:'pointer'}}>
                                                    <OpenModalMenuItem
                                                    itemText='Delete'
                                                    modalComponent={<DeleteFavorites sticker={sticker} />}
                                                    />
                                                </div>
                                            </div>
                                            <AddToCart sticker={sticker.stickers[0]} />
                                        </div>
                                    )} })}
                            </div>
                        </>
                    )}
            </div>
        </div>

        {/* </div> */}
        </>
        )}
        </>
    )}
    </>
    )
}