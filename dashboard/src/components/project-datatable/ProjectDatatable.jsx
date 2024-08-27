import React, { useState } from 'react';
import useInputControl from '../../hooks/useInputControl';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deleteProject, getAllProject, updateProject, updateProjectStatus } from '../../app/features/project/projectApiSlice';
import moment from 'moment';
import Loader from '../loader/Loader';
import Swal from "sweetalert2";
import createToast from '../../utilities/createToast';




const ProjectDatatable = () => {

    const [modal, setModal] = useState(false);
	const { input, setInput, handleInputChange, resetForm } = useInputControl({
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
    const [oldImage, setOldImage] = useState(null);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const { isLoading, project, category } = useSelector((state) => state.project);
	const dispatch = useDispatch();

    const handleProjectStatusUpdate = (status, id) => {
        dispatch(updateProjectStatus({id: id, status}));
    }

    const handleFileInputChange = (e, fieldName) => {

        console.log('====================================');
        console.log('Test');
        console.log('====================================');

        const file = e.target.files[0];
        setInput((prevInput) => ({
            ...prevInput,
            [fieldName]: file,
        }));

    };

    const handleImagePreview = (e) => {
        const files = Array.from(e.target.files);
        setInput((prevInput) => ({
            ...prevInput,
            images: files
        }));
    };

    const handleProjectUpdate = (e, id) => {
        e.preventDefault();

        console.log('====================================');
        console.log(e);
        console.log('====================================');

        // console.log(id);
        // if(){
		// 	createToast("Please, fill out the form!", "warn");
		// }else{
            

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
        
			dispatch(updateProject({ id: id, input: formData })).then(() => {
                dispatch(getAllProject());
                resetForm();
                setModal(false);
            })
		// }
    }

    const handleProjectDelete = (id) => {

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
                dispatch(deleteProject(id));
                dispatch(getAllProject());
            }
        })
    }

    return (
        <>
            {!isLoading ? <div>
            

                {project ? (<table className="datatable table table-hover table-center mb-0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Client</th>
                            <th>Project Image</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...project]?.reverse().map((data, index) => 
                                <tr key={index}>
                                    <td>
                                        <h2 className="table-avatar">{data?.head_line}</h2>
                                    </td>
                                    <td>{data?.duration}</td>
                                    <td>{data?.client}</td>

                                    <td>
                                        {/* <img src={data?.images[0]?.filename} alt="" className="rounded shadow" style={{width:"60px",height:"60px",objectFit:"cover`"}} /> */}
                                        {data?.images && Array.isArray(data.images) && data.images.length > 0 ? (
                                            <img src={data.images[0].filename ? data.images[0].filename : "https://cdn-icons-png.flaticon.com/128/8344/8344913.png"} alt="" className="rounded shadow" style={{width:"60px",height:"60px",objectFit:"cover"}} />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td>{moment(data?.createdAt).format('LLL')}</td>
                                    
                                    <td>
                                        <div className="status-toggle">
                                            <input type="checkbox" id={`status_${index}`} className="check" checked={data?.status === "active" ? true : false}/>
                                            <label onClick={() => handleProjectStatusUpdate(data?.status, data?.id)} htmlFor={`status_${index}`} className="checktoggle">checkbox</label>
                                        </div>
                                    </td>

                                    <td>
                                        <button 
                                            onClick={() => {
                                                setInput({head_line: data.head_line,
                                                    description: data.description,
                                                    problem: data.problem,
                                                    result: data.result,
                                                    client: data.client,
                                                    duration: data.duration,
                                                    project_url: data.project_url,
                                                    solution: data.solution,
                                                    tags: data.tags,
                                                    category_id: data.category_id
                                                });
                                                setOldImage(data?.images);
                                                setCurrentCategoryId(data?.id);
                                                setModal(true);
                                            }} className="btn btn-sm bg-info-light mr-2"
                                        >
                                                <FaRegEdit style={{fontSize: "15px", margin:"auto"}} />
                                        </button>

                                        {modal && currentCategoryId === data?.id && <Modal title={"Project update"}  modalClose={setModal}>
                                            <form onSubmit={(e) => handleProjectUpdate(e, currentCategoryId)}>
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
                                                                {input.category_id && (
                                                                    <option value={input.category_id}>{category.find(cat => cat.id === input.category_id)?.name}</option>
                                                                )}
                                                                {category.filter(cat => cat.id !== input.category_id)
                                                                    .map((data2, index2) => (
                                                                        <option key={index2} value={data2.id}>
                                                                            {data2.name}
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
                                                            <input name="images" onChange={(e) => handleImagePreview(e)}  type="file" className="form-control" multiple />
                                                        </div>
                                                        

                                                        {oldImage && Array.isArray(oldImage) && 
                                                            <div className="row row-cols-3 gap-3">
                                                                {oldImage.map((image, index) => (
                                                                    <div className="col" key={index}>
                                                                        <div className="form-group">
                                                                            <img 
                                                                                style={{ height: "100px", objectFit: "cover" }} 
                                                                                src={image.filename} 
                                                                                alt={`Image ${index}`} 
                                                                                className="rounded w-100" 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        }


                                                        {input.images && Array.isArray(input.images) && 
                                                            <div className="row row-cols-3 gap-3 mt-3">
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
                                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            </form>
                                        </Modal>}

                                        <button onClick={() => handleProjectDelete(data?.id)} className="btn btn-sm bg-danger-light"><FaRegTrashAlt style={{fontSize: "15px", margin:"auto"}} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>) : (
                    <h3 className="mt-6 mb-6 text-center py-5">Sorry, project data not found!</h3>
                )}


            </div> : <Loader col={6}/>}
        </>
    )
}

export default ProjectDatatable;
