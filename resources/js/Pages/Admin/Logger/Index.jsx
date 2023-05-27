import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";
import { Pagination } from "flowbite-react";

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function LogsIndex(props) {

    let title = "Logs système";
    const lang = new Language(props.language);
    const logger = props.logger;

    return (
        <AdminLayout title={title}>
            <Head title={title} />

            <table>
                <thead>
                    <tr>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Action
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Utilisateur
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Cible
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Adresse IP
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Fait le
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logger.data.map((log, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {log.enum}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link href={route('admin.users.edit', { id: log.userOrigin.id })}>{log.userOrigin.name}</Link>
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {(log.target_id == null) ? "N/A" : <Link href={route('admin.users.edit', { id: log.target.id })}>{log.target.name}</Link>}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {log.ip}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {lang.replaceMonth(moment(log.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="sticky bottom-0 right-0 items-center w-full card" style={{ borderRadius: "0px" }}>
                <div className="pagination">
                    <Pagination
                        currentPage={props.logger.current_page}
                        layout="pagination"
                        showIcons={true}
                        totalPages={props.logger.last_page}
                        className="flex justify-end gap-10 items-center w-full"
                        previousLabel="Précédent"
                        nextLabel="Suivant"
                        onPageChange={(e) => { router.get(`${route('admin.logs.index')}?page=${e}`) }}
                        renderPaginationButton={(props) => {
                            return (
                                <button className="btn" disabled={(props.active !== undefined ? (props?.active ? true : false) : false)} onClick={props.onClick}>{props.children}</button>
                            )
                        }}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
