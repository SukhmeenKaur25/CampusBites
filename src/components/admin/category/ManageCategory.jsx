import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CategoryServices from '../../../services/CategoryServices'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import Switch from "react-switch";



const ManageCategory = () => {

  const [Data, setData] = useState([])

  useEffect(() => {
    FetchData()
  }, [])

  const FetchData = async () => {
    let data = await CategoryServices.All()

    setData(data)
  }

  const DeleteCategory = async (id) => {
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
        let res = await CategoryServices.delete(id)
        if (res == 1) {
          toast.success("Category Deleted Successfully")
          FetchData()
        }
        else {
          toast.error("Error! Category Not Deleted")
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

    let res=await CategoryServices.statusChange(id, status)

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
                Manage Category
              </h1>

              <Link
                className="btn btn-danger"
                to="/admin/addCategory"
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
                      <th scope="col">Category Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Image</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Data.map((el, i) => {
                        return <>
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{el.CategoryName}</td>
                            <td>{el.Description}</td>
                            <td><img width={100} src={el.Image} alt="" /></td>
                            <td><Link to={"/admin/updateCategory/" + el.id} className='btn btn-primary'>Update</Link></td>
                            <td><button onClick={() => {
                              DeleteCategory(el.id)
                            }}
                              className='btn btn-danger'>Delete</button></td>
                            <td><Switch
                              className="react-switch"
                              onChange={()=>{
                                changeStatus(el.id,!el.status)
                              }}
                              checked={el.status}
                              aria-label="super secret label that is not visible"
                            /></td>
                          </tr>
                        </>
                      })
                    }
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

export default ManageCategory
