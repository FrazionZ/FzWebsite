import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import moment from 'moment-timezone'
import 'moment/locale/fr'
moment.locale('fr')

export default function ShopItemsCreate(props) {

    const title = "Shop - Ajout d'un article"

    const { data, setData, post, processing, errors } = useForm({
        _token: props.csrf_token
    })

    return (
        <AdminLayout title={title}>
            <Head title={title} />
        </AdminLayout>
    )

}