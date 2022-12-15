import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useState ,useEffect } from 'react';
import AppConfig from '@/layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useAuth } from '@/hooks/auth'
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dtype, setDType] = useState('')
    const [type, setType] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {'p-input-filled': layoutConfig.inputStyle === 'filled'});

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })
    const setAType = (value) => {
        // // console.log(value)
        setType(value.code);
        setDType(value);
    }
    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            type,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }
    const constType = [{name:'partner',code:'partner'},{name:'school',code:'school'},{name:'teacher',code:'teacher'},{name:'user',code:'user'}];
    return (
        <div className={containerClassName}>
            <form onSubmit={submitForm}>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0"/> */}
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src={`${contextPath}/demo/images/login/avatar.png`} alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-900 text-xl font-medium mb-2">
                                Name
                            </label>
                            <InputText inputid="name" value={name} onChange={event =>setName(event.target.value) } type="text" placeholder="Name" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" value={email} onChange={event =>setEmail(event.target.value) } type="email" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />
                            <label htmlFor="type" className="block text-900 text-xl font-medium mb-2">
                                Type
                            </label>
                            <Dropdown value={dtype} options={constType} onChange={event =>setAType(event.value) } optionLabel="name" placeholder="Select a AccountType"  className="w-full md:w-30rem mb-5"/>

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2" >
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                            <label htmlFor="passwordConfirmation" className="block text-900 font-medium text-xl mb-2">
                            Confirm Password
                            </label>
                            <Password inputid="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" checked={shouldRemember} onChange={(e) => setShouldRemember(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">
                                        Remember me
                                    </label>
                                </div>
                                <Link href={'/auth/login'} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Already have a account?
                                </Link>
                            </div>
                            <Button label="Register" className="w-full p-3 text-xl"></Button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
