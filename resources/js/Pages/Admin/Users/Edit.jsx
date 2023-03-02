import { Head, useForm, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Badge, Button } from "flowbite-react";
import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Select } from "flowbite-react";
import Dropdown from "@/Components/Dropdown";
moment.locale('fr')

export default function UserEdit(props) {


    let auth = props.auth
    const [user, setUser] = useState(props.user)
    let title = user.name;

    
    let arh = props.authRoleHigh;

    const [tokenUsers, setTokenUsers] = useState(props.tokenUsers)

    let dataSaveUser = {
        id: user.id,
        username: user.name,
        email: user.email,
        _token: props.csrf_token
    }

    if(auth.permissions.includes('admin.user.money'))
        dataSaveUser.money = user.money

    if(auth.permissions.includes('admin.user.ban'))
        dataSaveUser.banned = user.banned

    const { data, setData, post, processing, errors } = useForm(dataSaveUser)

    async function moneyChange(){
        const value = Math.max(0, Math.min(999999999, Number(event.target.value)));
        setData('money', value);
    }

    const rolesAdd = []
    props.roles.map((role) => {
        if(arh.position < role.position || arh.level >= 5)
            rolesAdd.push({ value: route('admin.users.role.attach', { id: user.id, role: role.id }), method: "get", name: role.name })
    })

    async function submitUser(e){
        e.preventDefault()
        post(route('admin.users.edit.save'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (data) => {
                setUser(data.props.user)
            },
            onError: () => {
                
            },
        });
    }

    async function revokeToken(postData) {
        router.post(route('admin.users.token.revoke'), postData, {
            preserveState: true,
            preserveScroll: true,
            resetOnSuccess: true,
            onFinish: (data) => {
            },
            onSuccess: (data) => {
                setTokenUsers(data.props.tokenUsers)
            },
            onError: (data) => {
            },
        });
    }

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                <div className="mb-4 col-span-full xl:mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Edition de l'utilisateur</h1>
                </div>
                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <img className="mb-4 rounded-lg w-[64px] h-[64px] sm:mb-0 xl:mb-4 2xl:mb-0" src={`https://api.frazionz.net/user/${user.id}/skin/head`} alt="Jese picture"/>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                                <div className="flex gap-1 items-center">
                                    {user.roles.map((role, index) => {
                                        return (
                                            <Badge size="sm" key={index} style={{ background: role.color, color: "#fff"}} className="w-fit text-white">
                                                <div className="flex items-center gap-2">
                                                    <span>{role.name}</span>
                                                    {arh.position < role.position && props.auth.permissions.includes('admin.user.role.edit') &&  user.id !== props.auth.user.id &&
                                                        <>
                                                            {user.roles.length > 1 && 
                                                                <Link href={route('admin.users.role.detach', {id: user.id, role: role.id})}>
                                                                    <FaTimes />
                                                                </Link>
                                                            }
                                                        </>
                                                    }
                                                    {arh.level >= 5 && role.level >= 5 && props.auth.permissions.includes('admin.user.role.edit') &&  user.id !== props.auth.user.id &&
                                                        <>
                                                            {user.roles.length > 1 && 
                                                                <Link href={route('admin.users.role.detach', {id: user.id, role: role.id})}>
                                                                    <FaTimes />
                                                                </Link>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </Badge>
                                        )
                                    })}
                                    {props.roles.length !== 0 && props.auth.permissions.includes('admin.user.role.edit') && user.id !== props.auth.user.id && <Dropdown text="+" items={rolesAdd} hideArrow={true} styleMenu={{ top: "36px"}} styleButton={{ height: "28px", backgroundColor: "rgb(31 41 55/var(--tw-bg-opacity))", width: "fit-content", padding: "12px 6px 16px" }}/> }
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.auth.permissions.includes('admin.user.session.view') && 
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <div className="flow-root">
                                <h3 className="text-xl font-semibold dark:text-white">Sessions</h3>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {tokenUsers.map((session, index) => {
                                        return (
                                            <li className="py-4" key={index}>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                                            {session.geo.city} - {atob(session.ip)}
                                                        </p>
                                                        <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                                            {session.os} - {session.useragent}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center">
                                                        <button onClick={ () => revokeToken({id: session.id, user_id: user.id}) } className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Revoke</button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Informations Général</h3>
                        <form onSubmit={submitUser}>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pseudo</label>
                                    <input type="text" onChange={ (e) => { setData('username', e.target.value) }} name="first-name" id="name" value={ data.username } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pseudo" required/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse Email</label>
                                    <input type="email" onChange={ (e) => { setData('email', e.target.value) }} name="email" id="email" value={ data.email }  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="uuid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UUID</label>
                                    <input type="text" name="uuid" id="uuid" disabled value={ user.uuid } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="N/A" required/>
                                </div>
                                {auth.permissions.includes('admin.user.money') && 
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="money" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points boutique</label>
                                        <input type="number" onChange={moneyChange} name="money" id="money" value={ data.money } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="N/A" required/>
                                    </div>
                                }
                                {auth.permissions.includes('admin.user.ban') && 
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Est bannis ?</label>
                                        <Select
                                            onChange={ (e) => { setData('banned', e.target.value) } } 
                                            value={ data.banned }
                                            required={true}
                                        >
                                            <option value="1">Oui</option>
                                            <option value="0">Non</option>
                                        </Select>
                                    </div>
                                }
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="createdat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Inscrit depuis le</label>
                                    <input type="text" name="createdat" id="createdat" disabled value={moment(user.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY')}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="N/A" required/>
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Sauvegarder</button>
                                </div>
                            </div>
                        </form>
                    </div>   
                </div>
            </div>
        </AdminLayout>
    );
}
