import { thunkSearchStickers } from "../../../redux/stickerReducer"
import { useEffect } from "react";
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
            <div className="stickers-toppart_container">
                <span>Search Stickers</span> <span>/</span>

                {stickers && stickers.length > 0 && stickers[0].isSearch
                    ? (<div>{stickers.length} {stickers.length === 1 ?'result' :'results'} for &quot;{searchStickers}&quot;</div>)
                    : (
                        <div>0 result for &quot;{searchStickers}&quot;</div>
                    )}
            </div>
            {stickers && stickers.length > 0 && stickers[0].isSearch && stickers.length > 0 ? (
                <div className="allStickers_container">
                    <div className="sticker-cards_container search-stickers_container">
                        {stickers.map(sticker => {
                            return (
                                <div key={sticker?.id} className="stickers_container">
                                    <StickerCards sticker={sticker} />
                                    <AddToFavorite sticker={sticker} />
                                    {/* <AddToCart sticker={sticker} /> */}
                                </div>
                            )
                        })}
                    </div>

                    <div className="explore-more-stickers" style={{margin:'50px 0px'}}>Explore More Stickers</div>
                    <div className="sticker-cards_container explore-more_container">
                        {stickers[0].alternative_stickers.map(sticker => {
                            return (
                                <div key={sticker?.id} className="stickers_container">
                                    <StickerCards sticker={sticker} />
                                    <AddToFavorite sticker={sticker} />
                                    {/* <AddToCart sticker={sticker} /> */}
                                </div>
                            )
                        })}
                    </div>

                </div>
            ) : (
                <>
                    <div className="allStickers_container" >
                        <div className="couldnt-find" style={{marginBottom:'50px'}}>
                            <p >Whoopsie! Couldn&apos;t find &quot;<span style={{fontWeight:'700'}}>{searchStickers}</span>&quot;!</p>
                            <p >Let explore the other stickers.</p>
                        </div>

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
                    </div>

                </>
            )}

        </>
    )
}

export default SearchSticker