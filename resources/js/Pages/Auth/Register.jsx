import { useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ReCAPTCHA from "react-google-recaptcha";
import FzSwitch from '@/Components/FzSwitch';
import Lang from '@/Components/Language'
import Alert from '@/Components/Alert';

export default function Register(props) {

    const rCaptchaKey = props.recaptcha_site_key
    const lang = new Lang(props.language)

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        g_recaptcha_response: '',
        confirm_cguv: false,
        _token: props.csrf_token
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: (test) => {
            },
            onError: (err) => {
            }
        });
    };

    const title = "Inscription"

    const errorsEntries = Object.entries(errors);

    return (
        <Layout props={props} title={title}>
            <Head title={title} />

            {errorsEntries.length > 0 &&
                <Alert state="error" className="mb-4">
                    <h1 className="text-xl">Le formulaire semble incomplet et comporte des erreurs: </h1>
                    <ul className="mt-2 xl:pl-7">
                        {errorsEntries.map((err, key) => {
                            return (
                                <li className="mb-2">- {lang.get('auth.register.' + err[1], [{ key: ':attribute', value: err[0] }])}</li>
                            )
                        })}
                    </ul>

                </Alert>
            }

            <Alert state="infos" className="mb-4">
                Une fois inscrit, vous devrez lier votre compte Microsoft avec FrazionZ pour définir votre pseudo.
            </Alert>

            <form className='flex gap-6 flex-col justify-center' onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Adresse Mail" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        placeholder="bob@frazionz.net"
                        disabled={processing}
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

                    <div>
                        <InputLabel forInput="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="********************"
                            disabled={processing}
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div>
                        <InputLabel forInput="password_confirmation" value="Confirmer le Mot de passe" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            disabled={processing}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="********************"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>

                    <div>
                        <FzSwitch large={true} checked={data.confirm_cguv} onChange={(e) => { setData('confirm_cguv', e) }}>
                            Accepter les <Link href="#">Conditions d'utilisations</Link>
                        </FzSwitch>
                    </div>

                    <div>
                        <ReCAPTCHA
                            sitekey={rCaptchaKey}
                            onChange={(e) => {
                                setData('captcha', e)
                            }}
                        />
                    </div>
                </div>


                <div className="flex items-center justify-center mt-4">
                    <button className="btn" disabled={processing}>
                        S'inscrire
                    </button>
                </div>
            </form>
        </Layout>
    );
}
