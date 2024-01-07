import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router';

const schema = yup.object({
  name: yup.string('must chars').max(15, 'max is 15 chars').min(2, 'min is 2 chars').required('this is required value'),
  category: yup.number().required(),
  Image: yup.string().required(),
  Ingredient: yup.array().of(yup.object({
    Name: yup.string().required('this is required').min(1, 'must minimum 1 '),
    Count: yup.number().required('this is required').min(1, 'must minimum 1 '),
    Type: yup.string().required('this is required').min(1, 'must minimum 1 '),
  })),
  Instructions: yup.array().of(
    yup.object({
      Instruction: yup.string().required()
    })
  )
})
const AddEditRecipes = (data) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user);
  const categories = useSelector(state => state?.category);
  const { state } = useLocation();
  const recipedata = state;
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields: Ingredientf, append: appendingedient } = useFieldArray({
    control, name: "Ingredient"
  });
  const { fields: Instructionsf, append: appendInstruction, } = useFieldArray({
    control, name: "Instructions"
  });

  const onSubmit = () => {
    console.log(recipedata);
    if (recipedata) {
      axios.post(`http://localhost:8080/api/recipe/edit`, recipedata)
        .then((newrecipe) => {
          dispatch({ type: "EDIT_RECIPE", recipe: newrecipe })
          alert("המתכון עודכן בהצלחה!!");
        }).catch((error) => {
          alert("error 1")
        })
    }
    else {
      axios.post(`http://localhost:8080/api/recipe`, recipedata)
        .then((Idfromaxios) => {
          dispatch({ type: "ADD_RECIPE", recipe: recipedata, Id: Idfromaxios })
          alert("המתכון נוסף בהצלחה!!");
        }).catch((error) => {
          alert("error 2")
        })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label>the name of recipe</label>

      <br />  <input {...register("name")} label="category" type="text" defaultValue={recipedata?.Name} />
      <br />   <select {...register("category")} label="category" defaultValue={recipedata ? recipedata.category : "select category"} >
        {categories?.map((category) => (
          <option key={category.Id} value={category.Id}>{category.Name}</option>
        ))}
      </select>
      <br /> <select {...register("difficulty")} placeholder="difficulty" defaultValue={recipedata ? recipedata.Difficulty : "select difficulty"} >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
      <br /> <label>duration</label> <input {...register("duration")} type="number" placeholder="duration" defaultValue={recipedata?.Duration} />
      <br /> <label>description</label> <input {...register("description")} type="text" placeholder="description" defaultValue={recipedata?.Description} />
      <br /> <label>userId </label> <input {...register("userId")} type="text" placeholder="userId" defaultValue={user.Name} disabled={user.Name} />
      <br /> <label>Image</label> <input {...register("Image")} type="url" placeholder="Image" defaultValue={recipedata?.Img} />
      <hr /> <div>
        <label>product</label><br />
        {Ingredientf.map((field, index) => (
          <>
            <div key={index}>
              <hr />
              <input
                {...register(`Ingredient[${index}].Name`)}
                placeholder='enter name'
                defaultValue={recipedata ? recipedata.Ingredient[index].Name : "Name"}
              />
              <p>{errors.Ingredient?.[index]?.Name?.message}</p>

              <input
                {...register(`Ingredient[${index}].Count`)}
                defaultValue={recipedata ? recipedata.Ingredient[index].Count : "Count"}
              />
              <p>{errors.Ingredient?.[index]?.Count?.message}</p>

              <input
                {...register(`Ingredient[${index}].Type`)}
                defaultValue={recipedata ? recipedata.Ingredient[index].Type : "Type"}
              />
              <p>{errors.Ingredient?.[index]?.Type?.message}</p>
            </div>
          </>
        ))}
        <input type="button" onClick={() => appendingedient({ Name: "", Count: 0, Type: "" })} value="הוסף שדה" />
      </div>
      <hr />
      <br />  <div>
        <label>Instruction</label><br />
        {Instructionsf.map((field, index2) => (
          <>
            <input
              {...register(`Instructions.${index2}.Instruction`)}
              placeholder={recipedata ? recipedata.Instructions[index2] : "Instruction"}

              defaultValue={recipedata ? recipedata.Instructions[index2] : "Instruction"}
            />
            <p>{errors.Instructions?.[index2]?.Instruction?.message}</p>
          </>
        ))}
        <input type="button" onClick={() => appendInstruction({ Instruction: "" })} value="הוסף הוראה" />
        <hr /><br /> </div>
      <button onSubmit={() => onSubmit()} type="submit" >submit</button>
    </form>
  )
};
export default AddEditRecipes;