import { thunkSearchStickers } from "../../../redux/stickerReducer"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchStickers, setSearchStickers] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault();

        await dispatch(thunkSearchStickers(searchStickers));
        setSearchStickers('');
        navigate(`/stickers/search/${encodeURIComponent(searchStickers)}`)
    }


    return (
        <div className="search_bar_wrapper">
            <form className="search_form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="search stickers ..."
                    value={searchStickers}
                    onChange={(e) => setSearchStickers(e.target.value)}
                />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
                {searchStickers.length > 0 ? (
                    <button onClick={() => setSearchStickers('')}>
                        <i className="fa-solid fa-xmark close-search"></i>                    
                    </button>
                ) : (
                    null
                )}
        </div>
    )
}

export default Search
