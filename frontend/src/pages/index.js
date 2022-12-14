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
import Profile from './user/profile';
const HomePage = () => {
    const {auth} = useAuth({middleware:'auth'});
    const {user,setUser} = useUser();
    let router  = useRouter()

    const [treeNodes, setTreeNodes] = useState([]);
    useEffect(()=>{
        if(auth){
            setUser(auth.id);
        }
        if(user){
            setTreeNodes(user.children);
        }

    },[user,auth]);
    const gotoEdit = (id) => {
        router.push(`/user/${id.key}/edit`);
    }

    const NameTeplate = (row) => {
        return(
            <span  onClick={()=>gotoEdit(row)}>
                <img src={row.data.img_url} style={{height:'2rem',position:'relative',top:'.6rem',marginRight:'2rem',borderRadius:'2rem'}} />
                {row.data.name}<Avatar image=''/><Badge  value={row.data.type} style={{padding:'0px 10px',margin:'0px 10px'}} className={`${row.data.type}`}></Badge>
            </span>
        )
    }
    return (
        <>{auth?(
        <div className="grid">
            <div className="col-6">
                <div className="card">
                    <h5>User Management</h5>
                    <TreeTable value={treeNodes}>
                        <Column field="name"  expander body={NameTeplate}></Column>
                    </TreeTable>
                </div>
            </div>
            <Profile/>
        </div>
        ):(<>Loading.....</>)}</>
    );
};

export default HomePage;
