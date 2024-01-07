import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'
const DetailRecipe = () => {
    const dispatch = useDispatch();
    const { state } = useLocation()
    const selectRecipe = state;
    const user = useSelector(state => state?.user);
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const oncli = () => { window.print(); }
    const ToAdd = (x) => {
        const product = { Name: x.Name, Count: x.Count, UserId: user.Id, Id: 2 }
        axios.post(`http://localhost:8080/api/bay`, product)
            .then((res) => {
                dispatch({ type: "ADD_TO_LIST", data: res.data });
                alert('add in succed');
            }).catch((error) => { alert(error.response.data) })
    }
    const changeName = (e) => { const n = e.target.value; setName(n); }
    return (<>
        <div>   <div>
            <div key={selectRecipe.Id}>
                <br />  <label> </label>{selectRecipe.Name}
                <br />  <label> user name: </label>  {selectRecipe.UserId.Name}
                <br />  <label> category: </label> {selectRecipe.CategoryId}
                <br />  <label> duration: </label> {selectRecipe.Duration}
                <br />  <label> difficulty: </label> {selectRecipe.Difficulty}
                <br />  <label> description: </label> {selectRecipe.Description}
                <br /> <img src={selectRecipe.Img}></img>
                <br /></div>
        </div>
            <label> Ingredient</label>
            <div> {selectRecipe?.Ingrident?.map((x) => (
                <div key={x.Name}>{x.Count},{x.Name},{x.Type}
                    <button onClick={() => ToAdd(x)}>add to my buy </button></div>
            ))}</div>
            <div>
                <label>the Instruction</label>
                {selectRecipe?.Instructions?.map((x) => (
                    <div key={x}> {x} </div>
                ))}
            </div></div>
        <button onClick={oncli}>to print</button>
    </>
    )
}
export default DetailRecipe