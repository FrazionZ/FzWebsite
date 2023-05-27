import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Badge, Pagination } from "flowbite-react";
import moment from 'moment-timezone'
import 'moment/locale/fr'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import Paginate from "@/Components/Paginate";
moment.locale('fr')

export default function UsersIndex(props) {

    const [dataUsers, setDataUsers] = useState(props.users);
    const [searchProcess, setSearchProcess] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        search: "",
        currentPage: props.users.current_page,
        _token: props.csrf_token
    })

    let title = "Liste des utilisateurs";

    console.log(dataUsers)

    async function submitSearch(e) {
        e.preventDefault()

        setSearchProcess(true)

        axios.post(route('admin.users.search'), {
            search: data.search,
            currentPage: data.currentPage,
            _token: props.csrf_token
        })
            .then(function (response) {
                setDataUsers(response.data)
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
                                <label htmlFor="users-search" className="sr-only">Rercher un utilisateur</label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <input type="text" disabled={searchProcess} onKeyPress={(e) => { if (e.keyCode == 13) submitSearch(e) }} onChange={(e) => { setData('search', e.target.value) }} value={data.search} name="names" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rercher un utilisateur" />
                                </div>
                            </div>
                            <button onClick={submitSearch} className="btn h-full" disabled={searchProcess}><FaSearch /></button>
                        </div>
                    </form>
                </div>
                <table>
                    <thead>
                        <th scope="col">
                            Nom
                        </th>
                        <th scope="col">
                            Adresse Email
                        </th>
                        <th scope="col">
                            Inscrit le
                        </th>
                        <th scope="col">
                            Actions
                        </th>
                    </thead>
                    <tbody>
                        {dataUsers.data.map((user, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                        <img className="w-10 h-10 rounded-[4px]" src={`https://api.frazionz.net/user/${user.uuid}/skin/head`} alt={`avatar_${user.id}`} />
                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            <div className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="flex gap-1">
                                                {user.role.map((role, index) => {

                                                    return (
                                                        <Badge key={index} style={{ background: role.barStyle.background, color: role.barStyle.color }} className="w-fit text-white">
                                                            {role.name}
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {moment(user.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY')}
                                    </td>
                                    <td className="p-4 space-x-2 whitespace-nowrap">
                                        {props.auth.permissions.includes('admin.user.edit') &&
                                            <Link href={route('admin.users.edit', { id: user.id })} className="btn tiny blue-gradient rounded-tiny">
                                                Voir l'utilisateur
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
                            currentPage={props.users.current_page}
                            layout="pagination"
                            showIcons={true}
                            totalPages={props.users.last_page}
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
