export const getCartQuantityById = (product,id)=>{
    const findProduct = product.find((item)=>{
        return item._id === id
    })
  return  findProduct? findProduct.productCartQty :0
};



// export const getCartQuantityById = (product, id) => {
//   const foundProduct = product.find(item => item._id === id);
//   return foundProduct ? foundProduct.productCartQty : 0;
// };