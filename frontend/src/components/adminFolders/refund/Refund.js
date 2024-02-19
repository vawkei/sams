import axios from "axios";
import { useState } from "react";

const Refund =()=>{

    const [paystackTransactionId, setPaystackTransactionId] = useState('');

    const handleRefundOrder = async () => {
      try {
        const response = await axios.post('http://localhost:3001/refund-order', {
          paystackTransactionId,
        });
  
        console.log(response.data);
      } catch (error) {
        console.error('Error refunding order:', error);
      }
    };
  
    return (
      <div>
        <h1>Refund</h1>
        <div>
          <label>Paystack Transaction ID:</label>
          <input
            type="text"
            value={paystackTransactionId}
            onChange={(e) => setPaystackTransactionId(e.target.value)}
          />
        </div>
        <button onClick={handleRefundOrder}>Refund Order</button>
      </div>
    );
  

};

export default Refund;