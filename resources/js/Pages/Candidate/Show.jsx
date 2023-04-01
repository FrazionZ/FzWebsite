import Layout from '@/Layouts/Layout'
import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import FzToast from '@/Components/FzToast';

import Alert from '@/Components/Alert'
import CandidateComponentCardComment from '@/Components/CandidateComponentCardComment'

import Comments from '../../../assets/img/icons/comment.svg'
import BubbleInfos from '../../../assets/img/icons/bubble_infos.svg'
import EnvoleOpen from '../../../assets/img/icons/envelope_open.svg'
import MDEditor from '@uiw/react-md-editor';

export default function CandidateShow(props) {

    
    let title = `Candidature`
    let auth = props.auth
    const [category, setCategory] = useState(props.category)
    const [candidate, setCandidate] = useState(props.candidate)
    const [comments, setComments] = useState(props.comments)
    const [disabledForm, setDisabledForm] = useState(false)
    
    
    const { data, setData, post, processing, errors } = useForm({
        cid: candidate.id,
        comment: '',
        _token: props.csrf_token
    })
    
    async function submitComment(e) {
        e.preventDefault()
        post(route('candidate.handleComment'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (data) => {
                setComments(data.props.comments)
                setData('comment', '')
            },
            onError: () => {
                
            },
        });
    }

    return (
        <Layout title={title} props={props}>
            <Head title={title} />

            <div className="flex flex-col gap-[120px]">
                <div className="flex flex-col gap-[30px]">
                    <div className="justify-start icon_title w-full">
                        <img src={BubbleInfos} alt="" />
                        <span>Information</span>
                    </div>
                    <Alert state="infos">{category.show}</Alert>
                    <div className="flex gap-8">
                        <div className="form-group w-1/2">
                            <label>Pseudo</label>
                            <input
                                type="text"
                                disabled
                                value={candidate.upseudo}
                            />
                        </div>
                        <div className="form-group w-full">
                            <label>Rôle souhaité</label>
                            <input
                                type="text"
                                disabled
                                value={candidate.rank}
                            />
                        </div>
                    </div>
                    {(auth.isAdmin == true ||
                        auth.user.id == candidate.uid) && (
                        <>
                            <div className="flex gap-8">
                                <div className="form-group w-full">
                                    <label>
                                        Tag Discord{" "}
                                        <span className="text-sm">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={candidate.discordtag}
                                    />
                                </div>
                                <div className="form-group w-1/2">
                                    <label>
                                        Âge <span className="text-sm">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={candidate.age}
                                    />
                                </div>
                            </div>
                            <span className="flex justify-end text-sm">
                                *Ces informations ne sont visibles que par vous
                                et le Staff.
                            </span>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-[30px]">
                    <div className="justify-start icon_title w-full">
                        <img src={EnvoleOpen} alt="" />
                        <span>Présentation</span>
                    </div>
                    <div className="card ">
                        <div
                            className="card-body overflow-y-auto max-h-[800px] pr-5"
                            style={{ wordWrap: "break-word" }}
                            dangerouslySetInnerHTML={{
                                __html: candidate.present,
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="justify-start icon_title w-full">
                        <img src={Comments} alt="" />
                        <span>Commentaires</span>
                    </div>
                    {comments.map((comment, index) => {
                        return (
                            <CandidateComponentCardComment key={index} comment={comment} />
                        );
                    })}
                    {comments.length == 0 && (
                        <Alert state="infos">Aucun commentaire n'a été posté</Alert>
                    )}
                    {candidate.locked == true && (
                        <Alert state="error">Cette candidature est verrouillée, vous ne pouvez plus commenter"</Alert>
                    )}
                    {candidate.locked == false && (
                        <form onSubmit={submitComment} className="flex flex-col gap-5">
                            <div className="form-group">
                                <label>Rédaction de votre commentaire</label>
                                <textarea
                                    className="h-9"
                                    disabled={processing}
                                    value={data.comment}
                                    onChange={(e) => {
                                        setData('comment', e.target.value)
                                    }}
                                >
                                </textarea>
                            </div>
                            <button
                                type="submit" 
                                disabled={processing}
                                className="flex justify-center btn"
                            >
                                Envoyer
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );


}