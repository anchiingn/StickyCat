import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer"
import './Stickers.css'
import StickerCards from "./StickerCards"
import { NavLink } from "react-router-dom"


export default function AllStickers() {
    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)
    // const [ filter, setFilter ] = useState('')

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
    }, [dispatch])

    const stickers = Object.values(allStickers)
    
    // for(let sticker of stickers ) {
    //     const days = new Date(sticker.createAt)
    //     sticker['day'] = days.getTime()        
    // }

    // stickers.sort((a,b) => b.day - a.day)

    
    // -------------------  Pagination  ------------------- //
    // const [ currentPage, setCurrentPage ] = useState(1);
    // const stickerPerPage = 16;
    // const lastIndex = currentPage * stickerPerPage; //16
    // const firstIndex = lastIndex - stickerPerPage; //0
    // const stickerPage = stickers.slice(firstIndex, lastIndex); //take the first 16 stickers
    // const numOfPage = Math.ceil(stickers.length / stickerPerPage); //get page numbers 
    // const numbers = [...Array(numOfPage + 1).keys()].slice(1) 
    //                 //make the numofPage into Array
    //                 //use .keys to get the number of page
    //                 //because it is array, it will start at zero, so add 1 and use slice to take the zero out 

    // function prevPage () {
    //     window.scrollTo(0, 0);
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage - 1)
    //     }
    // }
    
    // function changeCurrentPage (id) {
    //     window.scrollTo(0, 0);
    //     setCurrentPage(id)
    // }
    
    // function nextPage () {
    //     window.scrollTo(0, 0);
    //     if ( currentPage !== numOfPage) {
    //         setCurrentPage(currentPage + 1)
    //     }
    // }


    return (
        <>
        <div className="stickers-toppart_container">
            <NavLink to={'/'} className={'navlink'}>Home</NavLink> 
            /
            <NavLink className={'navlink'} style={{cursor:'default'}}>Explored Stickers</NavLink> 
        </div>

        {/* <div style={{fontFamily:'var(--big-font)', fontSize:'30px', letterSpacing:'1.25px'}}>All Sticky Stickers</div> */}
        <div className="allStickers_container">
            <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br/>Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
            <div className="line-in-between"></div>
            <div className="sticker-cards_container">
                {stickers.map(sticker => {
                    return (
                        <div key={sticker?.id} className="stickers_container">
                            <StickerCards sticker={sticker} />
                        </div>
                    )
                })}
            </div>
        </div>
        
        {/* <nav>
            <ul>
                <li>
                    <button onClick={() => prevPage()}><i className="fa-solid fa-arrow-left"></i></button>
                </li>
                {numbers.map((n, i) => (
                        // console.log(n)
                        <li key={i}>
                            <button className={`numPage ${currentPage === n ? 'active' : ''}`} onClick={() => changeCurrentPage(n)}>{n}</button>
                        </li>
                    ))}
                <li>
                    <button onClick={() => nextPage()}><i className="fa-solid fa-arrow-right"></i></button>
                </li>
            </ul>
        </nav> */}
        </>
    )
}