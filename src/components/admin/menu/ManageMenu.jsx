import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CategoryServices from '../../../services/CategoryServices'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import MenuServices from '../../../services/MenuServices'
import Switch from "react-switch";



const ManageMenu = () => {

  const [Data, setData] = useState([])

  const [catdata, setcatdata] = useState([])


  useEffect(() => {
    FetchData();
    allcategories();
  }, [])

  const allcategories = async () => {
    const res = await CategoryServices.All();

    setcatdata(res);
    console.log(res);

  }

  const FetchData = async () => {
    const data = await MenuServices.All()

    console.log(data);

    setData(data)
  }






  const DeleteMenu = async (id) => {
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
        let res = await MenuServices.delete(id)
        if (res == 1) {
          toast.success("Menu Item Deleted Successfully")
          FetchData()
        }
        else {
          toast.error("Error! Menu Item Not Deleted")
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  const changeStatus = async (id, status) => {
      console.log(id,status);
  
      let res=await MenuServices.statusChange(id, status)
  
      if(res==1){
        toast.success("Status Changed")
        FetchData()
      }
      else{
        toast.error("Error! Status Not Changed")
      }
    }
  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row g-4 justify-content-center">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h1 className="flex-grow-1 text-center m-0">
                Manage Menu
              </h1>

              <Link
                className="btn btn-danger"
                to="/admin/addMenu"
              >
                Add
              </Link>

            </div>

            <div className="col-lg-10" data-aos="fade-left">

              <div className="fcard">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sno</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                      <th scope="col">Image</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.length > 0 ? (
                      Data.map((el, i) => (


                        <tr key={el.id}>
                          <td>{i + 1}</td>
                          <td>{el.name}</td>
                          <td>{el.description}</td>
                          <td>₹{el.price}</td>
                          <td>
                            {

                           

                              catdata.map((element) => {

                                if (element.id == el.categoryId) {
                                  return (
                                    element.CategoryName
                                  )
                                }

                              })

                              
                            }

                          </td>
                          <td>
                            <img
                              src={el.image}
                              alt={el.name}
                              width="100"
                              height="100"
                              style={{ objectFit: "cover" }}
                            />
                          </td>

                          <td>
                            <Link
                              to={`/admin/updateMenu/${el.id}`}
                              className="btn btn-primary"
                            >
                              Update
                            </Link>
                          </td>

                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => DeleteMenu(el.id)}
                            >
                              Delete
                            </button>
                          </td>

                          <td><Switch
                              className="react-switch"
                              onChange={()=>{
                                changeStatus(el.id,!el.status)
                              }}
                              checked={el.status}
                              aria-label="super secret label that is not visible"
                            /></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Menu Items Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>


            </div>

            {/* table  */}

          </div>

        </div>
      </section>
    </>
  )
}

export default ManageMenu
