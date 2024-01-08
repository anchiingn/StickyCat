import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateNewStickers, thunkLoadAllStickers } from '../../redux/stickerReducer';

export default function NewSticker () {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()

        // const newSticker = {
        //     title, 
        //     price,
        //     image,
        //     height,
        //     width,
        //     message
        // }
        // console.log(newSticker)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", price)
        formData.append("image", image)
        formData.append("height", height)
        formData.append("width", width)
        formData.append("message", message)

    
        await dispatch(thunkCreateNewStickers(formData))
        await dispatch(thunkLoadAllStickers())
        navigate('/')
    }


    return (
        <>
            <div>
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <label>title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>price</label>
                    <input 
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label>image</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label>height</label>
                    <input 
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <label>width</label>
                    <input 
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                    <label>message</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}