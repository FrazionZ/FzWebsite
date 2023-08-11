import Layout from "@/Layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
import EnvelopeOpen from '../../../assets/img/icons/envelope_open.svg'
import '../../../css/support.css'
import CardTicket from "./CardTicket";
import Switch from '@/Components/FzSwitch'
import { useEffect, useState } from "react";
import Chatbox from "./ChatBox";
import axios from "axios";
import FzToast from "@/Components/FzToast";
import moment from 'moment-timezone'

export default function SupportIndex(props) {

    const title = "Support"
    const [showOnlyMyTickets, setShowOnlyMyTickets] = useState(false)
    const hasPermShowAdmin = props.auth.permissions.includes('admin.support.show')
    const tickets = props?.tickets
    const [currentTicket, setCurrentTicket] = useState(tickets.length > 0 ? tickets[0] : null)
    const [progressLoadTicket, setProgressLoadTicket] = useState(tickets.length > 0)
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")
    const [sending, setSending] = useState(false)
    let intervalRefreshMessage = null
    const [lastRefreshDate, setLastRefreshDate] = useState(null)

    function loadTicket(tid) {
        if(progressLoadTicket) return;
        if(sending) return;
        if(tid.id == currentTicket.id) return;
        setProgressLoadTicket(true)
        setCurrentTicket(tid)
    }

    function submitMessage() {
        setChatInput("")
        setSending(true)
        router.post(route('support.sendAnswer'), {
            tid: currentTicket.id,
            answer: chatInput,
            _token: props.csrf_token
        }, {
            preserveScroll: true,
            onSuccess: (response) => {
                if(response?.props?.flash?.result != null) {
                    const newListMessages = response?.props?.flash?.result
                    setMessages(newListMessages)
                }
            },
            onFinish: () => {
                setSending(false)
            }
        })
    }

    function gettingMessages() {
        return new Promise((resolve, reject) => {
            axios.post(route('support.gettingMessages'), { ticket_id: currentTicket.id, _token: props.csrf_token })
                .then((result) => {
                    setProgressLoadTicket(false)
                    setMessages([])
                    setLastRefreshDate(moment())
                    if(result.data.result == "success"){
                        setMessages(result?.data?.messages)
                        resolve(result.data)
                    }else if(result.data.result == "error") {
                        FzToast.error(result?.data?.msg)
                        reject(result.data)
                    }
                })
                .catch((reason) => { reject(reason) })
        })
    }

    useEffect(() => {
        if(currentTicket == null) return;
        gettingMessages().then(() => {
            if(intervalRefreshMessage != null) clearInterval(intervalRefreshMessage)
            intervalRefreshMessage = setInterval(() => {
                gettingMessages().then().catch()
            }, 60000)
        })
    }, [currentTicket])

    useEffect(() => {
        let elem = document.querySelector('.support .chatbox .messages')
        elem.scrollTop = elem.scrollHeight;
    }, [messages])

    return (
        <Layout props={props} title={title}>
            <Head title={title} />
            <div className="support">
                <div className="menu">
                    <button className="btn create" onClick={() => {router.get(route('support.create'))}}>Ouvrir un ticket</button>
                    <div className="separator" />
                    <input type="text" disabled={sending || progressLoadTicket} placeholder="Rechercher un ticket" />
                    <div className="separator" />
                    {hasPermShowAdmin && 
                        <Switch checked={showOnlyMyTickets} disabled={sending || progressLoadTicket} label="Voir uniq. mes tickets" onChange={() => { setShowOnlyMyTickets(!showOnlyMyTickets) }} />
                    }
                    <div className="tickets">
                        {tickets?.map((ticket, index) => {
                            return (
                                <CardTicket key={index} isCurrentTicket={currentTicket.id == ticket.id} onClick={() => { loadTicket(ticket) }} ticket={ticket} />
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    <Chatbox lastRefreshDate={lastRefreshDate} messages={messages} progressLoadTicket={progressLoadTicket} currentTicket={currentTicket} />
                    <div className="form">
                        <input type="text" value={chatInput} disabled={sending || progressLoadTicket} onChange={(e) => { setChatInput(e.target.value) }} onKeyUp={(e) => { if(e.keyCode == 13) submitMessage() }} className="w-full" placeholder="Écrire un message" />
                    </div>
                </div>
            </div>

        </Layout>
    )


}