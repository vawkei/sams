import { createSlice } from "@reduxjs/toolkit";

const initialFiteredState = {
    filteredProducts:[],
    // minPrice:null,
    // maxPrice:null,
};

const filterSlice = createSlice({
    name:"filter",
    initialState:initialFiteredState,
    reducers:{
        FILTER_BY_CATEGORY(state,action){
            const {products,category} = action.payload;
            
            console.log(products,category);

            let tempProducts = [];
            if(category === "ALL"){
                tempProducts = products
            }else{
                tempProducts = products.filter((product)=>{
                   return product.category === category;
                })
            }
            state.filteredProducts = tempProducts
            console.log(state.filteredProducts)
            
        },
        //filterbyprice:
        FILTER_BY_PRICE(state,action){
            const {products,price} = action.payload;
            //console.log(products,price);
            const filteredPrice = products.filter((product)=>{
                return product.price <= price
            })
            state.filteredProducts = filteredPrice
            //console.log(filteredPrice)
        }
    }
});

export default filterSlice;
export const filterSliceAction = filterSlice.actions;