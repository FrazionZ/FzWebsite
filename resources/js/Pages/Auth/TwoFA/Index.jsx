import Layout from "@/Layouts/Layout"
import { Head } from "@inertiajs/react"

export default function Index(props){

    const title = "Authentification à deux facteurs"

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
        </Layout>
    )


}