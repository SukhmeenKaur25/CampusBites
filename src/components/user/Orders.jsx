import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import OrderServices from "../../services/OrderServices";
import MenuServices from "../../services/MenuServices";

const Orders = () => {

  const uid = AuthServices.getUid();

  const [orderData, setOrderData] = useState([]);

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    FetchOrders();
  }, []);

  const GetProduct = (id) => {
    return menuData.find((el) => el.id == id);
  }

  const FetchOrders = async () => {

    let data = await OrderServices.OrderByUser(uid);

    setOrderData(data);

    let menu = await MenuServices.All();
    setMenuData(menu);

  };

  return (
    <>
      <div className="container mt-5">

        <h2 className="text-center mb-4">
          My Orders
        </h2>

        <table className="table table-bordered">

          <thead>

            <tr>
              <th>Token</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Order Details</th>
            </tr>

          </thead>

          <tbody>

            {
              orderData.map((item) => (

                <tr key={item.id}>

                  <td>{item.token}</td>

                  <td>₹ {item.amount}</td>

                  <td>
  <span
    className={
      item.status === "Pending"
        ? "badge bg-warning text-dark"
        : item.status === "Preparing"
        ? "badge bg-primary"
        : item.status === "Ready"
        ? "badge bg-info text-dark"
        : "badge bg-success"
    }
  >
    {item.status}
  </span>
</td>

                  <td>
                    {item.createdAt?.toDate().toLocaleDateString()}
                  </td>

                 <td>

  <button
    className="btn btn-danger btn-sm text-white"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target={`#items${item.id}`}
  >
    <i className="fa fa-info-circle"></i>
  </button>

  <div
    className="collapse mt-2"
    id={`items${item.id}`}
  >

    <div className="accordion" id={`acc${item.id}`}>

      {
        item.items?.map((pro, index) => {

          let product = GetProduct(pro.proId)

          return (

            <div
              className="accordion-item"
              key={index}
            >

              <h2 className="accordion-header">

                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}${index}`}
                >
                  {product?.name}
                </button>

              </h2>

              <div
                id={`collapse${item.id}${index}`}
                className="accordion-collapse collapse"
                data-bs-parent={`#acc${item.id}`}
              >

                <div className="accordion-body">

                  <img
                    src={product?.image}
                    width="70"
                    className="rounded mb-2"
                  />

                  <p><b>Price :</b> ₹ {product?.price}</p>

                  <p><b>Quantity :</b> {pro.quantity}</p>

                  <p><b>Total :</b> ₹ {product?.price * pro.quantity}</p>

                </div>

              </div>

            </div>

          )

        })
      }

    </div>

  </div>

</td>
                </tr>

              ))
            }

          </tbody>

        </table>

      </div>
    </>
  );

};

export default Orders;