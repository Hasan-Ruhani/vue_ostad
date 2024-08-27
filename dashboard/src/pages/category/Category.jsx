import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInputControl from '../../hooks/useInputControl';
import createToast from '../../utilities/createToast';
import Modal from '../../components/modal/Modal';
import CategoryDatatable from '../../components/category-datatable/CategoryDatatable';
import { createCategory } from '../../app/features/project/projectApiSlice';
import { setProjectMessageEmpty } from '../../app/features/project/projectSlice';


const Category = () => {

    const [modal, setModal] = useState(false);
	const { input, setInput, resetForm, handleInputChange } = useInputControl({
		category: ""
	});
	const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.project);


    const handleCategoryCreate = (e) => {
        e.preventDefault();
        if(!input.category){
            createToast("Please, fill out the form!", "warn");
        }else{
            const formData = new FormData();
            formData.append("category", input.category);
            dispatch(createCategory(formData));
            setInput({
                category: ""
            });
            resetForm();
            setModal(false);
        }
    } 

    useEffect(() => {
        if(error){
            createToast(error, "warn");
            dispatch(setProjectMessageEmpty());
        }
        if(message){
            createToast(message, "success");
            dispatch(setProjectMessageEmpty());
        }
    }, [error, message, dispatch]);

    return (
        <div>
        

        <div className="page-wrapper">
                <div className="content container-fluid">
                        
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-7 col-auto">
                                <h3 className="page-title">Category</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Category</li>
                                </ul>
                            </div>
                            <div className="col-sm-5 col">
                                <a onClick={() => setModal(true)} href="#" data-toggle="modal" className="btn btn-primary float-right mt-2">Add new category</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        
                                        <CategoryDatatable/>

                                    </div>
                                </div>
                            </div>
                        </div>			
                    </div>

                </div>	
            </div>

            {modal && <Modal title={"Add new category"} modalClose={setModal}>
				<form onSubmit={handleCategoryCreate}>
					<div className="row form-row">

						<div className="col-12">
							<div className="form-group">
								<label>Category Name</label>
								<input name="category" onChange={handleInputChange} value={input.category} type="text" className="form-control"/>
							</div>
						</div>
						
					</div>
					<button type="submit" className="btn btn-primary btn-block">Create</button>
				</form>
			</Modal>}


        </div>
    )
}

export default Category;
