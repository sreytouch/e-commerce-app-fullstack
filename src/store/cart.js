import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItem:[]},
    reducers:{
        setCartItem:(state,action)=>{
            state.cartItem=action.payload
        }
    }
})

export const {setCartItem}=cartSlice.actions
export const selectCartItem=(state)=>state.cart.cartItem
export default cartSlice.reducer