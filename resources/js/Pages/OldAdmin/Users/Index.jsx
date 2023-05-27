import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Badge, Pagination } from "flowbite-react";
import moment from 'moment-timezone'
import 'moment/locale/fr'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
moment.locale('fr')

export default function UsersIndex(props) {

    const [dataUsers, setDataUsers] = useState(props.users);
    const [searchProcess, setSearchProcess] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        search: "",
        currentPage: props.users.current_page,
        _token: props.csrf_token
    })

    let title = "Utilisateurs";

    async function submitSearch(e){
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
        <AdminLayout>
            <Head title={title} />
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Utilisateurs</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                            <form className="lg:pr-3" onSubmit={submitSearch}>
                                <div className="flex items-center gap-4">
                                    <div className="form-group">
                                        <label htmlFor="users-search" className="sr-only">Rercher un utilisateur</label>
                                        <div className="relative mt-1 lg:w-64 xl:w-96">
                                            <input type="text" disabled={searchProcess} onKeyPress={(e) => { if(e.keyCode == 13) submitSearch(e) }} onChange={(e) => { setData('search', e.target.value) }} value={data.search} name="names" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rercher un utilisateur"/>
                                        </div>
                                    </div>
                                    <Button onClick={submitSearch} className="h-[3rem]" disabled={searchProcess}><FaSearch /></Button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                            <button type="button" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add user
                            </button>
                            <a href="#" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                                Export
                            </a>
                        </div>
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
                                            Nom
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Adresse Email
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Inscrit le
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
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
                                                        <Link href={route('admin.users.edit', {id: user.id})} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                            Voir l'utilisateur
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
                    currentPage={props.users.current_page}
                    layout="pagination"
                    showIcons={true}
                    totalPages={props.users.last_page}
                    className="flex justify-end gap-10 items-center w-full"
                    previousLabel="Précédent"
                    nextLabel="Suivant"
                    onPageChange={(e) => { router.get(`${route('admin.users.index')}?page=${e}`) }}
                    />
            </div>
        </AdminLayout>
    );
}
