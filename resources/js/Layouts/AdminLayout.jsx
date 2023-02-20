import "../../css/admin.css";
import Navigation from "./Admin/Navigation";
import { usePage } from "@inertiajs/react";

export default function AdminLayout({ props, title, children }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <Navigation auth={usePage().props.auth} />
            <div id="main-content" className="relative h-full p-10 overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                <main>{ children }</main>
                <p className="my-10 text-sm text-center text-gray-500">
                    &copy; 2020-2023 <a href=" " className="hover:underline" target="_blank">FrazionZ</a>. All rights reserved.
                </p>
            </div>
        </div>
    );
}
