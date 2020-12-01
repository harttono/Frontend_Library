import React,{createContext,useReducer,useContext} from 'react';
import {LIST_BOOKMARK_REQUEST,LIST_BOOKMARK_SUCCESS,LIST_BOOKMARK_FAIL} from './constants/Constant'
export const BookMarkContext = createContext();

const initialState ={
    Bookmarks:[] 
}
const reducer = (state,action) =>{
    switch(action.type){
        case LIST_BOOKMARK_REQUEST:
            return{
                ...state,
                isLoading:true,
            }
        case LIST_BOOKMARK_SUCCESS:        
            return{
                ...state,
                isLoading:false,
                Bookmarks:action.payload
            }
        case LIST_BOOKMARK_FAIL:
            return{
                ...state,
                isLoading:false,
                erorr:action.payload
            }
        default :
            return state;
    }
}

export const BookMarkContextProvider = props =>{
    const[state,dispatch] = useReducer(reducer,initialState)
    return(
        <BookMarkContext.Provider value={{state,dispatch}}>
            {props.children}
        </BookMarkContext.Provider>
    )
}


export const useBookMark = () => useContext(BookMarkContext);