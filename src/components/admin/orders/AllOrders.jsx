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
    const [search, setSearch] = useState("");

    useEffect(() => {
        FetchOrders();
    }, []);

const FetchOrders = async () => {
  try {
    let data = await OrderServices.All();
    setOrderData(data);

    let menu = await MenuServices.All();
    setMenuData(menu);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    toast.error("Could not load orders");
  }
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

                            <div className="row mb-3">
                                <div className="col-md-4 ms-auto">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Token or Customer"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

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
                                            orderData.filter((item) => {
  return (
    (item.token?.toString() || "").includes(search) ||
    (item.userName?.toLowerCase() || "").includes(search.toLowerCase())
  );
})
                                                .map((item) => {

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
                                                                {item.createdAt?.toDate()?.toLocaleDateString() || "—"}
                                                            </td>

                                                            <td>

                                                                <button
                                                                    className="btn btn-danger btn-sm"
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

                                                                                                <div className="d-flex align-items-center gap-3">

                                                                                                    <img
                                                                                                        src={product?.image}
                                                                                                        alt={product?.name}
                                                                                                        width="70"
                                                                                                        height="70"
                                                                                                        className="rounded"
                                                                                                    />

                                                                                                    <div>

                                                                                                        <h6 className="mb-1">
                                                                                                            {product?.name}
                                                                                                        </h6>

                                                                                                        <p className="mb-1">
                                                                                                            <b>Quantity :</b> {pro.quantity}
                                                                                                        </p>

                                                                                                        <p className="mb-1">
                                                                                                            <b>Price :</b> ₹ {product?.price}
                                                                                                        </p>

                                                                                                        <p className="mb-0">
                                                                                                            <b>Total :</b> ₹ {product?.price * pro.quantity}
                                                                                                        </p>

                                                                                                    </div>

                                                                                                </div>

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
