import { useForm, Head } from "@inertiajs/react"
import { useState } from "react";
import Editor from "@/Components/Editor/Editor";
import Layout from "@/Layouts/Layout";
import CommentPen from '../../../../assets/img/icons/comment-pen.svg'

export default function FormCreate(props) {

    const title = "Forum"
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        sc_id: props.sc.id,
        _token: props.csrf_token
    })

    async function submitThread(e) {
        e.preventDefault()
        post(route('forum.thread.create.handle'));
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />

            <div className="justify-start icon_title w-full">
                <img src={CommentPen} alt="" />
                <span>Création d'un Thread</span>
            </div>
            <form onSubmit={submitThread} className="flex flex-col gap-5 mt-8">
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
                    <div className="form-group">
                        <label>Titre</label>
                        <input
                            type="text"
                            disabled={processing}
                            value={data.title}
                            onChange={(e) => { setData('title', e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Catégorie</label>
                        <input
                            type="text"
                            value={props.fc.name + " -> " + props.sc.name}
                            disabled={true}
                            onChange={(e) => { setData('title', e.target.value) }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Contenue</label>
                    <Editor 
                        showToolbar={true}
                        processing={processing}
                        state={data.content}
                        height={500}
                        onChange={(e) => { setData('content', e) }}
                        />
                </div>
                <button disabled={processing} type="submit" className="btn">Poster</button>
            </form>
        </Layout>
    )


}