import { Head, Link, router, useForm } from "@inertiajs/react";
import ForumSubcategoryCard from '../SubCategories/SubcategoryCard'
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import moment from 'moment-timezone'
import { Draggable } from "react-drag-reorder";
import 'moment/locale/fr'  // without this line it didn't work
import { Badge } from "flowbite-react";
import { Label, TextInput, Button } from "flowbite-react";
import Dropdown from "@/Components/Dropdown";
import { FaTimes } from "react-icons/fa";
moment.locale('fr')

export default function ForumSubCategoriesEdit(props) {

    const [subcategory, setSubcategory] = useState(props.forumSubcategory);
    const title = "Forum - Sous Catégorie - " + subcategory.name;

    const { data, setData, post, processing, errors } = useForm({
        id: subcategory.id,
        name: subcategory.name,
        _token: props.csrf_token
    });

    const rolesAdd = [];
    props.roles.map((role) => {
        rolesAdd.push({
            value: route("admin.forum.subcategory.role.attach"),
            data: {
                id: subcategory.id,
                role: role.id,
                _token: props.csrf_token
            },
            method: "post",
            name: role.name,
        });
    });

    async function saveCategory(e) {
        e.preventDefault()
        post(route('admin.forum.category.save'), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
            },
            onSuccess: (data) => {
                setCategory(data.props.forumCategory)
            },
            onError: (data) => {
            },
        });
    }

    /* */

    return (
        <AdminLayout>
            <Head title={title} />

            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-10 dark:bg-gray-900">
                    <div className="col-span-1">
                        <form onSubmit={saveCategory}>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Nom de la catégorie"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="BobbyCategory"
                                value={data.name}
                                disabled={processing}
                                onChange={(e) => { setData('name', e.target.value) }}
                                required={true}
                            />
                            <Button className="mt-3" disabled={processing} type="submit">Sauvegarder</Button>
                        </form>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center gap-5 border-gray-800 border-l pl-6">
                        <h1 className="text-2xl text-white mb-5">Rôles</h1>
                        {true &&
                            <div className="flex gap-1 items-center">
                                {subcategory.roles.map((role, index) => {
                                    return (
                                        <Badge size="sm" key={index} style={{ background: role.data.color, color: "#fff", }} className="w-fit text-white">
                                            <div className="flex items-center gap-1">
                                                <span>{role.data.name}</span>
                                                <Link href={route("admin.forum.subcategory.role.detach")} method="post" data={{ id: subcategory.id, role: role.data.id, _token: props.csrf_token }} >
                                                    <FaTimes />
                                                </Link>
                                            </div>
                                        </Badge>
                                    );
                                })}
                                <Dropdown
                                    text="+"
                                    items={rolesAdd}
                                    hideArrow={true}
                                    styleMenu={{ top: "36px" }}
                                    styleButton={{
                                        height: "28px",
                                        backgroundColor:
                                            "rgb(31 41 55/var(--tw-bg-opacity))",
                                        width: "fit-content",
                                        padding: "12px 6px 16px",
                                    }}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
