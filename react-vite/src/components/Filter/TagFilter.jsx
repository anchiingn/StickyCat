import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import { useParams } from "react-router-dom";

const TagFilter = () => {
    const { tag } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allStickers = useSelector(state => state.stickers);


    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

    const isTag = stickers.filter(sticker => sticker.tag && sticker.tag.length > 0 && sticker.tag[0] === tag)

    return (
        <>
            {
                isTag.map(sticker => (
                    <div key={sticker.id}>
                        <img src={sticker.image} alt="" style={{ width: '20%' }} className="items" />
                    </div>
                ))
            }
        </>
    )
}

export default TagFilter