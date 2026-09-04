

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryServices from "../../services/CategoryServices";
import MenuServices from "../../services/MenuServices";
import OrderServices from "../../services/OrderServices";

function Dashboard() {

  const [categoryCount, setCategoryCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      let categories = await CategoryServices.All();
      let menu = await MenuServices.All();
      let orders = await OrderServices.All();

      setCategoryCount(categories.length);
      setMenuCount(menu.length);
      setOrderCount(orders.length);

      let pending = orders.filter((el) => el.status === "Pending");
      setPendingCount(pending.length);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  };

  return (
    <section className="container py-4">

      <h2 className="text-center fw-bold mb-5">
       Admin Dashboard
      </h2>

      <div className="row g-4">

        <div className="col-md-3">
          <Link to="/admin/manageCategory" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card shadow text-center p-4 "
            style={{ borderColor: "#dc3545" , borderRadius:"20px" , margin: "0 auto 20px",  }}>
              <h1>📂</h1>
              <h3>{categoryCount}</h3>
              <p>Total Categories</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/ManageMenu" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card shadow text-center p-4"
            style={{ borderColor: "#198754", borderRadius:"20px" , margin: "0 auto 20px",}}>
              <h1>🍔</h1>
              <h3>{menuCount}</h3>
              <p>Total Menu</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/AllOrders" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card shadow text-center p-4"
            style={{ borderColor: "#fd7e14" , borderRadius:"20px" , margin: "0 auto 20px", }}>
              <h1>🛒</h1>
              <h3>{orderCount}</h3>
              <p>Total Orders</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/AllOrders" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card shadow text-center p-4"
            style={{ borderColor: "#0d6efd" , borderRadius:"20px" , margin: "0 auto 20px", }}>
              <h1>⏳</h1>
              <h3>{pendingCount}</h3>
              <p>Pending Orders</p>
            </div>
          </Link>
        </div>

      </div>

    </section>
  );
}

export default Dashboard;
