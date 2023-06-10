import AnswerChatSupport from "@/Components/AnswerChatSupport";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function SupportShow(props) {

    const ticket = props.ticket
    const title = `Support - Ticket #${ticket.id} - ${ticket.title}`
    console.log(ticket.answers)

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="support">
                <div className="col">
                    <h2 className="text-2xl">Catégorie</h2>
                    <h2 className="text-xl">{ticket.category.name}</h2>
                </div>
                <div className="col">
                    <h2 className="text-2xl">Titre du ticket</h2>
                    <h5 className="text-xl w-auto text-justify ">{ticket.title}</h5>
                </div>
                <div className="col">
                    <h2 className="text-2xl">Conversation</h2>
                    <div className="answers">
                        <div id="messages" style={{ alignItems: "inherit", gap: "0px" }} className="w-auto gap-0 flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            <AnswerChatSupport author={ticket.author} isYou={true} content={ticket.problems} />
                            {ticket.answers.map((answer, index) => {
                                const isYou = props.auth.user.id == answer.author.id
                                return (
                                    <AnswerChatSupport key={index} author={answer.author} isYou={isYou} content={answer.content} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}