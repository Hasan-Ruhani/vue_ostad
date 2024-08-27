import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import createToast from '../../utilities/createToast';
import Modal from '../../components/modal/Modal';
import useInputControl from '../../hooks/useInputControl';
import ProjectDatatable from '../../components/project-datatable/ProjectDatatable';
import { createProject } from '../../app/features/project/projectApiSlice';
import { setProjectMessageEmpty } from '../../app/features/project/projectSlice';


const Project = () => {

    const [modal, setModal] = useState(false);
    const { input, setInput, resetForm, handleInputChange } = useInputControl({
        head_line: "",
        description: "",
        problem: "",
        result: "",
        client: "",
        duration: "",
        project_url: "",
        solution: null,
        tags: null,
        category_id: null,
        images: []
    });
    const dispatch = useDispatch();
    const { isLoading, error, message, category } = useSelector((state) => state.project);

    const handleImagePreview = (e) => {
        const files = Array.from(e.target.files);
        setInput((prevInput) => ({
            ...prevInput,
            images: files
        }));
    };

    const handleProjectCreate = (e, id) => {
        e.preventDefault();
        console.log(id);
        if (!input.head_line || !input.images.length || !input.description || !input.client || !input.duration || !input.project_url || !input.category_id) {
            createToast("Please, fill out the form!", "warn");
        } else {
            const formData = new FormData();
            formData.append("head_line", input.head_line);
            formData.append("description", input.description);
            formData.append("problem", input.problem);
            formData.append("result", input.result);
            formData.append("client", input.client);
            formData.append("duration", input.duration);
            formData.append("project_url", input.project_url);
            formData.append("solution", input.solution);
            formData.append("category_id", input.category_id);

            if (input.images && input.images.length > 0) {
                for (let i = 0; i < input.images.length; i++) {
                    formData.append('images[]', input.images[i]);
                }
            }
            
            dispatch(createProject({ formData, id: input.category_id }));
            setModal(false);
            setInput({
                head_line: "",
                description: "",
                problem: "",
                result: "",
                client: "",
                duration: "",
                project_url: "",
                solution: null,
                tags: null,
                category_id: null,
                images: []
            });
            resetForm();
        }
    };


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
							<div className="col-sm-12">
								<h3 className="page-title">List of Projects</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
									<li className="breadcrumb-item"><a href="javascript:(0);">Admin</a></li>
									<li className="breadcrumb-item active">Project</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div className="row">
						<div className="col-sm-12">
								
							<button onClick={() => setModal(true)} className="btn btn-sm bg-primary-light mb-4">Add new project</button>

							<div className="card">
								<div className="card-body">
									<div className="table-responsive">

                                        <ProjectDatatable/>

									</div>
								</div>
							</div>
						</div>			
					</div>
					
				</div>			
			</div>

			{modal && <Modal title={"Create new project"} modalClose={setModal}>
				<form onSubmit={handleProjectCreate}>
					<div className="row form-row">

						<div className="col-12">
							<div className="form-group">
								<label>Title</label>
								<input name="head_line" onChange={handleInputChange} value={input.head_line} type="text" className="form-control"/>
							</div>

							<div className="form-group">
								<label>Client Name</label>
								<input name="client" onChange={handleInputChange} value={input.client} type="text" className="form-control"/>
							</div>

							<div className="form-group">
								<label>Category Name</label>

                                <select className="form-control" name="category_id" onChange={handleInputChange}>
                                    <option value="">--SELECT CATEGORY--</option>
                                    {category?.map((data, index) => (
                                        <option key={index} value={data.id}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
							</div>

							<div className="form-group">
								<label>Description</label>
                                <textarea name="description" onChange={handleInputChange} value={input.description} type="text" className="form-control"></textarea>
							</div>
                            
							<div className="form-group">
								<label>Duration</label>
								<input name="duration" onChange={handleInputChange} value={input.duration} type="text" className="form-control"/>
							</div>
                            
							<div className="form-group">
								<label>Project URL</label>
								<input name="project_url" onChange={handleInputChange} value={input.project_url} type="text" className="form-control"/>
							</div>
                            
							<div className="form-group">
								<label>Problem</label>
								<textarea name="problem" onChange={handleInputChange} value={input.problem} type="text" className="form-control"></textarea>
							</div>
                            
							<div className="form-group">
								<label>Result</label>
								<textarea name="result" onChange={handleInputChange} value={input.result} type="text" className="form-control"></textarea>
							</div>

							{/* <div className="form-group">
								<label>Images</label>
								<input name="images" onChange={(e) => handleImagePreview(e)} accept="image/png, image/jpeg, image/jpg" type="file" className="form-control" multiple/>
							</div> */}

                            <div className="form-group">
                                <label>Images</label>
                                <input name="images" onChange={handleImagePreview} accept="image/png, image/jpeg, image/jpg" type="file" className="form-control" multiple />
                            </div>

							{input.images && Array.isArray(input.images) && 
                                <div className="row row-cols-3 gap-3">
                                    {input.images.map((image, index) => (
                                        <div className="col" key={index}>
                                            <div className="form-group">
                                                <img 
                                                    style={{ height: "100px", objectFit: "cover" }} 
                                                    src={URL.createObjectURL(image)} 
                                                    alt={`Image ${index}`} 
                                                    className="rounded w-100" 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }

						</div>
						
					</div>
					<button type="submit" className="btn btn-primary btn-block">{isLoading ? "Creating . . ." : "Create"}</button>
				</form>
			</Modal>}


        </div>
    )
}

export default Project
