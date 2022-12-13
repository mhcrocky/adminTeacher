import React, { useEffect, useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';

import { useUser } from '@/hooks/user';
import { useRouter } from 'next/router';

const HomePage = () => {
    let router  = useRouter()
    const {user,updateUser,addChild} = useUser({userId:router.query.id});
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
        if(user){
            setUserData(user.data);
            setChildData(user.childData);
            setActive((user.status ==='active')?false:true);
        }

    },[user]);
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
        <>{user?(
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Profile</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="name">name</label><InputText id="name" type="text" value={userData?userData.name:''} disabled onChange={(e)=>handleInput('name',e.target.value)} />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="email">Email</label><InputText id="email" type="email" value={userData?userData.email:''} disabled />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="name">Number</label><InputNumber  value={userData?userData.number:''} disabled onChange={(e)=>handleInput('number',e.value)}/>
                        </div>
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="email">Calendar</label><Calendar disabled  onChange={(e)=>handleInput( 'calendar',e.target.value)} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="city">Bio</label><InputTextarea disabled value={userData?userData.bio?userData.bio:'':''} onChange={(e)=>handleInput( 'bio',e.target.value)} className='form-control' autoResize />
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
