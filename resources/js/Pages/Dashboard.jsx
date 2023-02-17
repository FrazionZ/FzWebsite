import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {

    return (
        <Layout
            props={props}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in! </div>
            </div>
        </Layout>
    );
}
