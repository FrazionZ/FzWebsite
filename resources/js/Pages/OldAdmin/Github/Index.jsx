import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";

import { Button } from "flowbite-react";
import { FaGithub } from "react-icons/fa";

export default function GithubIndex(props) {

    let title = "Github";
    const lang = new Language(props.language);
    const logger = props.logger;

    return (
        <AdminLayout>
            <Head title={title} />
            
            <div className="p-10 flex flex-col gap-10">
                <div className="flex items-center gap-3 p-6 text-white">
                    <FaGithub className="w-12 navbar-brand-img text-6xl text-white" /> | <img src="https://frazionz.net/assets/themes/frazionz/img/fz_logo_flat_linear_radial.svg?v1.0.8" className="navbar-brand-img h-100 w-12" alt="main_logo" /> 
                </div>
                <div className="infos">
                    <h3 className="text-2xl text-white font-bold">Bienvenue sur FzGit</h3>
                    <p className="text-xl text-white">Cette espace est réservés aux administateurs de FrazionZ.</p>
                </div>
                <Link href={route('admin.github.auth.start')}><Button>Se connecter avec Github</Button></Link>
            </div>
        </AdminLayout>
    );
}
