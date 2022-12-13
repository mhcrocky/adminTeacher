import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';

import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useUser } from '@/hooks/user';

const HomePage = () => {
    let router  = useRouter()
    const {user,updateUser} = useUser({userId:router.query.id});

    const [userData,setUserData] = useState({});
    const [treeNodes, setTreeNodes] = useState([]);
    const [parent, setParent] = useState(null);
    const [parentData,setParentData] = useState([]);
    const [active, setActive] = useState(false);
    const [changed,setChange] = useState(false);
    useEffect(()=>{
        if(user){
            setTreeNodes(user.children);
            setUserData(user.data);
            setParent(user.data.parent);
            setParentData(user.parentData);
            setActive((user.status ==='active')?false:true);
        }

    },[user]);
    const submitForm = () => {
        updateUser(userData).then(res=>{
            alert('okay');
        }).catch(err=>{
            alert('error');
        });
    }
    const handleParentChange = (e) => {
        setParent(e.value);
        setUserData({...userData,parent_id:e.value.code});
        setChange(true);
    }
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
        if(type ==='parent'){
            setParent(value.value);
            setUserData({...userData,parent:value});
        }
        // console.log(userData)
        setChange(true);
    }
    const gotoEdit = (id) => {
        router.push(`/user/${id.key}/edit`);
    }
    const changeStatus = (value) => {
        setActive(!value);
        // alert('change status!!!!!');
    }


    const NameTeplate = (row) => {
        return(
            <span  onClick={()=>gotoEdit(row)}>
                <img src={row.data.img_url} style={{height:'2rem',position:'relative',top:'.6rem',marginRight:'2rem',borderRadius:'2rem'}} />
                {row.data.name}<Avatar image=''/><Badge  value={row.data.type} style={{padding:'0px 10px',margin:'0px 10px'}} className={`${row.data.type}`}></Badge>
            </span>
        )
    }
    const ParentOptionTemplate = (option) => {
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
             {treeNodes.length?<div className="col-12 lg:col-6">
                <h5>User Management</h5>
                <TreeTable value={treeNodes}>
                    <Column field="name"  expander body={NameTeplate}></Column>
                </TreeTable>
            </div>
            :<div className="col-12 lg:col-6">Loading......</div>}
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
                            <Button onClick={()=>submitForm()} disabled={!changed}>Save Changes</Button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h5>Parent</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 lg:col-6">
                            <Dropdown value={parent} options={parentData} onChange={handleParentChange} itemTemplate={ParentOptionTemplate} optionLabel="name" placeholder="Select a City" />
                        </div>
                        <div className="field col-12 lg:col-6">
                            <Button disabled={!changed}>Save Changes</Button>
                        </div>
                    </div>
                    <h5>Status</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-6 lg:col-6">
                            <label htmlFor="type">type</label><InputText id="type" value={userData?userData.type:''} type="text" disabled />
                        </div>
                        <div className="field col-6 lg:col-6">
                            <label htmlFor="city">Charge</label><InputNumber value={userData?userData.charge:''} disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ):(<>Loading.....</>)}</>
    );
};

export default HomePage;
