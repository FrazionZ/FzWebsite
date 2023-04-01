import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";
import { Pagination } from "flowbite-react";
import { Button } from "flowbite-react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function GithubReposIndex(props) {

    let title = "Github";
    const lang = new Language(props.language);
    const logger = props.logger;

    return (
        <AdminLayout>
            <Head title={title} />
            
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{title}</h1>
                    <Link href={route('admin.github.repos.create', props.repos.name)}><Button className="mt-4" size="sm">Créer une release</Button></Link>
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
                                            Id
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Nom
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Auteur
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Créer le
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {props.releases.data.data.map((release, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {release.id}
                                                </td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {release.name}
                                                </td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {release.author}
                                                </td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {release.created_at}
                                                </td>
                                                <td>
                                                    <a href={release.url} to="route" target="_blank" rel="noopener noreferrer"><Button>Voir la releases <FaExternalLinkAlt className="ml-1" /></Button></a>
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
                    currentPage={props.releases.page}
                    layout="pagination"
                    showIcons={true}
                    totalPages={10}
                    className="flex justify-end gap-10 items-center w-full"
                    previousLabel="Précédent"
                    nextLabel="Suivant"
                    onPageChange={(e) => { router.get(`${route('admin.github.repos.index', {id: props.repos.name})}?page=${e}`) }}
                    />
            </div>
        </AdminLayout>
    );
}
