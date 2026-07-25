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
              <th>Items</th>
            </tr>

          </thead>

          <tbody>

            {
              orderData.map((item) => (

                <tr key={item.id}>

                  <td>{item.token}</td>

                  <td>₹ {item.amount}</td>

                  <td>{item.status}</td>

                  <td>
                    {item.createdAt?.toDate().toLocaleDateString()}
                  </td>

                  <td>
  {
    item.items?.length > 0 ?

      item.items.map((pro, index) => {

        let product = GetProduct(pro.proId);

        return (
          <div key={index} className="mb-2">
  <b>{product?.name}</b>

  <br />

  <small>Qty : {pro.quantity}</small>

  <hr />
</div>
        )

      })

      :

      "No Items"

  }
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