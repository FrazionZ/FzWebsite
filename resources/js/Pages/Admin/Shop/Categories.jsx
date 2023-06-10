import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function ShopCategories() {

    const title = "Shop - Catégories"

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            
        </AdminLayout>
    )

}