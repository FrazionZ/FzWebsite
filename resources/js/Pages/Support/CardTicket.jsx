import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
import Lang from '@/Components/Language'
import { Link } from '@inertiajs/react'

export default function CardTicket(props) {

    const ticket = props.ticket
    const lang = new Lang(props.lang)
    const lastMessage = ticket?.lastMessage
    const isCurrentTicket = props.isCurrentTicket

    return (
        <div onClick={props.onClick} className={`card ticket ${isCurrentTicket ? "active" : ""}`}>
            <div className="infos">
                <span className="title">{ticket.title}</span>
                <span className='last_message'>
                    {lastMessage == null ? "Aucun message" : lastMessage?.content}
                </span>
            </div>
        </div>
    )

}