import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Language from "@/Components/Language";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "flowbite-react";
import moment from 'moment-timezone'
import 'moment/locale/fr'
moment.locale('fr')

export default function ShopItems(props) {

    const title = "Shop - Articles"
    const items = props.items
    const lang = new Language(props.language);
    const [dataItems, setDataItems] = useState(props.items);
    const [searchProcess, setSearchProcess] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        search: "",
        currentPage: props.items.current_page,
        _token: props.csrf_token
    })

    async function submitSearch(e) {
        e.preventDefault()

        setSearchProcess(true)

        axios.post(route('admin.shop.items.search'), {
            search: data.search,
            currentPage: data.currentPage,
            _token: props.csrf_token
        })
            .then(function (response) {
                setDataItems(response.data)
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
                            <Link href={route('admin.shop.items.create')} ><button className="btn add tiny">Créer</button></Link>
                        </div>
                    }
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Nom
                            </th>
                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Catégorie
                            </th>
                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Dernière mise à jour
                            </th>
                            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataItems.data.map((item, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.custom_type_name !== null ? <>{item.custom_type_name} ({item.type.name})</> : <>{item.type.name}</>}
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {lang.replaceMonth(moment(item.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                    </td>
                                    <td className="p-4 text-base font-medium whitespace-nowrap text-white">
                                        {props.auth.permissions.includes('admin.shop.items.edit') &&
                                            <Link href={route('admin.promocode.edit', { id: item.id })} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <button className="btn tiny blue-gradient rounded-tiny">Editer</button>
                                            </Link>
                                        }
                                        {props.auth.permissions.includes('admin.shop.items.delete') &&
                                            <Link href={route('admin.promocode.delete')} method="post" preserveState={false} data={{ id: item.id }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <button className="btn tiny red-gradient rounded-tiny">Supprimer</button>
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
                            currentPage={props.items.current_page}
                            layout="pagination"
                            showIcons={true}
                            totalPages={props.items.last_page}
                            className="flex justify-end gap-10 items-center w-full"
                            previousLabel="Précédent"
                            nextLabel="Suivant"
                            onPageChange={(e) => { router.get(`${route('admin.shop.items')}?page=${e}`) }}
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
    )

}