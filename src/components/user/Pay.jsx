import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Pay = () => {

    const [price, setprice] = useState(0)

    let el={
        price:800
    }


    const handlePay = (amt) => {
   

        var options = {
            "key": "Your Key", 
            "amount": amt * 100, 
            "currency": "INR",
            "name": "Campus Bites", 
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
          
            "handler": function (response) {
                     toast.success("Success")
                     
            },

            "prefill": { 
                "name": "Sukhmeen kaur", 
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#c62104"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          toast.error("Payment Failed")
        });
      
         rzp1.open();
     

    }
    return (

        <>
            <div className='container' >

                <div>pay</div>
                <input 
                    value={price}
                    onChange={(e)=>{
                        setprice(e.target.value)
                    }}
                type="text" /> <br />

                <button onClick={() => {
                    handlePay(el.price)
                }} className='btn btn-success'>pay</button>
            </div>
        </>
    )
}

export default Pay