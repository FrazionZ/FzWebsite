import Layout from "@/Layouts/Layout"
import { Head, router } from "@inertiajs/react"
import Badge from "@/Components/Badge"
import MarkdownIt from 'markdown-it'
import Language from "@/Components/Language";
import '../../../../css/forum.css'
import { Spinner, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { toByteArray } from "base64-js";

import moment from 'moment-timezone'
import 'moment/locale/fr'
moment.locale('fr')
import { lineHeight } from "@mui/system";
import FormComment from "./FormComment";
import Paginate from "@/Components/Paginate";
import Alert from "@/Components/Alert";

import { TbPinned, TbPinnedOff } from 'react-icons/tb'
import { FiLock, FiUnlock } from 'react-icons/fi'
import { BiLink } from "react-icons/bi";

export default function ForumThreadView(props) {


    const [thread, setThread] = useState(props.thread)
    const title = "Forum"
    const lang = new Language(props.Language)
    const md = new MarkdownIt();
    const perms = props.auth.permissions
    const [comments, setComments] = useState(props.thread?.comments?.data)
    const [commentPagination, setCommentPagination] = useState(props.thread?.comments)
    const [pinnedAction, setPinnedAction] = useState((!perms.includes('forum.thread.pinned')))
    const [lockedAction, setLockedAction] = useState((!perms.includes('forum.thread.locked')))

    async function changePage(action) {
        let result = null
        if (typeof action == "string") {
            if (action == "prev")
                result = commentPagination?.current_page - 1
            else if (action == "first")
                result = 1
            else if (action == "next")
                result = commentPagination?.current_page + 1
            else if (action == "last")
                result = commentPagination?.last_page
        } else
            result = action
        refreshListComments(result)
    }

    async function afterCommentPublish(newDataComments) {
        setCommentPagination(newDataComments)
        setComments(newDataComments?.data)
        refreshListComments(commentPagination?.last_page)
    }

    async function refreshListComments(page) {
        setComments(null)
        axios.post(route('forum.thread.comment.paginate'), {
            th_id: thread?.id,
            page: page,
            _token: props.csrf_token
        })
            .then((res) => {
                let resultPagination = res.data
                setComments(resultPagination.data)
                setCommentPagination(resultPagination)
            })
    }

    async function pinned(){
        setPinnedAction(true)
        router.post(route('forum.thread.actions.pinned'), {
            th_id: thread.id,
            _token: props.csrf_token
        }, {
            onFinish: () => {
                setPinnedAction(false)
            },
            onSuccess: (res) => {
                setThread(res.props.thread)
            }
        })
    }

    async function locked(){
        setLockedAction(true)
        router.post(route('forum.thread.actions.locked'), {
            th_id: thread.id,
            _token: props.csrf_token
        }, {
            onFinish: () => {
                setLockedAction(false)
            },
            onSuccess: (res) => {
                setThread(res.props.thread)
            }
        })
    }

    async function share(){
        navigator.share({
            title: 'FrazionZ - Forum',
            text: thread?.title,
            url: route('forum.thread.view', {th_id: thread?.id}),
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }

    useEffect(() => {

    }, [thread])

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="forum thread">
                <div className="actions">
                    <span className="text-4xl">{thread?.title}</span>
                    <div className="flex gap-3">
                        <button className="btn icon" disabled={pinnedAction} onClick={pinned}>{!thread?.pinned ? <TbPinned /> : <TbPinnedOff /> }</button>
                        <button className="btn icon" disabled={lockedAction} onClick={locked}>{!thread?.locked ? <FiLock /> : <FiUnlock /> }</button>
                        <button className="btn icon" onClick={share}><BiLink /></button>
                    </div>
                </div>
                <div className="card vertical">
                    <div className="profile">
                        <div className="avatar">
                            <img src={`https://auth.frazionz.net/skins/face.php?u=${thread.author.id}`} alt="avatar" />
                        </div>
                        <div className="details">
                            <span>{thread.author.name}</span>
                            <Badge styleBadge={{ backgroundColor: thread?.author?.role?.color, padding: "0px 6px", display: "flex" }} styleMessage={{ fontSize: "10px", lineHeight: "20px" }} message={thread?.author?.role?.name} />
                        </div>
                        <div className="grid">
                            <span>Rejoins <b>{lang.replaceMonth(moment(thread?.author?.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</b></span>
                            <Tooltip content="Messages totaux par cet utilisateur">
                                <span>Messages <b>{thread?.author?.messages}</b></span>
                            </Tooltip>
                        </div>
                        <div className="grid">
                            <Tooltip content="Réponses totaux sur ce thread">
                                <span>Réponse(s) <b>{commentPagination?.total}</b></span>
                            </Tooltip>
                            <span>Publié le <b>{lang.replaceMonth(moment(thread?.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</b></span>
                        </div>
                    </div>
                    <div className="thread">
                        <div dangerouslySetInnerHTML={{ __html: md.render(atob(thread?.content)) }} />
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    {comments?.length <= 0 &&
                        <Alert state="infos">Aucun commentaire n'a été posté</Alert>
                    }
                    {comments?.length > 0 &&
                        <>
                            <Paginate layout="top" labelType="Commentaires" routeName="forum.thread.comment.paginate" pagination={commentPagination} setList={setComments} setPagination={setCommentPagination} parent_id={thread?.id} />
                            {comments == null &&
                                <div className="flex justify-center gap-3 mt-4 mb-4">
                                    <Spinner size="md" /> Veuillez patienter
                                </div>
                            }
                            {comments?.map((comment, index) => {

                                let content = toByteArray(comment.content)
                                content = new TextDecoder().decode(content)

                                return (
                                    <div key={index} className="card horizontal">
                                        <div className="profile">
                                            <div className="flex gap-4 items-center">
                                                <div className="avatar">
                                                    <img src={`https://auth.frazionz.net/skins/face.php?u=${comment.author.id}`} alt="avatar" />
                                                </div>
                                                <div className="details">
                                                    <span>{comment.author.name}</span>
                                                    <Badge key={index} styleBadge={{ backgroundColor: comment?.author?.role?.color, padding: "0px 6px", display: "flex" }} styleMessage={{ fontSize: "10px", lineHeight: "20px" }} message={comment?.author?.role.name} />
                                                </div>
                                            </div>
                                            <div className="grid">
                                                <span>Rejoins <br /><b>{lang.replaceMonth(moment(comment?.author?.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</b></span>
                                                <Tooltip content="Messages totaux par cet utilisateur">
                                                    <span>Messages <br /><b>{comment?.author?.messages}</b></span>
                                                </Tooltip>
                                                <span>Publié le <br /><b>{lang.replaceMonth(moment(comment?.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}</b></span>
                                            </div>
                                        </div>
                                        <div className="thread" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
                                    </div>
                                )
                            })}
                            <Paginate layout="bottom" labelType="Commentaires" routePagination="forum.thread.comment.paginate" pagination={commentPagination} parent_id={thread?.id} />
                        </>
                    }
                </div>
                {thread?.locked == true &&
                    <Alert state="infos">Ce thread a été vérouillé, vous ne pouvez plus commenter</Alert>
                }
                {thread?.locked == false &&
                    <FormComment thread={thread} setThread={setThread} afterCommentPublish={afterCommentPublish} />
                }
            </div>

        </Layout>
    )

}