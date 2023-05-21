import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { FaRandom } from "react-icons/fa";
import { Pagination, Card } from "flowbite-react";
import Language from "@/Components/Language";


import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function PromoCodeAdd(props) {

    let title = "Code Promos - Edition";
    const lang = new Language(props.language);

    const { data, setData, post, processing, errors } = useForm({
        id: props.promoCode.id,
        code: props.promoCode.code,
        expire_date: props.promoCode.expire_date,
        max_use: props.promoCode.max_use,
        max_use_per_user: props.promoCode.max_use_per_user,
        give_amount: props.promoCode.give_amount,
        type: props.promoCode.type,
        _token: props.csrf_token,
    });

    async function submit(e) {
        e.preventDefault();
        post(route("admin.promocode.save"), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => { },
            onSuccess: (data) => { },
            onError: (data) => { },
        });
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    function randomCode() {
        setData('code', generateString(14));
    }

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-10">
                <form onSubmit={submit}>
                    <h1 className="text-3xl text-white mb-5">{title}</h1>
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
                                    />
                                    <Button onClick={randomCode}><FaRandom /></Button>
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
                                    onChange={(e) => { setData('maxUse', e.target.value) }}
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
                                    onChange={(e) => { setData('maxUsePerUser', e.target.value) }}
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
                            <Button className="w-fit" disabled={processing} type="submit">Sauvegarder</Button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold dark:text-white">
                        Historique d'utilisations de ce code promo
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Utilisateur
                                </th>
                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Utilisé le
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {props.promoCodeUses.data.map((log, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {log.user.name}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {lang.replaceMonth(moment(log.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination
                            currentPage={props.promoCodeUses.current_page}
                            layout="pagination"
                            showIcons={true}
                            totalPages={props.promoCodeUses.last_page}
                            className="flex justify-end gap-10 items-center w-full"
                            previousLabel="Précédent"
                            nextLabel="Suivant"
                            onPageChange={(e) => { router.get(`${route('admin.promocode.edit', props.promoCode.id)}?pch=${e}`) }}
                        />
                </div>
            </div>

        </AdminLayout>
    );
}
