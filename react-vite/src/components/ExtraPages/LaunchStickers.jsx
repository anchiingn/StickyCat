import { NavLink } from 'react-router-dom'
import NewSticker from '../Stickers/NewSticker'
import './ExtraPages.css'

export default function LaunchStickers () {
    return (
        <>
        <div className='image-backgrround'>
            <img src="./public/images/IMG_2901.JPG" alt=""/>
        </div>
        <div className='blank-background_container'>
            <div className='small_container'>Innovation <span>-</span> Imaginative <span>-</span> Originality <span>-</span> Inventive <span>-</span> Visionary</div>
            <div className='about-infos_container'>
                <h1>TURN YOUR CREATIVITY INTO STICKER</h1>
                <p>Bringing your dream sticker collection to life has never been more seamless! StickyCat partners with you to conceptualize, present, market, and manufacture a unique sticker series tailored by you, exclusively for your fans! And guess what? It's a worry-free journey with no upfront expenses!</p>
                <div className="line-in-between"></div>

                <button className='user-button'>
                    <NavLink to="/new-sticker" className={'navlink'} style={{padding:'20px 40px', borderRadius:'50px'}}> Let Create Sticker</NavLink>
                </button>
            </div>
        </div>
        <div>hello</div>
        </>
    )
}