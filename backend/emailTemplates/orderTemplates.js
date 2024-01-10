const orderSuccessEmail = (name,cartItems) => {
    const email = {
        body: {
            name:name,
            intro:"Your order has been successfully places",
            table:{
                data:cartItems.map((item)=>{
                    return{
                        product:item.name,
                        price:item.price,
                        quantity:item.productCartQty,
                        total:item.price*item.productCartQty,
                    }
                }),
                columns:{
                    customWidth:{
                        product:"40%"
                    }
                }
            },
            action: {
                instructions: 'You can check the status of your order by visiting your orders page in our web app:',
                button: {
                    color: '#48cfad', // Optional action button color
                    text: 'Sams',
                    link: 'https://sams.com'
                }
            },
            outro:"Thanks for your purchase"
        }
    }
    return email;
}
 
module.exports = {orderSuccessEmail}