import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import OrderServices from '../../../services/OrderServices'
import MenuServices from '../../../services/MenuServices'

const AllOrders = () => {
    const [orderData, setOrderData] = useState([]);
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        FetchOrders();
    }, []);

    const FetchOrders = async () => {

        let data = await OrderServices.All();
        setOrderData(data);

        let menu = await MenuServices.All();
        setMenuData(menu);

    }

    const GetProduct = (id) => {
        return menuData.find((el) => el.id == id);
    }

    const ChangeStatus = async (id, status) => {

  let res = await OrderServices.StatusChange(id, status);

  if (res == 1) {
    toast.success("Status Updated");
    FetchOrders();
  }
  else {
    toast.error("Something Went Wrong");
  }

}


    return (
        <>
            {/* {
                load ?
                    <div style={{
                        height: "100vh",
                        display: "flex",

                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FadeLoader height={25} width={5} color="#ec0606" />
                    </div>

                    :
                    <> */}
                        <section className="contact-section">
                            <div className="container">
                                <div className="row g-4 justify-content-center">
                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h1 className="flex-grow-1 text-center m-0">
                                            All Orders
                                        </h1>

                                        <Link
                                            className="btn btn-danger"
                                            to="/admin"
                                        >
                                            Dashboard
                                        </Link>

                                    </div>
                                    <div className="col-lg-10" data-aos="fade-left">
                                        <div className="fcard">

                                            <table className="table">

                                                <thead>

                                                    <tr>
                                                       
                                                        <th>Token</th>
                                                        <th>Customer</th>
                                                        <th>Email</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th>Items</th>
                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {
                                                        orderData.map((item) => {

                                                            return (

                                                                <tr key={item.id}>

                                                                    <td>{item.token}</td>

                                                                    <td>{item.userName}</td>

                                                                    <td>{item.email}</td>

                                                                    <td>₹ {item.amount}</td>

                                                                    <td>
  <select
    className="form-select"
    value={item.status}
    onChange={(e) => {
      ChangeStatus(item.id, e.target.value);
    }}
  >
    <option value="Pending">Pending</option>
    <option value="Preparing">Preparing</option>
    <option value="Ready">Ready</option>
    <option value="Completed">Completed</option>
  </select>
</td>

                                                                    <td>
                                                                        {item.createdAt?.toDate().toLocaleDateString()}
                                                                    </td>

                                                                    <td>

                                                                        {
                                                                            item.items?.map((pro, index) => {

                                                                                let product = GetProduct(pro.proId)

                                                                                return (

                                                                                    <div key={index}>

                                                                                        <b>{product?.name}</b>

<span className="text-muted">
 (Qty : {pro.quantity})
</span>

<br />

₹ {product?.price * pro.quantity}

<hr />

                                                                                    </div>

                                                                                )

                                                                            })
                                                                        }

                                                                    </td>

                                                                </tr>

                                                            )

                                                        })
                                                    }

                                                </tbody>

                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
            // }
        // </>
    )
}


export default AllOrders
