import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useMembership = () => {
    const router = useRouter()

    const { data: membership, error, mutate } = useSWR('/api/request', () =>
        axios
            .get('/api/request')
            .then(res => res.data)
    )
    const requestMembership = async (props) => {
        axios.post('/auth/membership',props).then(()=>mutate())
        .catch(err=>console.log(err));
    } 
    const getAllRequest = async () => {
        axios.get('/api/request').then(res=>res.data)
    }
    const approveRequest = async (id) => {
        axios.get(`/api/request/${id}/approve`).then(()=>mutate())
    }
    useEffect(() => {
       
    }, [membership, error])

    return {
        membership,
        requestMembership,
        getAllRequest,
        approveRequest,
    }
}
