import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"

export default function CartModal () {
    const { setModalContent, closeModal } = useModal()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    return (
        <div>hi</div>
    )
}