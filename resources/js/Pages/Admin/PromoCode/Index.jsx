import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Badge, Pagination } from "flowbite-react";
import moment from 'moment-timezone'
import 'moment/locale/fr'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
moment.locale('fr')

export default function PromoCodeIndex(props) {

    const [dataPromoCode, setDataPromoCode] = useState(props.promoCodes);
    const [searchProcess, setSearchProcess] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        search: "",
        currentPage: props.promoCodes.current_page,
        _token: props.csrf_token
    })

    let title = "Code Promos";

    async function submitSearch(e) {
        e.preventDefault()

        setSearchProcess(true)

        axios.post(route('admin.promocode.search'), {
            search: data.search,
            currentPage: data.currentPage,
            _token: props.csrf_token
        })
            .then(function (response) {
                setDataPromoCode(response.data)
                setSearchProcess(false)
            })
            .catch(function () {
                setSearchProcess(false)
            })
    }

    console.log(props.auth.permissions)


    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{title}</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                            <form className="lg:pr-3" onSubmit={submitSearch}>
                                <div className="flex items-center gap-4">
                                    <div className="form-group">
                                        <label htmlFor="users-search" className="sr-only">Rercher un code promos</label>
                                        <div className="relative mt-1 lg:w-64 xl:w-96">
                                            <input type="text" disabled={searchProcess} onKeyPress={(e) => { if (e.keyCode == 13) submitSearch(e) }} onChange={(e) => { setData('search', e.target.value) }} value={data.search} name="names" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rercher un code promos" />
                                        </div>
                                    </div>
                                    <Button onClick={submitSearch} className="h-[3rem]" disabled={searchProcess}><FaSearch /></Button>
                                </div>
                            </form>
                        </div>
                        {props.auth.permissions.includes('admin.promocode.create') &&
                            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                <Link href={route('admin.promocode.add')} ><Button>Créer</Button></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Code
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Maximum d'utilisations (Global)
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Maximum d'utilisations (Par personne)
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Type
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Montant donné
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {dataPromoCode.data.map((pc, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{pc.code}</td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{pc.max_use} fois</td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{pc.max_use_per_user} fois</td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{pc.type == "pbs" ? "Points boutique" : "Coins"}</td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{pc.give_amount}</td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {props.auth.permissions.includes('admin.promocode.edit') &&
                                                        <Link href={route('admin.promocode.edit', { id: pc.id })} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                            <Button>Editer le code promo</Button>
                                                        </Link>
                                                    }
                                                    {props.auth.permissions.includes('admin.promocode.delete') &&
                                                        <Link href={route('admin.promocode.delete')} method="post" preserveState={false} only={['promoCodes']} data={{ id: pc.id }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                            <Button color="failure">Supprimer</Button>
                                                        </Link>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                <Pagination
                    currentPage={props.promoCodes.current_page}
                    layout="pagination"
                    showIcons={true}
                    totalPages={props.promoCodes.last_page}
                    className="flex justify-end gap-10 items-center w-full"
                    previousLabel="Précédent"
                    nextLabel="Suivant"
                    onPageChange={(e) => { router.get(`${route('admin.users.index')}?page=${e}`) }}
                />
            </div>
        </AdminLayout>
    );
}
