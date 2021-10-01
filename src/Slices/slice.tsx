import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    inEdit : false,
    pizzaToEdit : {}
}

const pizzaSlice = createSlice({
    name : 'pizza',
    initialState,
    reducers : {
        editPizzas : (state,action) => {
            state.pizzaToEdit=action.payload
            state.inEdit = true
        }
    }
})
export const {editPizzas} = pizzaSlice.actions
export default pizzaSlice.reducer