import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EnterPage from "./EnterPage";
const HomePage = () => {
    const naving = useNavigate();
    const user = useSelector(state => state?.user);
    return (<>
        <div>
            {!user ? <p><EnterPage /></p> : <p>
                <button onClick={() => { naving("/AllRecipes") }} >הצגת המתכונים</button>
                <button onClick={() => { naving("/AddEditRecipes") }} >הוספת מתכון</button>
                <button onClick={() => { naving("/AddCategory") }} >להוספת קטגוריה</button>
                <button onClick={() => { naving("/AllList") }} >לרשימת הקניות</button>
            </p>
            }
        </div>
    </>);
}
export default HomePage