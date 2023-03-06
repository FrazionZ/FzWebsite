import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";

import { Button } from "flowbite-react";
import { FaGithub } from "react-icons/fa";

export default function GithubIndex(props) {

    let title = "Github";
    const lang = new Language(props.language);
    const logger = props.logger;

    console.log(props)

    return (
        <AdminLayout>
            <Head title={title} />
            <table className="mt-3 min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Nom
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Visiblité
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Créer le
                        </th>
                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.repos.data.map((repo, index) => {
                        return (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {repo.name}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {repo.visibility}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {repo.created_at}
                                </td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link href={route('admin.github.repos.index', repo.name)}><Button>Voir le répertoire</Button></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </AdminLayout>
    );
}
