import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware ='auth', redirectIfAuthenticated  = '/'} = {}) => {
    const router = useRouter()

    const { data: auth, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(err => {
                console.log(err)
                // router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const updateUser = async (props) =>{
        return axios.post('/user/update',props).then((res) =>res.data )
            .catch(err => {
                // console.log(err);
            });
    }
    const getTreeData = async (props) => {
        // console.log(props)
        return axios.get(`/api/treedata/${props}`).then((res) =>res.data )
            .catch(err => {
                // console.log(err);
            });
    }
    const getParent = async ({setError,setStatus,...props}) =>{
        await csrf()
        setErrors([])
        return axios.get('/api/user/parent').then((res) =>res.data )
            .catch(err => {
                // console.log(err);
            });
    }
    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && auth)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            auth?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [auth, error])

    return {
        auth,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        updateUser,
        getTreeData,
        logout,
    }
}
