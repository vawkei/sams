
const Products = require("../models/products");

const updateProductQuantity = async(cartItems)=>{
    let bulkOption = cartItems.map((product)=>{
        return{
            updateOne:{
                filter:{_id:product._id},
                update:{
                    $inc:{
                        quantity: -product.productCartQty,
                        sold: +product.productCartQty
                    }
                }
            }
        }
    })
    await Products.bulkWrite(bulkOption,{})
}




module.exports = {updateProductQuantity}


