import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Card, Checkbox } from "flowbite-react";

export default function UserEdit(props) {
    const [role, setRole] = useState(props.role);
    let title = `Edition d'un rôle`;

    console.log(props.permissions)
    const [permissions, setPermissions] = useState(props.permissions)
    
    const { data, setData, post, processing, errors } = useForm({
        id: role.id,
        name: role.name,
        color: role.color,
        description: role.description,
        _token: props.csrf_token
    })

    async function submitRole(e){
        e.preventDefault()
        post(route('admin.roles.edit.save'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (data) => {
                setRole(data.props.role)
            },
            onError: () => {
                
            },
        });
    }

    async function setCheckPerm(id, e){
        let perms = permissions
        perms[id].hasCheck = e.target.checked
        setPermissions(perms => [...perms])
    }

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">
                    {title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 xl:gap-4 dark:bg-gray-900">
                    <div className="col-span-1">
                        <Card>
                            <h3 className=" text-xl font-semibold dark:text-white">Informations Général</h3>
                            <form onSubmit={submitRole}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du rôle</label>
                                        <input type="text" onChange={ (e) => { setData('name', e.target.value) }} name="name" id="name" value={ data.name } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pseudo" required/>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Couleur du badge</label>
                                        <input type="color" onChange={ (e) => { setData('color', e.target.value) }} name="color" id="color" value={ data.color } required/>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du rôle</label>
                                        <input type="text" onChange={ (e) => { setData('description', e.target.value) }} name="description" id="description" value={ data.description } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pseudo" required/>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug du rôle</label>
                                        <input type="text" onChange={ (e) => { setData('slug', e.target.value) }} name="slug" id="slug" value={ role.slug } disabled={true} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pseudo" required/>
                                    </div>
                                    <div className="col-span-6 sm:col-full">
                                        <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Sauvegarder</button>
                                    </div>
                                </div>
                            </form>
                        </Card>   
                    </div>       
                    <div className="col-span-1">
                        <Card>
                            <h3 className="text-xl font-semibold dark:text-white">Utilisateurs ayant ce rôle</h3>
                        </Card>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="col-span-2">
                        <Card>
                            <h3 className="text-xl font-semibold dark:text-white">Liste des permissions</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 xl:gap-4">
                                {permissions.map((perm, index) => {
                                    return (  
                                        <li key={index} className="flex items-center gap-5 text-white">
                                            <Checkbox
                                                checked={perm.hasCheck}
                                                onChange={(e) => {
                                                    setCheckPerm(index, e);
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xl">{perm.name}</span>
                                                <span className="text-sm">{perm.description}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
