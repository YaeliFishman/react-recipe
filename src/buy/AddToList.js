import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AddToList = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)
    const navigate = useNavigate();
    const onSubmit = () => {
        const product = {
            Name: name,
            Count: count,
            UserId: user.Id
        }
        axios.post(`http://localhost:8080/api/bay`, product)
            .then((res) => {
                dispatch({ type: "ADD_TO_LIST", data: res.data });
                navigate("/allList")
            }).catch((error) => { alert(error.response.data) })
    }
    const changeName = (e) => {
        const n = e.target.value;
        setName(n);
    }
    const changeCount = (e) => {
        const c = e.target.value;
        setCount(c);
    }
    return (
        <>
            <input margin="normal" required fullWidth name="name" label="Enter new product of add to buy list" id="name" autoComplete="name" onChange={(e) => changeName(e)} defaultValue="name" />
            <input margin="normal" required fullWidth name="caunt" label="Enter count" id="count" autoComplete="count" onChange={(e) => changeCount(e)} defaultValue="count" />
            <input type="submit" onClick={onSubmit} value="Submit" />
        </>
    )
}
export default AddToList