import "../../css/admin.css";
import "../../css/switch.css";
import { usePage } from "@inertiajs/react";
import FzToastContainer from "@/Components/FzToastContainer";
import Language from '@/Components/Language'
import '../../css/admin.css'
import '../../css/app.css';
import '../../css/switch.css';
import "../../css/editor.css";
import Navigation from "./Admin/Navigation";

export default function AdminLayout({ title, children }) {

    const props = usePage().props;
    const lang = new Language(props.language);
    const auth = props.auth

    return (
        <div className="admin layout">
            <div className="sidebar">
                <Navigation />
            </div>
            <div className="body">
                <div className="topbar">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="flex gap-4 items-center relative">
                        <div className="flex flex-col gap-1 justify-end items-end">
                            <span className="font-bold text-xl">{auth.user.name}</span>
                            <span className={`w-fit py-1 text-sm px-2 rounded-lg`} style={{ backgroundColor: auth.role.badgeStyle.background, color: auth.role.badgeStyle.color }}>{auth.role.name}</span>
                        </div>
                        <img src={`https://auth.frazionz.net/skins/face.php?u=${auth.user.id}`} width={64} className="rounded-xl" alt="avatar_user" />
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
            <FzToastContainer />
        </div>
    );
}
