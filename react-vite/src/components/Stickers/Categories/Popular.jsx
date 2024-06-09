import StickerCards from "../StickerCards"
import AddToFavorite from "../../Favorites/AddToFavorite"

const Popular = ({stickers, loadMore, loadMoreStickers}) => {
        const popularSticker = stickers.filter(sticker => sticker.star.length >= 5)

    return (
        <>
            <div className="sticker-cards_container">
                {popularSticker.slice(0, loadMore).map(sticker => {

                    return (
                        <div key={sticker?.id} className="stickers_container">
                            <StickerCards sticker={sticker} />

                            {/* add and remove from favorite */}
                            <AddToFavorite sticker={sticker} />
                        </div>
                    )
                })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {loadMore >= popularSticker.length
                    ? (null)
                    : (<div onClick={loadMoreStickers} id="load-more">Load More Stickers</div>)
                }
            </div>
        </>
    )
}

export default Popular