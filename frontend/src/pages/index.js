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
    return (
        <div>
            <div className="card">
                <h5>Tree Table</h5>
                <TreeTable value={nodes}>
                    <Column expander></Column>
                    <Column field="name" header="name" ></Column>
                    <Column field="email" header="email"  ></Column>
                    <Column field="type" header="type" ></Column>
                    <Column field="id" body={ActionTemplate} ></Column>
                </TreeTable>
            </div>
        </div>
    );
}
export default TreeTableDemo;
