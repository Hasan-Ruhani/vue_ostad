import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import createToast from '../../utilities/createToast';
import Modal from '../../components/modal/Modal';
import useInputControl from '../../hooks/useInputControl';
import { setTeamMessageEmpty } from '../../app/features/team/teamSlice';
import { createTeam } from '../../app/features/team/teamApiSlice';
import TeamDatatable from '../../components/team-datatable/TeamDatatable';



const Team = () => {

    const [modal, setModal] = useState(false);
    const { input, setInput, resetForm, handleInputChange } = useInputControl({
        name: "",
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const { isLoading, error, message } = useSelector((state) => state.team);


    const handleTeamCreate = (e, id) => {
        e.preventDefault();
        console.log(id);
        if (!input.name || !input.email || !input.password) {
            createToast("Please, fill out the form!", "warn");
        } else {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("email", input.email);
            formData.append("password", input.password);
            
            dispatch(createTeam(formData));
            setModal(false);
            setInput({
                name: "",
                email: "",
                password: ""
            });
            resetForm();
        }
    };


    useEffect(() => {
        if(error){
            createToast(error, "warn");
            dispatch(setTeamMessageEmpty());
        }
        if(message){
            createToast(message, "success");
            dispatch(setTeamMessageEmpty());
        }
    }, [error, message, dispatch]);

    return (
        <div>
        

            <div className="page-wrapper">
                <div className="content container-fluid">
				
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">List of Memebr</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
									<li className="breadcrumb-item"><a href="javascript:(0);">Admin</a></li>
									<li className="breadcrumb-item active">Member</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div className="row">
						<div className="col-sm-12">
								
							<button onClick={() => setModal(true)} className="btn btn-sm bg-primary-light mb-4">Add new member</button>

							<div className="card">
								<div className="card-body">
									<div className="table-responsive">

                                        <TeamDatatable/>

									</div>
								</div>
							</div>
						</div>			
					</div>
					
				</div>			
			</div>

			{modal && <Modal title={"Create new member"} modalClose={setModal}>
				<form onSubmit={handleTeamCreate}>
					<div className="row form-row">

						<div className="col-12">


							<div className="form-group">
								<label>Name</label>
								<input name="name" onChange={handleInputChange} value={input.name} type="text" className="form-control"/>
							</div>

							<div className="form-group">
								<label>Email</label>
								<input name="email" onChange={handleInputChange} value={input.email} type="text" className="form-control"/>
							</div>

							<div className="form-group">
								<label>password</label>
								<input name="password" onChange={handleInputChange} value={input.password} type="password" className="form-control"/>

							</div>
                            
							
						</div>
						
					</div>
					<button type="submit" className="btn btn-primary btn-block">{isLoading ? "Creating . . ." : "Create"}</button>
				</form>
			</Modal>}


        </div>
    )
}

export default Team;
