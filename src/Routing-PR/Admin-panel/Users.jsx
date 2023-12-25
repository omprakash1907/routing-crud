import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ user, setUser }) => {

    const [noRecords, setNoRecords] = useState(false);

    useEffect(() => {
        if (user.length === 0) {
            setNoRecords(true);
        } else {
            setNoRecords(false);
        }
    }, [user]);

    const handleDelete = (id) => {
        const temp = [...user]
        temp.splice(id, 1)
        setUser(temp)
    }

    return (
        <div className=' container px-3'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Users</h4>
                </div>
                <Link className='btn btn-primary px-4 py-6 fs-6' to={'/adduser'}>AddUsers<i class="fa-solid fa-user-plus ms-2"></i></Link>
            </div>
            <div className=" m-auto dark-card">
                <h4 className='text-white fs-6 mb-3'>LIST OF THE CURRENT USERS</h4>
                <table class="table table-bordered-theme mb-0 " border={'1'} style={{ borderColor: "black" }} >
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noRecords ? (
                            <>
                                <td className='text-center fw-bold  pe-0 py-3' colSpan={4}>No Records</td>
                                <td className='p-0'></td>
                                <td className='p-0'></td>
                                <td className='p-0'></td>
                            </>
                        ) : (user && user.map((item, index) => {
                            return (
                                <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link to={`/edituser/${index}`}><button className='btn btn-edit me-2 '><i class="fa-solid fa-file-pen text-white "></i></button></Link>
                                        <button className='btn btn-delete' onClick={() => handleDelete(index)}> <i class="fa-solid fa-trash-can text-white "></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
