import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import MenuServices from '../../services/MenuServices'
import AuthServices from '../../services/AuthServices'
import CartServices from '../../services/CartServices'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const AddToCart = () => {

  const [cartData, setCartData] = useState([])
  const [menuData, setMenuData] = useState([])

  useEffect(() => {
    FetchCart()
  }, [])

  const uid = AuthServices.getUid()

  const FetchCart = async () => {

    let data = await CartServices.CartByUser(uid)
    setCartData(data)

    let menu = await MenuServices.All()
    setMenuData(menu)

  }

  const GetProduct = (id) => {
    return menuData.find((el) => el.id == id)
  }

  const GrandTotal = () => {

    let total = 0

    cartData.forEach((item) => {

      let product = GetProduct(item.proId)

      if (product) {
        total += product.price * item.quantity
      }

    })

    return total

  }

  const IncreaseQuantity = async (item) => {

    let data = {
      quantity: item.quantity + 1
    }

    let res = await CartServices.Update(data, item.id)

    if (res == 1) {
      FetchCart()
      toast.success("Quantity Updated")
    }
    else {
      toast.error("Something Went Wrong")
    }

  }

  const DecreaseQuantity = async (item) => {

    if (item.quantity > 1) {

      let data = {
        quantity: item.quantity - 1
      }

      let res = await CartServices.Update(data, item.id)

      if (res == 1) {
        FetchCart()
        toast.success("Quantity Updated")
      }
      else {
        toast.error("Something Went Wrong")
      }

    }

  }

  const RemoveItem = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {

      if (result.isConfirmed) {

        let res = await CartServices.delete(id)

        if (res == 1) {
          toast.success("Item Removed")
          FetchCart()
        }
        else {
          toast.error("Something Went Wrong")
        }

      }

    })

  }

  const handlePay = (amt) => {

  var options = {
    key: "rzp_test_TGVsewt7NtQJNB", 
    amount: amt * 100,
    currency: "INR",
    name: "Campus Bites",
    description: "Food Order",

    handler: function (response) {
      toast.success("Payment Successful");
      console.log(response);
    },

    prefill: {
      name: "Sukhmeen Kaur",
      email: "example@gmail.com",
      contact: "9876543210"
    },

    theme: {
      color: "#198754"
    }
  };

  const rzp = new Razorpay(options);

  rzp.on("payment.failed", function () {
    toast.error("Payment Failed");
  });

  rzp.open();
};

  return (
    <>
      <section className="contact-section">
        <div className="container">

          <div className="row g-4 justify-content-center">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="flex-grow-1 text-center m-0">
                Shopping Cart
              </h1>
            </div>

            <div className="col-lg-10" data-aos="fade-left">

              {
                cartData.length > 0 ?

                  <div className="bg-white rounded shadow p-4">

                    <table className="table">

                      <thead>
                        <tr>
                          <th>PRODUCT DETAILS</th>
                          <th>QUANTITY</th>
                          <th>PRICE</th>
                          <th>TOTAL</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>

                      <tbody>

                        {
                          cartData.map((item) => {

                            const product = GetProduct(item.proId)

                            if (!product) return null

                            return (

                              <tr key={item.id}>

                                <td>
                                  <div className="d-flex align-items-center gap-3">

                                    <img
                                      src={product.image}
                                      width={80}
                                      height={80}
                                      className="rounded"
                                      alt={product.name}
                                    />

                                    <div>
                                      <h6 className="mb-0">{product.name}</h6>
                                    </div>

                                  </div>
                                </td>

                                <td>

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => DecreaseQuantity(item)}
                                  >
                                    -
                                  </button>

                                  <span className="mx-2 fw-bold">
                                    {item.quantity}
                                  </span>

                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => IncreaseQuantity(item)}
                                  >
                                    +
                                  </button>

                                </td>

                                <td>
                                  ₹ {product.price}
                                </td>

                                <td>
                                  ₹ {product.price * item.quantity}
                                </td>

                                <td>

                                  <button
                                    className="btn btn-danger"
                                    onClick={() => RemoveItem(item.id)}
                                  >
                                    Remove
                                  </button>

                                </td>

                              </tr>

                            )

                          })
                        }

                      </tbody>

                    </table>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mt-4">

  <Link to="/menu" className="btn btn-outline-danger">
    ← Continue Shopping
  </Link>

  <button
  className="btn btn-success btn-lg"
  onClick={() => handlePay(GrandTotal())}
>
  Pay Now
</button>

  <h4 className="fw-bold text-dark mb-0">
    Grand Total : ₹ {GrandTotal()}
  </h4>

</div>

                  </div>

                  :

                  <div className="text-center">

                    <h3>Your Cart is Empty</h3>

                    <Link
                      className="btn btn-danger"
                      to="/viewMenu"
                    >
                      Start Shopping
                    </Link>

                  </div>

              }

            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default AddToCart