import React, { useEffect, useState } from 'react';
import useInputControl from '../../hooks/useInputControl';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/Modal';
import { FaEye, FaRegEdit, FaRegTrashAlt, FaUserPlus } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import moment from 'moment';
import Loader from '../loader/Loader';
import Swal from "sweetalert2";
import { createTeamProfile, deleteTeam, getAllTeam, getTeamDetails, updateTeam, updateTeamStatus } from '../../app/features/team/teamApiSlice';
import createToast from '../../utilities/createToast';
import DetailsModal from '../modal/DetailsModal';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";




const TeamDatatable = () => {

    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [memberDetails, setMemberDetails] = useState(false);
    const [skills, setSkills] = useState("");
    const [updateSkills, setUpdateSkills] = useState("");
	const { input, setInput, handleInputChange, resetForm } = useInputControl({
		designation: "",
        description: "",
        facebook: "",
        leetcode: "",
        linkedin: "",
        github: "",
        skills: [],
        image: null,
        guideline: "",
	});
	const { input: updateInput, setInput: setUpdateInput, handleInputChange: handlleUpdateInputChange, resetForm: resetUpdateForm } = useInputControl({
		name: "",
		username: "",
		email: "",
		designation: "",
        description: "",
        facebook: "",
        leetcode: "",
        linkedin: "",
        github: "",
        skills: [],
        image: null,
        guideline: "",
	});
    // const [teamData, setTeamData] = useState([]);
    const [currentTeamId, setCurrentTeamId] = useState(null);
    const [currentTeamId2, setCurrentTeamId2] = useState(null);
    const [currentTeamId3, setCurrentTeamId3] = useState(null);
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const { isLoading, team, teamdetails } = useSelector((state) => state.team);
	const dispatch = useDispatch();

    const handleTeamStatusUpdate = (status, id) => {
        dispatch(updateTeamStatus({id: id, status}));
    }

    const handleInputSkill = (event) => {
        setSkills(event.target.value)
    }

    const handleCloseSkill = (index) => {
        setInput((prevInput) => ({
            ...prevInput,
            skills: prevInput.skills.filter((_, i) => i !== index)
        }));
    }

    const handleTeamSkillCreate = (e) => {
        if(skills){
            e.preventDefault();
            setInput((prevInput) => ({
                ...prevInput,
                skills: [...prevInput.skills, skills]
            }));
            setSkills("");
        }
    }


    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setInput((prevInput) => ({
            ...prevInput,
            image: file
        }));
    };

    const handleTeamProfileCreate = (e, id) => {
        e.preventDefault();

        if(!input.designation || !input.description || !input.facebook || !input.linkedin || !input.github || !input.leetcode || !input.image){
			createToast("Please, fill out the form!", "warn");
		}else{

            const formData = new FormData();
            formData.append("designation", input.designation);
            formData.append("description", input.description);
            formData.append("facebook", input.facebook);
            formData.append("leetcode", input.leetcode);
            formData.append("linkedin", input.linkedin);
            formData.append("github", input.github);
            input.skills.forEach((skill, index) => {
                formData.append(`skills[${index}]`, skill);
            });
            formData.append("image", input.image);
            formData.append("guideline", input.guideline);
        
			dispatch(createTeamProfile({ id: id, input: formData })).then(() => {
                dispatch(getAllTeam());
                resetForm();
                setModalTwo(false);
            })

		}
    }

    const handleInputUpdateSkill = (event) => {
        setUpdateSkills(event.target.value)
    }


    const handleCloseUpdateSkill = (index) => {
        setUpdateInput((prevInput) => ({
            ...prevInput,
            skills: prevInput.skills.filter((_, i) => i !== index)
        }));
    }
    

    const handleTeamUpdateSkillCreate = (e) => {
        if(updateSkills){
            e.preventDefault();
            setUpdateInput((prevInput) => ({
                ...prevInput,
                skills: [...(prevInput.skills || []), updateSkills],
            }));
            setUpdateSkills("");
        }
    }
    

    const handleImagePreviewUpdate = (e) => {
        const file = e.target.files[0];
        setFile2(file);
        setUpdateInput((prevInput) => ({
            ...prevInput,
            image: file
        }));
    };

    const handleTeamUpdate = (e, id) => {
        e.preventDefault();

        if(!updateInput.name || !updateInput.email || !updateInput.username || !updateInput.description || !updateInput.designation || !updateInput.facebook || !updateInput.leetcode || !updateInput.linkedin || !updateInput.github || !updateInput.guideline){
			createToast("Please, fill out the form!", "warn");
		}else{
        
            const formData = new FormData();
            formData.append("name", updateInput.name);
            formData.append("email", updateInput.email);
            formData.append("username", updateInput.username);
            formData.append("designation", updateInput.designation);
            formData.append("description", updateInput.description);
            formData.append("facebook", updateInput.facebook);
            formData.append("leetcode", updateInput.leetcode);
            formData.append("linkedin", updateInput.linkedin);
            formData.append("github", updateInput.github);

            // formData.append("skills[]", updateInput.skills);
            if(updateInput?.skills?.length > 0){
                updateInput.skills.forEach((skill, index) => {
                    formData.append(`skills[${index}]`, skill);
                });
            }

            if(updateInput.image === file2){
                formData.append("image", updateInput.image);
            }
            formData.append("guideline", updateInput.guideline);

			dispatch(updateTeam({ id: id, input: formData })).then(() => {
                dispatch(getAllTeam());
                resetUpdateForm();
                setModal(false);
            })

		}
    }

    const handleTeamProfileView = (id) => {
        dispatch(getTeamDetails(id));
    }

    useEffect(() => {
        fetchTeams();
    }, [dispatch]);

    const fetchTeams = () => {
        dispatch(getAllTeam()).then((response) => {
            if (response.payload) {
                // setTeamData(response.payload);
            }
        });
    };

    const handleTeamDelete = (id) => {

        const teamFind = team.find((team) => team.id === id);

        if (teamFind?.profile === null) {
            createToast("Sorry! You already deleted profile.", "warn");
        }else{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteTeam(id)).then(() => {
                        fetchTeams();
                        dispatch(getAllTeam());
                    });
                }
            });
        }
    }



    return (
        <>
            {!isLoading ? <div>
            

                {team ? (<table className="datatable table table-hover table-center mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...team]?.reverse().map((data, index) => 
                                <tr key={index}>
                                    <td>
                                        <h2 className="table-avatar">{data?.name}</h2>
                                    </td>
                                    <td><button className="btn btn-sm bg-info-light">Change</button></td>
                                    <td>{data?.email}</td>
                                    <td>{data?.username}</td>

                                    <td>{moment(data?.createdAt).format('LLL')}</td>
                                    
                                    <td>
                                        <div className="status-toggle">
                                            <input type="checkbox" id={`status_${index}`} className="check" checked={data?.status === "active" ? true : false}/>
                                            <label onClick={() => handleTeamStatusUpdate(data?.status, data?.id)} htmlFor={`status_${index}`} className="checktoggle">checkbox</label>
                                        </div>
                                    </td>

                                    <td>
                                        <button disabled={data?.profile === null ? false : true} 
                                            onClick={(e) => {
                                                setCurrentTeamId2(data?.id);
                                                handleTeamProfileCreate(e, data?.id)
                                                setModalTwo(true);
                                            }} className="btn btn-sm bg-green-light mr-2"
                                        >
                                                <FaUserPlus style={{fontSize: "15px", margin:"auto"}} />
                                        </button>

                                        {modalTwo && currentTeamId2 === data?.id && <Modal title={"Member profile create"}  modalClose={setModalTwo}>
                                            <form onSubmit={(e) => handleTeamProfileCreate(e, currentTeamId2)}>
                                                <div className="row form-row">

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>Designation</label>
                                                            <input name="designation" onChange={handleInputChange} value={input.designation} type="text" className="form-control"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <textarea name="description" onChange={handleInputChange} value={input.description} type="text" className="form-control"></textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Skills</label>
                                                            <div className="skillAddBlock">
                                                                <div className="skillWidth">
                                                                {input.skills && Array.isArray(input.skills) && 
                                                                
                                                                    input.skills.map((item, index) => 
                                                                    
                                                                        <span key={index} className="skillItem">{item} <MdClose onClick={() => handleCloseSkill(index)} className="text-small ml-2"/></span>
                                                                    
                                                                    )

                                                                }
                                                                </div>

                                                                {/* <form onSubmit={handleTeamSkillCreate}> */}
                                                                    <div className="wrapSkillDiv">
                                                                        <input onChange={handleInputSkill} value={skills} placeholder="Add skills" type="text" className="forminputSkill"/>
                                                                        <button onClick={handleTeamSkillCreate} type="button" className="btn btn-primary btn-sm">Add</button>
                                                                    </div>
                                                                {/* </form> */}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Facebook</label>
                                                            <input name="facebook" onChange={handleInputChange} value={input.facebook} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Linkedin</label>
                                                            <input name="linkedin" onChange={handleInputChange} value={input.linkedin} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Github</label>
                                                            <input name="github" onChange={handleInputChange} value={input.github} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Leetcode</label>
                                                            <input name="leetcode" onChange={handleInputChange} value={input.leetcode} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Guideline</label>
                                                            <textarea name="guideline" onChange={handleInputChange} value={input.guideline} type="text" className="form-control"></textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Profile Image</label>
                                                            <input name="image" onChange={(e) => handleImagePreview(e)}  type="file" className="form-control" />
                                                        </div>

                                                        

                                                        {input.image && 
                                                            <div className="row row-cols-3 gap-3 mt-3">
                                                                <div className="col-3" key={index}>
                                                                    <div className="form-group">
                                                                        <img 
                                                                            style={{ height: "100px", objectFit: "cover" }} 
                                                                            src={URL.createObjectURL(input.image)} 
                                                                            alt={`Image ${index}`} 
                                                                            className="rounded w-100" 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">Create Profile</button>
                                            </form>
                                        </Modal>}

                                        <button 
                                            onClick={() => {
                                                setCurrentTeamId3(data?.id);
                                                handleTeamProfileView(data?.id)
                                                setMemberDetails(true);
                                            }} className="btn btn-sm bg-info-light mr-2"
                                        >
                                                <FaEye style={{fontSize: "15px", margin:"auto"}} />
                                        </button>

                                        {

                                            memberDetails && currentTeamId3 === data?.id && <DetailsModal title={"Member Details"}  modalClose={setMemberDetails}>
                                                <div className="">
                                                    <div className="row gap-3">
                                                        <div className="col-md-3">
                                                            <img
                                                                style={{ height: "300px", border: "8px solid #00aac6" }}
                                                                className="w-100 rounded-3 shadow-lg object-fit-cover"
                                                                src={
                                                                    teamdetails?.profile?.image
                                                                        ? teamdetails?.profile?.image
                                                                        : "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                                                                }
                                                                alt="Member Image"
                                                            />
                                                            <div class="ori-team-details-social mt-4">
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <Link target="_blank" to={teamdetails?.profile?.linkedin}><FaLinkedinIn /></Link>
                                                                    <Link target="_blank" to={teamdetails?.profile?.github}><FaGithub /></Link>
                                                                    <Link target="_blank" to={teamdetails?.profile?.leetcode}><SiLeetcode /></Link>
                                                                    <Link target="_blank" to={teamdetails?.profile?.facebook}><FaFacebookF /></Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-9">
                                                            <h2 className="mb-4">Member Details</h2>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <strong>Name:</strong> {teamdetails?.name || "N/A"}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <strong>Position:</strong> {teamdetails?.profile?.designation || "N/A"}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <strong>Email:</strong> {teamdetails?.email || "N/A"}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <strong>Phone:</strong> {teamdetails?.profile?.phone || "N/A"}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <strong>Address:</strong> {teamdetails?.profile?.address || "N/A"}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <strong>Bio:</strong> {teamdetails?.profile?.bio || "N/A"}
                                                                </li>
                                                                <li style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", }} className="list-group-item">
                                                                    <strong>Skills:</strong> 
                                                                    <p className="">
                                                                        {teamdetails?.profile?.skills.length !== 0 ? teamdetails?.profile?.skills.map((data, index) => 

                                                                            <span key={index} className="badge badge-success mr-2">{data?.name}</span>
                                                                        
                                                                        ) : "N/A"}
                                                                    </p>
                                                                </li>
                                                                <li style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", }} className="list-group-item">
                                                                    <strong>Description:</strong> <p className="">
                                                                        {teamdetails?.profile?.description || "N/A"}
                                                                    </p>
                                                                </li>
                                                                <li style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", }} className="list-group-item">
                                                                    <strong>Guideline:</strong> <p className="">
                                                                        {teamdetails?.profile?.guideline || "N/A"}
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DetailsModal>

                                        }

                                        <button  disabled={data?.profile === null ? true : false} 
                                            onClick={() => {
                                                setUpdateInput({
                                                    name: data?.name,
                                                    username: data?.username,
                                                    email: data?.email,
                                                    designation: data?.profile?.designation,
                                                    description: data?.profile?.description,
                                                    facebook: data?.profile?.facebook,
                                                    leetcode: data?.profile?.leetcode,
                                                    linkedin: data?.profile?.linkedin,
                                                    github: data?.profile?.github,
                                                    skills: (data?.profile?.skills) ? data?.profile?.skills?.name : [],
                                                    image: data?.profile?.image,
                                                    guideline: data?.profile?.guideline,
                                                });
                                                setCurrentTeamId(data?.id);
                                                setModal(true);
                                            }} className="btn btn-sm bg-warning-light mr-2"
                                        >
                                                <FaRegEdit style={{fontSize: "15px", margin:"auto"}} />
                                        </button>

                                        {modal && currentTeamId === data?.id && <Modal title={"Member profile update"}  modalClose={setModal}>
                                            <form onSubmit={(e) => handleTeamUpdate(e, currentTeamId)}>
                                                <div className="row form-row">

                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input name="name" onChange={handlleUpdateInputChange} value={updateInput.name} type="text" className="form-control"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input name="email" onChange={handlleUpdateInputChange} value={updateInput.email} type="email" className="form-control"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Username</label>
                                                            <input name="username" onChange={handlleUpdateInputChange} value={updateInput.username} type="text" className="form-control"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Designation</label>
                                                            <input name="designation" onChange={handlleUpdateInputChange} value={updateInput.designation} type="text" className="form-control"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Description</label>
                                                            <textarea name="description" onChange={handlleUpdateInputChange} value={updateInput.description} type="text" className="form-control"></textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Skills</label>
                                                            <div className="skillAddBlock">
                                                                <div className="skillWidth">
                                                                {updateInput.skills && Array.isArray(updateInput.skills) && 
                                                                
                                                                    [...updateInput.skills].map((item, index) => 
                                                                    
                                                                        <span key={index} className="skillItem">{item} <MdClose onClick={() => handleCloseUpdateSkill(index)} className="text-small ml-2"/></span>
                                                                    
                                                                    )

                                                                }
                                                                </div>

                                                                {/* <form onSubmit={handleTeamSkillCreate}> */}
                                                                    <div className="wrapSkillDiv">
                                                                        <input onChange={handleInputUpdateSkill} value={updateSkills} placeholder="Add skills" type="text" className="forminputSkill"/>
                                                                        <button onClick={handleTeamUpdateSkillCreate} type="button" className="btn btn-primary btn-sm">Add</button>
                                                                    </div>
                                                                {/* </form> */}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Facebook</label>
                                                            <input name="facebook" onChange={handlleUpdateInputChange} value={updateInput.facebook} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Linkedin</label>
                                                            <input name="linkedin" onChange={handlleUpdateInputChange} value={updateInput.linkedin} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Github</label>
                                                            <input name="github" onChange={handlleUpdateInputChange} value={updateInput.github} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Leetcode</label>
                                                            <input name="leetcode" onChange={handlleUpdateInputChange} value={updateInput.leetcode} type="text" className="form-control"/>
                                                        </div>
                                                        
                                                        <div className="form-group">
                                                            <label>Guideline</label>
                                                            <textarea name="guideline" onChange={handlleUpdateInputChange} value={updateInput.guideline} type="text" className="form-control"></textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Profile Image</label>
                                                            <input name="image" onChange={(e) => handleImagePreviewUpdate(e)}  type="file" className="form-control" />
                                                        </div>

                                                        

                                                        {updateInput.image && 
                                                            <div className="row row-cols-3 gap-3 mt-3">
                                                                <div className="col-3" key={index}>
                                                                    <div className="form-group">
                                                                        <img 
                                                                            style={{ height: "100px", objectFit: "cover" }} 
                                                                            src={(updateInput.image === file2) ? URL.createObjectURL(updateInput.image) : updateInput.image} 
                                                                            alt={`Image ${index}`} 
                                                                            className="rounded w-100" 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            </form>
                                        </Modal>}

                                        <button onClick={() => handleTeamDelete(data?.id)} className="btn btn-sm bg-danger-light"><FaRegTrashAlt style={{fontSize: "15px", margin:"auto"}} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>) : (
                    <h3 className="mt-6 mb-6 text-center py-5">Sorry, team data not found!</h3>
                )}


            </div> : <Loader col={6}/>}
        </>
    )
}

export default TeamDatatable;
