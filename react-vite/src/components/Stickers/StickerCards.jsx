import { useDispatch, useSelector } from "react-redux"
import {  useState } from "react"
import { NavLink } from "react-router-dom"

import './Stickers.css'


export default function StickerCards({ sticker }) {


    return (
        <>
            <NavLink to={`/stickers/${sticker?.id}`} className={'navlink'}>
                <div className="sticker-images_container">
                    <img src={sticker?.image} alt={sticker?.title}/>
                </div>
                <div className="sticker-details_top">
                    <div>{sticker?.title}</div>
                    <div>${sticker?.price}</div>
                </div>
            </NavLink>
        </>
    )
}