import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import Layout from '@/Layouts/Layout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Switch from '@/Components/FzSwitch'

export default function Login(props, { status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        _token: props.csrf_token
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    let title = "Se connecter"

    return (
        <Layout title={title} props={props}>
            <Head title={title} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form className="2xl:mx-[260px] flex flex-col gap-12" onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div>
                        <InputLabel forInput="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            placeholder="bob@frazionz.net"
                            disabled={processing}
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel forInput="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            disabled={processing}
                            placeholder="***************"
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div>
                        <Switch checked={data.remember} disabled={processing} label="Rester connecté" onChange={(e) => { setData('remember', e) }} />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <button className="btn" disabled={processing}>
                        Se connecter
                    </button>
                </div>
            </form>
        </Layout>
    );
}
