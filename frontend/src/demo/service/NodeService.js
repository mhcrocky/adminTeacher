import getConfig from 'next/config';
import axios from '@/lib/axios'

export class NodeService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getTreeNodes() {
        axios.get('/treedata')
            .then(res => // console.log(res))

    }
    getTreeTableNodes() {
        return axios.get('http://192.168.107.30:81/api/treedata')
            .then((res) => {
                // console.log(res.data.children);
               return res.data.children;
            })
    }
}
