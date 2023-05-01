import { Head, useForm, Link } from "@inertiajs/react";
import { useEffect } from "react";
import OAuthLayout from "@/Layouts/OauthLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Switch from "@/Components/FzSwitch";

export default function OauthPromptLogin(props) {
    const title = "Authentification";

    console.log(props)

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        isOauth: true,
        redirect_url: props?.redirect_url,
        _token: props.csrf_token,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <OAuthLayout>
            <Head title={title} />
            <form
                className="2xl:w-2/5 flex flex-col gap-12"
                onSubmit={submit}
            >
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

                    <div className="flex flex-wrap justify-between items-center">
                        <Switch
                            checked={data.remember}
                            disabled={processing}
                            label="Rester connecté"
                            onChange={(e) => {
                                setData("remember", e);
                            }}
                        />
                        <Link href={route("password.request")}>
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button className="btn" disabled={processing}>
                        Se connecter
                    </button>
                </div>
            </form>
        </OAuthLayout>
    );
}
