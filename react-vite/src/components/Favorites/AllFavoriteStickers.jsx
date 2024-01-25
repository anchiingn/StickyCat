import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkLoadAllFavorites } from "../../redux/stickerReducer"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { NavLink } from "react-router-dom"
import DeleteFavorites from "./DeleteFavorites"


export default function AllFavoriteStickers() {
    const dispatch = useDispatch()
    const fetchAllFavorites = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadAllFavorites())
    }, [dispatch])

    const favorite_stickers = fetchAllFavorites ? Object.values(fetchAllFavorites) : []
    return (
    <>
        {user && (
            <>
            {/* <div style={{display:'flex', flexDirection:'column', backgroundColor:'aqua', height:'max-content'}}> */}
                
            <div className="stickers-toppart_container">
            <NavLink className={'navlink'} style={{cursor:'default'}}>My Favorite Stickers</NavLink> 
            /
            </div>

        <div className="allStickers_container" id="user-stickers_container">
            {favorite_stickers.length === 0 ?(
                    <>
                    <div className="user-stickers_container"> 
                        {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Favorite Sticky Stickers</div> */}
                        <p className="user-paragraph">Oops! Your sticker collection seems a bit bare. Let&apos;s explored all charming masterpiece together!</p>
                        <div className="line-in-between"></div>
                        <button className="user-button">
                            <NavLink to={'/explored-stickers'} className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}>Explored Sticker</NavLink>
                        </button>
                    </div>
                    </>
                ) :(
                    <>
                    {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>My Favorite Sticky Stickers</div>
                    <div className="line-in-between"></div> */}
                        <div className="sticker-cards_container">
                            {favorite_stickers.map(sticker => {
                                // Check if sticker and sticker.stickers exist and have at least one element
                            if (sticker && sticker.stickers && sticker.stickers.length > 0 && sticker.userId === user.id) {
                                return (
                                    <div key={sticker?.id} className="stickers_container">
                                        <NavLink to={`/stickers/${sticker?.stickerId}`} className={'navlink'}>
                                            <div className="sticker-images_container">
                                                <img src={sticker?.stickers[0]?.image} alt={sticker?.stickers[0]?.title} />
                                            </div>
                                            <div className="sticker-details_top">
                                                <div>{sticker?.stickers[0]?.title}</div>
                                                <div>${sticker?.stickers[0]?.price}</div>
                                            </div>
                                        </NavLink>
                                        <div className="sticker-details_bottom">
                                            <div></div>
                                            <div style={{listStyle:'none', cursor:'pointer'}}>
                                                <OpenModalMenuItem
                                                itemText='Delete'
                                                modalComponent={<DeleteFavorites sticker={sticker} />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )} })}
                        </div>
                    </>
                )}
        </div>

        {/* </div> */}
        </>
        )}
    </>
    )
}