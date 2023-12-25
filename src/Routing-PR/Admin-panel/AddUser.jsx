import React from 'react'
import Form from '../Component/Form'

const AddUser = ({ user, setUser}) => {
    return (
        <div className=' container px-3'>
            <div className="breadcrumb-header d-flex my-3 justify-content-between dark-card">
                <div className="my-auto">
                    <h4 className='text-white'>Users / <span className='fs-6 fw-normal text-theme'>AddUsers</span></h4>
                </div>
            </div>
            <Form user={user} setUser={setUser} />
        </div>
    )
}

export default AddUser
