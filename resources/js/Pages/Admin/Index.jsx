import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import { Card } from 'flowbite-react'

export default class AdminIndex extends React.Component {

    constructor(props) {
        super(props)
        this.title = "Tableau de bord"
        this.user = props.auth.user
    }

    render() {
        return (
            <AdminLayout title={this.title}>
                <Head title={this.title} />
                <h1 className="text-3xl text-white mb-5">Bienvenue <b>{this.user.name}</b></h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className='card flex-col' style={{ alignItems: "flex-start" }}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Nombre d'utilisateurs
                        </h5>
                        <p className="font-bold text-6xl text-gray-700 dark:text-gray-400">
                            {this.props.countUser}
                        </p>
                    </div>
                    <div className='card flex-col' style={{ alignItems: "flex-start" }}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Data Not Defined
                        </h5>
                        <p className="font-bold text-6xl text-gray-700 dark:text-gray-400">
                            N/A
                        </p>
                    </div>
                    <div className='card flex-col' style={{ alignItems: "flex-start" }}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Data Not Defined
                        </h5>
                        <p className="font-bold text-6xl text-gray-700 dark:text-gray-400">
                            N/A
                        </p>
                    </div>
                    <div className='card flex-col' style={{ alignItems: "flex-start" }}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Data Not Defined
                        </h5>
                        <p className="font-bold text-6xl text-gray-700 dark:text-gray-400">
                            N/A
                        </p>
                    </div>
                </div>
            </AdminLayout>
        )
    }

}