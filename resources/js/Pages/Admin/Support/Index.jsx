import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, Link } from "@inertiajs/react";
import Language from "@/Components/Language";
import { Pagination } from "flowbite-react";

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
export default function SupportIndex(props) {

    const title = "Support"
    const lang = new Language(props.language);
    const tickets = props.tickets;

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <table>
                <thead>
                    <tr>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Catégorie
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Utilisateur
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Titre du problème
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Fait le
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.data.map((ticket, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket.category.name}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket.author.name}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket.title}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {lang.replaceMonth(moment(ticket.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                </td>
                                <td className="p-4 text-base font-medium whitespace-nowrap text-white">
                                    {props.auth.permissions.includes('admin.support.show') &&
                                        <Link href={route('admin.support.show', { id: ticket.id })} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <button className="btn tiny blue-gradient rounded-tiny">Voir</button>
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
                        currentPage={tickets.current_page}
                        layout="pagination"
                        showIcons={true}
                        totalPages={tickets.last_page}
                        className="flex justify-end gap-10 items-center w-full"
                        previousLabel="Précédent"
                        nextLabel="Suivant"
                        onPageChange={(e) => { router.get(`${route('admin.support.index')}?page=${e}`) }}
                        renderPaginationButton={(props) => {
                            return (
                                <button className="btn" disabled={(props.active !== undefined ? (props?.active ? true : false) : false)} onClick={props.onClick}>{props.children}</button>
                            )
                        }}
                    />
                </div>
            </div>
        </AdminLayout>
    )

}