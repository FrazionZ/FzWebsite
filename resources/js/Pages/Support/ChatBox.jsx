import Language from "@/Components/Language";
import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
import { usePage } from "@inertiajs/react";
import { Tooltip } from "flowbite-react";

export default function Chatbox({ lastRefreshDate, progressLoadTicket, currentTicket, messages }) {

    const props = usePage().props
    let lang = new Language(props.language);
    const user = props.auth.user

    return (
        <div className="chatbox flex-1">
            <div className="head">
                <div className="title_ticket">
                    {currentTicket.title}
                </div>
                <div className="details_ticket">
                    Ticket N°{currentTicket.id} - Créé le {lang.replaceMonth(moment(currentTicket.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                    <br /> {lastRefreshDate != null ? `Actualisé le ${lastRefreshDate.format('DD/MM/YYYY à HH:mm')}` : ""}
                </div>
            </div>
            <div className="messages">
                {progressLoadTicket &&
                    <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
                        <div className="loader-3" />
                        <h2 className="text-xl">Chargement des messages</h2>
                    </div>
                }
                {!progressLoadTicket &&
                    <div className="list">
                        {messages.length > 0 &&
                            <>
                                {messages.map((msg, index) => {

                                    const isYou = user.id == msg?.author?.id

                                    return (
                                        <div className={`item ${isYou ? "isYou" : ""}`} key={index}>
                                            <div className={`infos`}>
                                                <Tooltip content={`${msg?.author?.name}`}>
                                                    <div className="user">
                                                        <img src={`https://auth.frazionz.net/skins/face.php?u=${msg?.author?.id}`} alt="" />
                                                    </div>
                                                </Tooltip>
                                                <div className={`content ${isYou ? "isYou" : ""}`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                            <div className="details">
                                                Envoyé le {lang.replaceMonth(moment(msg.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                        {messages.length <= 0 &&
                            <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
                                <h2 className="text-2xl">Aucun messages</h2>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )

}