import './App.css';
import HomePage from "./users/HomePage";
import Signin from "./users/Signin";
import Login from "./users/Login";
import AllRecipes from "./recipes/AllRecipes";
import AddEditRecipes from "./recipes/AddEditRecipes";
import DetailRecipe from "./recipes/DetailRecipe";
import AddCategory from "./category/AddCategory";
import AddToList from './buy/AddToList';
import GetAllCategory from './category/getAllCategory';
import AllList from './buy/AllList';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (<>
    <HomePage></HomePage>
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/AllRecipes" element={<AllRecipes />} />
      <Route path="/AddEditRecipes" element={<AddEditRecipes />} />
      <Route path="/DetailRecipe" element={<DetailRecipe />} />
      <Route path="/AddCategory" element={<AddCategory />} />
      <Route path='/AddToList' element={<AddToList />} />
      <Route path='/getAllCategory' element={<GetAllCategory />}></Route>
      <Route path='/AllList' element={<AllList />}></Route>
    </Routes>
  </>);
}

export default App;