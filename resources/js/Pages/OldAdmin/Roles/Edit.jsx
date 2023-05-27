import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Alert, Card, Checkbox, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi"
import Permissions from "./Permissions";

export default function UserEdit(props) {
    const [role, setRole] = useState(props.role);
    let title = `Edition d'un rôle`;

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

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">
                    {title}
                </h1>
                {role.level >= 5 && 
                    <Alert
                        color="info"
                        withBorderAccent={true}
                        className="mb-4"
                        icon={HiInformationCircle}
                        >
                        <span>
                            <span className="font-medium">
                                INFOS
                            </span>
                            {' '}L'affichage des permissions est désactivé sur les rôles niveau 5.
                        </span>
                    </Alert>
                }
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
                                        <Button className="w-fit" type="submit">Sauvegarder</Button>
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
                {role.level < 5 && 
                    <Permissions role={role} permissions={permissions} /> 
                }
            </div>
        </AdminLayout>
    );
}
