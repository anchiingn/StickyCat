import { NavLink } from "react-router-dom"

import './Stickers.css'


export default function StickerCards({ sticker }) {

    // -------------------  Star Rating  ------------------- //
    let starRating = 0
    if (sticker.review && sticker.review.length >= 1) { //check if it their is review before iteration
        for (let star of sticker.star) {
            starRating += star / sticker.review.length;
        }
    } else if (sticker.review && sticker.review.length === 1) {
        starRating = sticker.star;
    }
    
    return (
        <>
            <NavLink to={`/stickers/${sticker?.id}/${encodeURIComponent(sticker?.title.replace(/\s+/g, '-').toLowerCase())}`} className={'navlink'}>
                <div style={{ position: 'relative' }} className="st">
                    <div className="sticker-images_container">
                        <img src={sticker?.image} alt={sticker?.title} />
                    </div>
                    <div className="sticker-details_top">
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{sticker?.title}</div>
                            <div>${sticker?.price}</div>
                        </div>
                        <div>
                            {window.location.pathname === '/my-stickers' ? (
                                <div style={{ color: 'var(--hover-grey)', fontSize: '12px' }}>Design by: {sticker?.user[0]?.firstname} {sticker?.user[0]?.lastname}</div>
                            ) :(
                                <div style={{ color: 'var(--hover-grey)', fontSize: '12px' }}>Design by: {sticker?.user?.firstname} {sticker?.user?.lastname}</div>
                            )}
                        </div>
                        <div>
                            <div id="star-rating">
                                {[1, 2, 3, 4, 5].map((starNum, index) => {
                                    return (
                                        <div key={index}>
                                            <i className={`fa-solid fa-star`} style={{
                                                color: starRating >= starNum ? 'var(--color-red)' : 'rgb(187, 182, 178)',
                                                fontSize: '5px'
                                            }}></i>
                                        </div>
                                    )
                                })}

                                <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '-2px', paddingLeft: '5px' }}>
                                     ({sticker?.review?.length})
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {sticker?.reviews?.length > 1 && (
                        <div id="best-seller">
                            <img src="https://stickycat.s3.us-east-2.amazonaws.com/Screen_Shot_2024-01-17_at_3.15.46_PM+2.png" alt="" />
                            <div>Best Seller</div>
                        </div>
                    )} */}
                </div>
            </NavLink>
        </>
    )
}