import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'

export const useUser = (userId = 0) => {
    const router = useRouter()
    const [id,setId] = useState(userId);
    const { data: user, error, mutate } = useSWR(`/api/treedata/${id}`, () =>
        axios.get(`/api/treedata/${id}`).then((res) =>{
            // console.log(res.data);
            return res.data
        }).catch(err => {
            // console.log(err);
        })
    )
    const setUser = async (id) => {
        axios.get(`/api/treedata/${id}`).then((res) =>{
            setId(res.data.key)
        }).catch(err => {
            // console.log(err);
        })
    }
    const updateUser = async(id) => {

    }

    useEffect(() => {

    }, [user, error])

    return {
        user,
        setUser,
    }
}
