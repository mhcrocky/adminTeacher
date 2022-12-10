import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/user';
const ProfilePage = () => {
    const {getUserData,setUserData} = useUser();
    let router  = useRouter()
    const id = router.query.id;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [changed,setChange] = useState(false);
    useEffect(()=>{
        getUserData(id).then(res=>{
            setName(res.name);
            setEmail(res.email);
            setType(res.type);
        });
    },[id]);
    const submitForm = () => {
        setUserData({id,name,email,}).then(res=>{
            setChange(false);
            alert('okay');
        }).catch(err=>{
            setChange(false);
            alert('error');
        });
    }
    const handleInput = (type,value) => {
        if(type ==='name'){
            setName(value);
        }
        if(type ==='email'){
            setEmail(value)
        }
        setChange(true);
    }
    return (
        <div className="grid">

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Edit User</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">name</label>
                            <InputText id="name" type="text" value={name} onChange={(e)=>handleInput('name',e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" type="email" value={email} onChange={(e)=>handleInput( 'email',e.target.value)} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">type</label>
                            <InputText id="city" value={type} type="text" disabled />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">Save Change</label>
                            <Button onClick={()=>submitForm()} disabled={!changed}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
