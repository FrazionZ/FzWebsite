import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import MarkdownIt from 'markdown-it'
import '../../../css/support.css'
import Lang from '@/Components/Language'

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function SupportView(props) {

    const title = "Support"
    const ticket = props.ticket
    const lang = new Lang(props.lang)
    const md = new MarkdownIt()

    return (
        <Layout props={props} title={title}>
            <Head title={title} />

            <div className="ticket view">
                <div className="infos">
                    <span className="title">{ticket.title}</span>
                    <span className='pub_or_up_date'>Publié le {lang.replaceMonth(moment(ticket?.updated_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</span>
                </div>
            </div>
            <div className="card ticket view my-4">
                <div className="content" dangerouslySetInnerHTML={{ __html: md.render(ticket?.problems) }} />
            </div>
            <h2 className="text-2xl font-bold">Conversation</h2>
        </Layout>
    )


}