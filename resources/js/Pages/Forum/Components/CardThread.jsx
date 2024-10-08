import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

import { motion } from 'framer-motion'

import Lang from '@/Components/Language'
import { Link, usePage } from '@inertiajs/react'
import { Tooltip } from 'flowbite-react'
import Lock from '../../../../assets/img/icons/lock.jsx'
import Pinned from '../../../../assets/img/icons/pinned.jsx'
import CommentForum from '../../../../assets/img/icons/commentForum.svg'

export default function CardThread({ thread }) {

    const props = usePage().props
    const lang = new Lang(props.lang)

    const dateUpdate = thread?.updated_type
    let dateUpdateDisplay = "Err"
    if(dateUpdate == -1)
        dateUpdateDisplay = "Publié le "+lang.replaceMonth(moment(thread?.created_at).local("fr").tz("Europe/Paris").format('D/MM/YYYY à HH:mm'))
    else if(dateUpdate == 0)
        dateUpdateDisplay = "Édité le "+lang.replaceMonth(moment(thread?.updated_at).local("fr").tz("Europe/Paris").format('D/MM/YYYY à HH:mm'))
    else if(dateUpdate == 1)
        dateUpdateDisplay = "Nouv. message le "+lang.replaceMonth(moment(thread?.updated_at).local("fr").tz("Europe/Paris").format('D/MM/YYYY à HH:mm'))

    return (
        <Link href={route('forum.thread.view', { th_id: thread.id })}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, type: "tween" }} className="card item">
                <div className="infos">
                    <div className="datas">
                        <div className="title">
                            {thread?.title}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex gap-2">
                                <img className='rounded-md' src={`https://api.frazionz.net/user/${thread?.author?.uuid}/skin/head?s=32`} width="24" height="24" alt="avatar" />
                                {thread?.author?.name}
                            </div>
                            <div className="flex flex-col">
                                <span className="date">
                                    {dateUpdateDisplay}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="states">
                        <div className="comments">
                            <Tooltip style='dark' content="Commentaires totaux">
                                <span>{thread?.comments}</span>
                                <img src={CommentForum} alt="" />
                            </Tooltip>
                        </div>
                        {thread?.pinned == true &&
                            <Tooltip content="Épinglé">
                                <Pinned />
                            </Tooltip>
                        }
                        {thread?.locked == true &&
                            <Tooltip content="Vérrouillé">
                                <Lock />
                            </Tooltip>
                        }
                    </div>
                </div>
            </motion.div>
        </Link>
    )


}