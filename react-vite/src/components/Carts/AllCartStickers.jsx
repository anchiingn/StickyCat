import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AllCartStickers () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const fetchCartStickers = useSelector(state => state.carts)

    useEffect(() => {

    },[dispatch])

    return (
        <>
            <div>this is cart</div>
        </>
    )
}