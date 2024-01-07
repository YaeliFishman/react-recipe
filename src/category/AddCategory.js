import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const AddCategory = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const currentCategory = e.target.value;
        setCategoryName(currentCategory);
    };
    const onSubmit = () => {
        const cat = { Name: categoryName }
        axios.post(`http://localhost:8080/api/category`, cat)
            .then((res) => {
                dispatch({ type: "ADD_CATEGORY", category: res.data })
                navigate("/getAllCategory")
            }).catch((error) => {
                alert(error.response.data)
            })
    }
    return (
        <>
            <input margin="normal" required fullWidth name="name" label="Enter new category" onChange={(e) => handleInputChange(e)} id="name" autoComplete="name" />
            <button onClick={onSubmit}>submit</button>
        </>
    )
}
export default AddCategory;