import Layout from '@/Layouts/Layout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Alert from '@/Components/Alert';

export default function ForgotPassword(props, { status }) {

    const title = "Mot de passe oublié ?"

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        _token: props.csrf_token
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Layout title={title} props={props}>
            <Head title={title} />

            <div className="2xl:mx-[260px] flex flex-col gap-6">

                <Alert state="infos">
                    Faites-nous savoir votre adresse e-mail et nous vous enverrons un mot de passe par e-mail
                </Alert>

                {status && <div className="font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <label htmlFor="email">Adresse Mail</label>
                    <TextInput
                        id="password"
                        type="email"
                        name="email"
                        placeholder="bob@frazionz.net"
                        disabled={processing}
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-end mt-4">
                        <button className="btn" disabled={processing}>
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>


        </Layout>
    );
}
