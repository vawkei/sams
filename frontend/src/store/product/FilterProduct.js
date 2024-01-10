import { createSlice } from "@reduxjs/toolkit";

const initialFiteredState = {
  filteredProducts: [],
  // minPrice:null,
  // maxPrice:null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFiteredState,
  reducers: {
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;

      console.log(products, category);

      let tempProducts = [];
      if (category === "ALL") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => {
          return product.category === category;
        });
      }
      state.filteredProducts = tempProducts;
      console.log(state.filteredProducts);
    },
    //filterbyprice:
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      //console.log(products,price);
      const filteredPrice = products.filter((product) => {
        return product.price <= price;
      });
      state.filteredProducts = filteredPrice;
      //console.log(filteredPrice)
    },
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      console.log(products,search);
      let tempProduct = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });
      state.filteredProducts = tempProduct;
    },
    FILTER_BY_SORT(state,action){
        const {products,sort} = action.payload;
        //console.log(products,sort)
        let tempProducts = [];
        if(sort === "Latest"){
            tempProducts = products
        };
        if(sort === "Lowest-price"){
            tempProducts = products.slice().sort((a,b)=>{
                return a.price-b.price
            })
        };
        if(sort ==="Highest-price"){
            tempProducts = products.slice().sort((a,b)=>{
                return b.price-a.price
            })
        };
        if(sort === "A-Z"){
            tempProducts = products.slice().sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        };
        if(sort === "Z-A"){
            tempProducts = products.slice().sort((a,b)=>{
                return b.name.localeCompare(a.name)
            })
        }
        state.filteredProducts = tempProducts
    }
  },
});

export default filterSlice;
export const filterSliceAction = filterSlice.actions;
