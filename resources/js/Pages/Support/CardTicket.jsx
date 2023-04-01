import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
import Lang from '@/Components/Language'
import { Link } from '@inertiajs/react'

export default function CardTicket(props) {

    const ticket = props.ticket
    const lang = new Lang(props.lang)
    const lastMessage = ticket?.lastMessage

    return (
        <div className="card ticket">
            <div className="infos">
                <span className="title">{ticket.title}</span>
                <span className="pub_or_up_date">
                    Mis à jour le {lang.replaceMonth(moment(ticket?.updated_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                </span>
                <span className='last_message'>
                    Derniers message {lastMessage == null ? ", Aucun" : " de "+lastMessage?.author?.name+" le "+lang.replaceMonth(moment(lastMessage?.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm')) }
                </span>
            </div>
            <div className="actions">
                <Link href={route('support.view', {id: ticket?.id})}><button className='btn'>Voir</button></Link>
            </div>
        </div>
    )

}