import { thunkSearchStickers } from "../../../redux/stickerReducer"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import StickerCards from "../../Stickers/StickerCards";
import AddToCart from "../../Cart/AddToCart";
import AddToFavorite from "../../Favorites/AddToFavorite";
import AllStickers from "../../Stickers/AllStickers";

const SearchSticker = () => {
    const { searchStickers } = useParams()
    const decodedString = decodeURIComponent(searchStickers)
    const dispatch = useDispatch();
    const loadSearchStickers = useSelector(state => state.stickers)

    useEffect(() => {
        dispatch(thunkSearchStickers(decodedString))
    }, [dispatch, decodedString])


    const stickers = Object.values(loadSearchStickers)



    return (
        <>
            <div className="stickers-toppart_container">
                <NavLink className={'navlink'} style={{ cursor: 'default' }}>
                    Search Stickers
                </NavLink>
                /
                {stickers && stickers.length > 0 && stickers[0].isSearch
                    ? (<div>{stickers.length} results for &quot;{searchStickers}&quot;</div>)
                    : (
                        <div>0 results for &quot;{searchStickers}&quot;</div>
                    )}
            </div>
            {stickers && stickers.length > 0 && stickers[0].isSearch && stickers.length > 0 ? (
                <div className="sticker-cards_container">
                    {stickers.map(sticker => {
                        return (
                            <div key={sticker?.id} className="stickers_container">
                                <StickerCards sticker={sticker} />
                                <AddToFavorite sticker={sticker} />
                                <AddToCart sticker={sticker} />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <>
                    <div>Whoopsie! Couldn&apos;t find &quot;<span>{searchStickers}</span>&quot;.</div>
                    <div>Let look for other stickers</div>
                    <div className="sticker-cards_container">
                        {stickers.map(sticker => {
                            return (
                                <div key={sticker?.id} className="stickers_container">
                                    <StickerCards sticker={sticker} />
                                    <AddToFavorite sticker={sticker} />
                                    <AddToCart sticker={sticker} />
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </>
    )
}

export default SearchSticker