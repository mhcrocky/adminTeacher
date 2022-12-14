import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'

export const useUser = ({userId=0}={}) => {
    const router = useRouter()
    const [id,setId] = useState(userId);
    const { data: user, error, mutate } = useSWR(`/api/user/${id}`, () =>
        axios.get(`/api/user/${id}`).then((res) =>{
            return res.data
        }).catch(err => {
        })
    )
    const approveRequest = async (requestId) => {
        axios.get(`/api/request/{id}/approve`).then((res)=>{
            console.log(res);
        }).catch(err=>{

        })
    }

    const addChild = async (child_id) => {
        axios.get(`/api/user/child/${id}/${child_id}`).then(()=>mutate())
        .catch(err=>{
            console.log(err);
        })
    }
    
    const updateUser = async (props) =>{
        return axios.post('/user/update',props).then(() =>mutate() )
            .catch(err => {
                // // console.log(err);
            });
    }
    const setUser = async (id) => {
        axios.get(`/api/user/${id}`).then((res) =>{
            setId(res.data.key)
        }).catch(err => {
        })
    }

    useEffect(() => {
        setId(userId);
    }, [userId])

    return {
        user,
        updateUser,
        setUser,
        addChild,
        approveRequest
    }
}
