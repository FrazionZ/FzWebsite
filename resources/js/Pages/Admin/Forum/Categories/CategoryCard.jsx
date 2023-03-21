import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

export default function CategoryCard({ category }) {

    return (
        <div className="p-4 mb-4 justify-between flex items-center gap-10 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800" style={{ overflow: "auto hidden" }}>
            <span className="text-xl text-white">{category.name}</span>
            <div className="whitespace-nowrap">
                <Link
                    href={route("admin.forum.category.edit", {
                        id: category.id,
                    })}
                >
                    <Button><FaEdit /> Editer la catégorie</Button>
                </Link>
            </div>
        </div>
    );
}
