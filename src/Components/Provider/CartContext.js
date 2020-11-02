import React,{createContext,useReducer} from 'react';
export const CartContext = createContext();

const initialState = {
    cartItems:[] || JSON.parse(localStorage.getItem("cartItems"))
}

const reducer = (state,action) => {
    switch(action.type){
        case "ADD_TO_CART":
            const newBook = action.payload;
            const existedBook = state.cartItems.find( book => book.Id == newBook.Id);
            if(existedBook){
                return{cartItems:state.cartItems.map( book => book.Id === existedBook.Id ? existedBook : book )}
            }
            return{
                cartItems:[...state.cartItems,newBook]
            }
        case "REMOVE_ITEM":
                return{
                ...state,
                cartItems:state.cartItems.filter( item => item.Id !== action.payload )
            }
        default : throw new Error();

    }
}

export const CartContextProvider = props =>{
    const[state,dispatch] = useReducer(reducer,initialState);
    return(
        <CartContext.Provider value={[state,dispatch]}>
            {props.children}
        </CartContext.Provider>
    )
}