import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";

export default function CategoryCard({ category }) {

    return (
        <div className="card" style={{ justifyContent: "space-between", overflow: "auto hidden" }}>
            <span className="text-xl text-white">{category.name}</span>
            <div className="whitespace-nowrap">
                <Link
                    href={route("admin.forum.category.edit", {
                        id: category.id,
                    })}
                >
                    <button className="btn tiny"><FaEdit /> Editer la catégorie</button>
                </Link>
            </div>
        </div>
    );
}
