import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { thunkLoadAllStickers } from "../../redux/stickerReducer"

const Filter = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allStickers = useSelector(state => state.stickers);


    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)

    const handleFilter = (tag) => {
        if (tag === 'cool') {
            navigate(`/stickers/tags/cool`)
        }
        else if (tag === 'cute') {
            navigate('stickers/tags/cute')
        }

    }

    return (
        <div className="filter_container" style={{display:'none'}}>
            <div onClick={() => handleFilter('cool')}>Cool</div>
            <div onClick={() => handleFilter('cute')}>Cute</div>
        </div>
    )
}

export default Filter