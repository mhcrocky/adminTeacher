import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useUser = ({ middleware = '', redirectIfAuthenticated = '' } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const getTreeData = async () => {
        return axios.get('/api/treedata').then((res) =>res.data )
            .catch(err => {
                console.log(err);
            });
    }
    const setUserData = async (user) => {
        return axios.post('/api/user',{
            name:user.name,
            email:user.email,
            id:user.id,
        }).then((res) =>res.data )
            .catch(err => {
                console.log(err);
            });
    }
    const getUserData = async (id) => {
        return axios.get(`/api/user/${id}`).then((res) =>res.data )
            .catch(err => {
                console.log(err);
            });
    }


    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        getUserData,
        setUserData,
        getTreeData
    }
}
