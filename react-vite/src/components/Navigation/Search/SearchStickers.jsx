import { thunkSearchStickers } from "../../../redux/stickerReducer"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StickerCards from "../../Stickers/StickerCards";
import AddToCart from "../../Cart/AddToCart";
import AddToFavorite from "../../Favorites/AddToFavorite";

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
        <div className="search-result_title">
            Search result for "{searchStickers}" - {stickers.length} results
        </div>
        <div className="sticker-cards_container">
            {stickers.map(sticker => {
                return (
                    <>
                        <div key={sticker?.id} className="stickers_container">
                            <StickerCards sticker={sticker} />
                            <AddToFavorite sticker={sticker} />
                            <AddToCart sticker={sticker} />
                        </div>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default SearchSticker