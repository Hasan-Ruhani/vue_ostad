import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInputControl from '../../hooks/useInputControl';
import moment from 'moment';
import Modal from '../modal/Modal';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Loader from '../loader/Loader';
import { deleteCategory, getAllCategory, updateCategory, updateCategoryStatus } from '../../app/features/project/projectApiSlice';
import Swal from 'sweetalert2';


const CategoryDatatable = () => {

    const [modal, setModal] = useState(false);
	const { input, setInput, handleInputChange, resetForm } = useInputControl({
		name: ""
	});
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const { isLoading, category } = useSelector((state) => state.project);
	const dispatch = useDispatch();


    const handleCategoryStatusUpdate = (status, id) => {
        dispatch(updateCategoryStatus({id: id, status}));
    }


    const handleCategoryUpdate = (e, id) => {
        e.preventDefault();

        if(!input.name){
			createToast("Please, fill out the form!", "warn");
		}else{
			dispatch(updateCategory({id, input}))
            setModal(false);
            resetForm();
		}
    }

    const handleCategoryDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if(result.isConfirmed){
                dispatch(deleteCategory(id));
                dispatch(getAllCategory());
            }
        })
    }

    return (
        <>
            {!isLoading ? <div>
            

                {category && Array.isArray(category) ? (<table className="datatable table table-hover table-center mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...category]?.reverse().map((data, index) => 
                                <tr key={index}>
                                    <td>
                                        <h2 className="table-avatar">{data?.name}</h2>
                                    </td>
                                    <td>{moment(data?.createdAt).format('LLL')}</td>
                                    
                                    <td>
                                        <div className="status-toggle">
                                            <input type="checkbox" id={`status_${index}`} className="check" checked={data?.status === "active" ? true : false}/>
                                            <label onClick={() => handleCategoryStatusUpdate(data?.status, data?.id)} htmlFor={`status_${index}`} className="checktoggle">checkbox</label>
                                        </div>
                                    </td>

                                    <td>
                                        <button 
                                            onClick={() => {
                                                setInput({name: data?.name});
                                                setCurrentCategoryId(data?.id);
                                                setModal(true);
                                            }} className="btn btn-sm bg-info-light mr-2"
                                        >
                                                <FaRegEdit style={{fontSize: "15px", margin:"auto"}} />
                                        </button>

                                        {modal && currentCategoryId === data?.id && <Modal title={"Category update"}  modalClose={setModal}>
                                            <form onSubmit={(e) => handleCategoryUpdate(e, currentCategoryId)}>
                                                <div className="row form-row">

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>Category Name</label>
                                                            <input name="name" onChange={handleInputChange} value={input.name} type="text" className="form-control"/>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            </form>
                                        </Modal>}

                                        <button onClick={() => handleCategoryDelete(data?.id)} className="btn btn-sm bg-danger-light"><FaRegTrashAlt style={{fontSize: "15px", margin:"auto"}} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>) : (
                    <h3 className="mt-6 mb-6 text-center py-5">Sorry, project data not found!</h3>
                )}


            </div> : <Loader col="4"/>}
        </>
    )
}

export default CategoryDatatable;
