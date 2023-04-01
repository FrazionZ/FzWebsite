import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import EnvelopeOpen from '../../../assets/img/icons/envelope_open.svg'
import '../../../css/support.css'
import CardTicket from "./CardTicket";

export default function SupportIndex(props) {

    const title = "Support"

    return (
        <Layout props={props} title={title}>
            <Head title={title} />

            <div className="flex flex-col gap-[30px]">
                <div className="flex items-center justify-between">
                    <div className="icon_title">
                        <img src={EnvelopeOpen} alt="" />
                        <span>Liste de vos tickets</span>
                    </div>
                    <Link href={route('support.create')}><button className="btn">Ouvrir un ticket</button></Link>
                </div>
                {props?.tickets?.map((ticket, index) => {
                    return (
                        <CardTicket key={index} ticket={ticket} />
                    )
                })}
            </div>
        </Layout>
    )


}