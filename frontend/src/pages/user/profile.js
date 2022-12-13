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

const HomePage = () => {
    const {auth,updateUser} = useAuth({middleware:'auth'});
    const {user,setUser,addChild} = useUser();
    const toast = useRef(null);

    const [userData,setUserData] = useState({});
    const [active, setActive] = useState(false);

    const handleInput = (type,value) => {
        if(type ==='name'){
            setUserData({...userData,name:value});
        }
        if(type ==='number'){
            setUserData({...userData,number:value});
        }
        if(type ==='calendar'){
            setUserData({...userData,calendar:value});
        }
        if(type ==='bio'){
            setUserData({...userData,bio:value});
        }
    }

    const changeStatus = (value) => {
        setActive(!value);
    }

    const submitForm = () => {
        updateUser(userData).then(res=>{
            toast.current.show({severity: 'success', summary: 'Success Message', detail: 'change saved'});
        }).catch(err=>{
            toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'error occuped'});
        });
    }

    const [child, setChild] = useState(null);
    const [childData,setChildData] = useState([]);

    const handleChildChange = (e) => {
        setChild(e.value);
    }

    const addChildToUser = () => {
        console.log(child);
        if(!child){
            toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'Please select a child!!!'});
        }else{
            addChild(child.code).then(()=>{
                toast.current.show({severity: 'success', summary: 'Success Message', detail: `${child.name} is added to your child!!!`});
            }).catch(err=>{
                toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'Server Error'});
            });
            setChild(null);
        }

    }

    useEffect(()=>{
        if(auth){
            setUser(auth.id);
        }
        if(user){
            setUserData(user.data);
            setChildData(user.childData);
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
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Profile</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="name">name</label><InputText id="name" type="text" value={userData?userData.name:''} onChange={(e)=>handleInput('name',e.target.value)} />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="email">Email</label><InputText id="email" type="email" value={userData?userData.email:''} disabled />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="name">Number</label><InputNumber  value={userData?userData.number:''} onChange={(e)=>handleInput('number',e.value)}/>
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="email">Calendar</label><Calendar value={'Thu Jan 01 1970 04:00:00 GMT+0400 (Gulf Standard Time)'} onChange={(e)=>handleInput( 'calendar',e.target.value)} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="city">Bio</label><InputTextarea value={userData?userData.bio?userData.bio:'':''} onChange={(e)=>handleInput( 'bio',e.target.value)} className='form-control' autoResize />
                        </div>
                    </div>
                    <h5>Action</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <ToggleButton  checked={active} onLabel="Active Account" offLabel="Deactive Account" onChange={(e) => changeStatus(active)} onIcon="pi pi-check" offIcon="pi pi-times" aria-label="Confirmation" />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <Button onClick={()=>submitForm()}>Save Changes</Button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h5>Child</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <Dropdown value={child} options={childData} onChange={handleChildChange} itemTemplate={ChildOption} optionLabel="name" placeholder="Select a Child" />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <Button onClick={addChildToUser}>Add Child</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ):(<>Loading.....</>)}</>
    );
};

export default HomePage;
