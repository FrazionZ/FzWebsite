import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Badge, Pagination } from "flowbite-react";

import Language from "@/Components/Language";
import moment from 'moment-timezone'
import 'moment/locale/fr'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
moment.locale('fr')

export default function PromoCodeIndex(props) {

    const [dataPromoCode, setDataPromoCode] = useState(props.promoCodes);
    const [searchProcess, setSearchProcess] = useState(false)
    const lang = new Language(props.language);

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


    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <form className="lg:pr-3" onSubmit={submitSearch}>
                        <div className="flex items-center gap-4">
                            <div className="form-group">
                                <label htmlFor="users-search" className="sr-only">Rercher un code promos</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" disabled={searchProcess} onKeyPress={(e) => { if (e.keyCode == 13) submitSearch(e) }} onChange={(e) => { setData('search', e.target.value) }} value={data.search} name="names" id="users-search" className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rercher un code promos" />
                                </div>
                            </div>
                            <button onClick={submitSearch} className="btn" disabled={searchProcess}><FaSearch /></button>
                        </div>
                    </form>
                    {props.auth.permissions.includes('admin.promocode.create') &&
                        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                            <Link href={route('admin.promocode.add')} ><button className="btn">Créer</button></Link>
                        </div>
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" >
                                Code
                            </th>
                            <th scope="col" >
                                Maximum d'utilisations (Global)
                            </th>
                            <th scope="col" >
                                Maximum d'utilisations (Par personne)
                            </th>
                            <th scope="col" >
                                Type
                            </th>
                            <th scope="col" >
                                Montant donné
                            </th>
                            <th scope="col" >
                                Créé le
                            </th>
                            <th scope="col" >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPromoCode.data.map((pc, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>{pc.code}</td>
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>{pc.max_use} fois</td>
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>{pc.max_use_per_user} fois</td>
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>{pc.type == "pbs" ? "Points boutique" : "Coins"}</td>
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>{pc.give_amount}</td>
                                    <td className={`p-4 text-base font-medium whitespace-nowrap ${pc.expired ? "text-[var(--text-inactive)] line-through" : "text-white"}`}>
                                        {lang.replaceMonth(moment(pc.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                    </td>
                                    <td className="p-4 text-base font-medium whitespace-nowrap text-white">
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
                <div className="sticky bottom-0 right-0 items-center w-full card" style={{ borderRadius: "0px" }}>
                    <div className="pagination">
                        <Pagination
                            currentPage={props.promoCodes.current_page}
                            layout="pagination"
                            showIcons={true}
                            totalPages={props.promoCodes.last_page}
                            className="flex justify-end gap-10 items-center w-full"
                            previousLabel="Précédent"
                            nextLabel="Suivant"
                            onPageChange={(e) => { router.get(`${route('admin.users.index')}?page=${e}`) }}
                            renderPaginationButton={(props) => {
                                return (
                                    <button className="btn" disabled={(props.active !== undefined ? (props?.active ? true : false) : false)} onClick={props.onClick}>{props.children}</button>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
