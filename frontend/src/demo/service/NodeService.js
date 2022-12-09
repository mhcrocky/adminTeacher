import getConfig from 'next/config';
import axios from '@/lib/axios'

export class NodeService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getTreeNodes() {
        axios.get('/treedata')
            .then(res => console.log(res))

    }
    getTreeTableNodes() {
        return axios.get('http://localhost/adminTeacher/public/api/treedata')
            .then((res) => {
                console.log(res.data.children);
               return res.data.children;
            })
    }
}
