export const getCartQuantityById = (product,id)=>{
    const findProduct = product.find((item)=>{
        return item.id === id
    })
  return  findProduct? findProduct.productCartQty :0
};