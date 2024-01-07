import * as actionsName from './action';

const initializeState = {
    recipe: {},
    Ingredient: [],
    Instructions: [],
    recipies: [],
    user: {},
    category: [],
    listbuy: {},
    buy: [],
    id: {},
    // cat: {},

}
const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionsName.GET_RECIPIES: {
            const recipies = action.data;
            state.recipies = recipies;
            return {
                ...state,
                recipies
            }
        }
        case actionsName.SET_USER: {
            console.log(action.user)
            const user = action.user;
            state.user = user;
            return {
                ...state,
                user
            }
        }
        case actionsName.ADD_RECIPE: {
            const id = action.Id;
            const NewRecipe = action.recipe;
            NewRecipe.Id = id;
            state.recipe.push(NewRecipe);
            return {
                ...state,
                NewRecipe
            }
        }
        case actionsName.DELETE_RECIPE: {
            const id = action.id;
            const newrecipes = state.recipies?.filter((x) => (x.Id != id));
            console.log(id)
            state.recipies = newrecipes;
            return {
                ...state,
            }
        }
        case actionsName.EDIT_RECIPE: {
            const recipe = action.recipe;
            const id = action.recipe.Id;
            const index = state.recipies?.findIndex((x) => (x.Id == id));
            state.recipies[index] = recipe;
            return {
                ...state,
                recipe
            }
        }
        case actionsName.GET_CATEGORY: {
            const cat = action.category;
            state.category = cat;
            return {
                ...state,
            }

        }

        case actionsName.ADD_CATEGORY: {
            const cat = action.category;
            state.category.push(cat);
            return {
                ...state,
                cat
            }
        }
        case actionsName.ADD_TO_LIST: {
            const newp = action.data;
            state.buy.push(newp);
            return {
                ...state,
                newp
            }
        }
        case actionsName.GET_LIST: {
            const data = action.data;
            state.buy = data;
            return {
                ...state,
                data
            }
        }
        case actionsName.DELETE_BUY: {
            const listbuy = action.listbuy;
            const user = action.user;
            const prod = state.listbuy?.filter((x) => (x.Id == action.id));
            listbuy.remove(prod);
            return {
                ...state,
                prod
            }
        }
        case actionsName.EDIT_BUY: {
            // const list = action.listbuy;
            const buy = action.buy;
            const id = action.id;
            const index = state.listbuy?.findIndex((x) => (x.Id == id));
            state.listbuy[index] = buy;
            return {
                ...state,
                buy
            }
        }
    }
}

export default reducer