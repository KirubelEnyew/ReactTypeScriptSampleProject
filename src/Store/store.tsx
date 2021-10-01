import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice from '../Slices/slice'
export default configureStore({
    reducer : {
        pizza : pizzaSlice,
    }
})