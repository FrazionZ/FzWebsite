import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { FaRandom } from "react-icons/fa";

export default function PromoCodeAdd(props) {

    let title = "Code Promos - Ajout";

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        expire_date: '',
        max_use: 1,
        max_use_per_user: 1,
        give_amount: 0,
        type: 'pbs',
        _token: props.csrf_token,
    });

    async function submit(e) {
        e.preventDefault();
        post(route("admin.promocode.add_submit"), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => { },
            onSuccess: (data) => { },
            onError: (data) => { },
        });
    }

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    function randomCode() {
        setData('code', generateString(14));
    }

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <form onSubmit={submit}>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Code"
                                />
                            </div>
                            <div className="flex gap-6 justify-between items-center">
                                <TextInput
                                    id="small"
                                    type="text"
                                    sizing="md"
                                    className="flex-1"
                                    placeholder="a5hk14g9s1qz8n"
                                    value={data.code}
                                    disabled={processing}
                                    onChange={(e) => { setData('code', e.target.value) }}
                                />
                                <button className="btn" onClick={randomCode}><FaRandom /></button>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Date d'expiration"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="date"
                                sizing="md"
                                value={data.expire_date}
                                disabled={processing}
                                onChange={(e) => { setData('expire_date', e.target.value) }}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Maximum d'utilisations (Global)"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="number"
                                sizing="md"
                                value={data.max_use}
                                disabled={processing}
                                onChange={(e) => { setData('max_use', e.target.value) }}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Maximum d'utilisations (Par utilisateur)"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="number"
                                sizing="md"
                                value={data.max_use_per_user}
                                disabled={processing}
                                onChange={(e) => { setData('max_use_per_user', e.target.value) }}
                            />
                        </div>
                        <div id="select">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="type"
                                    value="Séléctionner le type"
                                />
                            </div>
                            <Select required={true} value={data.type} disabled={processing} onChange={(e) => { setData('type', e.target.value) }}>
                                <option value="pbs">
                                    Points boutique
                                </option>
                                <option value="coins">
                                    Coins
                                </option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="small"
                                    value="Montant à donner"
                                />
                            </div>
                            <TextInput
                                id="small"
                                type="number"
                                sizing="md"
                                value={data.give_amount}
                                disabled={processing}
                                onChange={(e) => { setData('give_amount', e.target.value) }}
                            />
                        </div>
                        <div></div>
                    </div>
                    <div className="flex justify-end">
                        <button className="btn w-fit" disabled={processing} type="submit">Créer</button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
