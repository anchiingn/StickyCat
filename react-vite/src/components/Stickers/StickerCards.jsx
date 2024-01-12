import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { NavLink } from "react-router-dom"
import './Stickers.css'


export default function StickerCards({ sticker }) {
 

    return (
        <>
      
            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                <div className="sticker-images_container">
                    <img src={sticker?.image} alt={sticker?.title}/>
                </div>
                <div className="sticker_details">
                    <div>{sticker?.title}</div>
                    <div>${sticker?.price}</div>
                </div>
            </NavLink>
        
        </>
    )
}