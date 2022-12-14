import React, { useEffect, useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';

import { useAuth } from '@/hooks/auth';
import { useUser } from '@/hooks/user';

const Profile = () => {
    const {auth,updateUser} = useAuth({middleware:'auth'});
    const {user,setUser,addChild} = useUser();
    const toast = useRef(null);

    const [userData,setUserData] = useState({});
    const [active, setActive] = useState(false);


    const submitForm = () => {
        updateUser(userData).then(res=>{
            toast.current.show({severity: 'success', summary: 'Success Message', detail: 'change saved'});
        }).catch(err=>{
            toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'error occuped'});
        });
    }


    useEffect(()=>{
        if(auth){
            setUser(auth.id);
        }
        if(user){
            setUserData(user.data);
            setActive((user.status ==='active')?false:true);
        }

    },[user,auth]);
    //templates
    const ChildOption = (option) => {
        return (
            <div style={{display:'flex'}}>
                <Avatar image={option.img_url} />
                <div style={{padding:'3px'}}>{option.name}</div>
            </div>
        );
    }

    return (
        <>{auth?(
        // <div className="grid">
        <div className="col-12 lg:col-6">
                <Toast ref={toast} />
                <div className="card">
                    <h5>Profile</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <InputNumber  value={userData?userData.number:''} onChange={(e)=>handleInput('number',e.value)}/>
                        </div>
                        <div className="field col-12 lg:col-6">
                            <Button onClick={()=>submitForm()}>Send Request</Button>
                        </div>
                    </div>
                    <h5>Action</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <ToggleButton  checked={active} onLabel="Active Account" offLabel="Deactive Account" onChange={(e) => changeStatus(active)} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" />
                        </div>
                        
                    </div>
                </div>
            </div>
        // </div>
        ):(<>Loading.....</>)}</>
    );
};

export default Profile;
