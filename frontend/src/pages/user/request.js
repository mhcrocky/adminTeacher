import React, { useEffect, useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';

import { useAuth } from '@/hooks/auth';
import { useUser } from '@/hooks/user';
import { useMembership } from '@/hooks/request';

const Profile = () => {
    const {auth,requestMembership} = useAuth({middleware:'auth'});
    const {user,setUser} = useUser();    
    const {membership,approveRequest} = useMembership();    
    const toast = useRef(null);

    const [type,setType] = useState('');
    const [amount,setAmount] = useState(0);
    const [availity,setAvaility] = useState(0);
    const [request,setRequest] = useState([]);
    const handleInput = (v) => {
        setAmount(v);
    }
    const submitForm = () => {
        if(amount){
            let data = {
                user_id: auth.id ,
                type:auth.type,
                amount:amount 
            }
            requestMembership(data).then((res)=>{
                toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Sent Membership request'});
                setAmount(0);
            }).catch(err=>{
                toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'Server Error'});
            });
        }else{
            toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'Select amount'});
        }
    }

    useEffect(()=>{
        if(auth){
            if(auth.type === 'teacher'|| auth.type === 'partner'){
                setType(auth.type);
            }
            if(auth.type === 'owner'&&membership){
                setRequest(membership);
            }
            setUser(auth.id);
        }
        if(user){
            setAvaility(user.data.availity);
        }
    },[auth,user]);

    const handleApprove = (row) => {
        approveRequest(row.id).then(()=>{
            toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Membership request approved!'});
        }).catch(()=>{
            toast.current.show({severity: 'danger', summary: 'Error Message', detail: 'Server Error'});
        });
    }
    const TableAction = (row) => {
        console.log(row)
        return (
            <Button onClick={()=>handleApprove(row)}>Approve</Button>
        )
    }
    const NameTeplate = (row) => {
        return(
            <span>
                <img src={row.user.img_url} style={{height:'2rem',position:'relative',top:'.6rem',marginRight:'2rem',borderRadius:'2rem'}} />
                {row.user.name}<Avatar image=''/>
            </span>
        )
    }
    return (
        <>{type?(
        // <div className="grid">
        <>
            <Toast ref={toast} />
            <div className="card">
                <h5>MemberShip</h5>
                <div className="p-fluid formgrid grid">
                <div className="field col-12 lg:col-4">
                        <label htmlFor="email">Availity</label>
                        <InputText id="name" type="number" value={availity} disabled />
                    </div>
                    <div className="field col-12 lg:col-4">
                        {type === 'teacher'?(
                            <label htmlFor="email">Seat</label>
                        ):(
                            <label htmlFor="email">Account</label>
                        )}
                        <InputText id="name" type="number" value={amount} onChange={(e)=>handleInput(e.target.value)} />
                    </div>
                    <div className="field col-12 lg:col-4">
                        <label htmlFor="email">Send Request</label><Button onClick={()=>submitForm()}>Send Request</Button>
                    </div>
                </div>
            </div>
            <div className="card">
                
            </div>
        </>
        // </div>
        ):(<>{auth&&request.length?(<>
        {auth.type === 'owner'?(
            <div className="card">
                <Toast ref={toast} />

                <h5>MemberShip Requests</h5>
                <DataTable value={request}>
                    <Column field="user.name" header="Name" body={NameTeplate}></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="amount" header="Amount"></Column>
                    <Column header="Action" body={TableAction}></Column>
                </DataTable>
            </div>
        ):(<></>)}
        </>
        ):(<></>)}
        </>)}</>
    );
};

export default Profile;
