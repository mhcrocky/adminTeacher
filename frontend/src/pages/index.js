import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../demo/service/NodeService';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import {useUser} from '@/hooks/user';
const TreeTableDemo = () => {
    const {getTreeData} = useUser();
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();
    let router =  useRouter();
    useEffect(() => {
        getTreeData().then(data => setNodes(data.children));
    }, []);
    const gotoEdit = (id) => {
        router.push(`/user/${id.key}/edit`);
    }
    const ActionTemplate = (row) => {
        return(
            <div>
                <Button icon="pi pi-file-edit" onClick={()=>gotoEdit(row)} className="p-button-rounded p-button-text" style={{float:'right'}} />
            </div>
        )
    }
    const NameTeplate = (row) => {
        console.log(row)
        return(
               <span>
                <img src={`/demo/images/avatar/${row.key%10}.png`} style={{height:'2rem',position:'relative',top:'.6rem',marginRight:'2rem',borderRadius:'2rem'}} />
                {row.data.name}
               </span>
        )
    }
    return (
        <div>
            <div className="card">
                <h5>User Management</h5>
                <TreeTable value={nodes}>
                    <Column field="name" header="name"  expander body={NameTeplate} style={{minWidth:'30%'}}></Column>
                    <Column field="email" header="email"  ></Column>
                    <Column field="type" header="type" ></Column>
                    <Column field="id" body={ActionTemplate} ></Column>
                </TreeTable>
            </div>
        </div>
    );
}
export default TreeTableDemo;
