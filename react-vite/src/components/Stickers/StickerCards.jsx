import { useDispatch, useSelector } from "react-redux"
import {  useState } from "react"
import { NavLink } from "react-router-dom"

import './Stickers.css'


export default function StickerCards({ sticker }) {



    return (
        <>
            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                <div style={{position:'relative'}}>
                    <div className="sticker-images_container">
                        <img src={sticker?.image} alt={sticker?.title}/>
                    </div>
                    <div className="sticker-details">
                        <div>{sticker?.title}</div>
                        <div>${sticker?.price}</div>
                    </div>
                    {sticker?.reviews?.length > 1 && (
                        <div id="best-seller">
                            <img src="https://stickycat.s3.us-east-2.amazonaws.com/Screen_Shot_2024-01-17_at_3.15.46_PM+2.png" alt="" />
                            <div>Best Seller</div>
                        </div>
                    )}
                </div>
            </NavLink>
        </>
    )
}