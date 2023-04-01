import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export default function FormComment({ thread, setThread, afterCommentPublish }) {

    const props = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        th_id: thread.id,
        comment: '',
        _token: props.csrf_token
    })

    async function submitComment(e) {
        e.preventDefault()
        post(route('forum.thread.comment.publish'), {
            preserveScroll: true,
            onSuccess: (data) => {
                setThread(data.props.flash?.dataReset)
                setData('comment', '')
                afterCommentPublish(data.props.flash?.dataReset?.comments)
                
            },
            onError: () => {
                setData('comment', '')
            },
        });
    }

    return (
        <form onSubmit={submitComment} className="flex flex-col gap-5">
            <div className="form-group">
                <label>Votre commentaire</label>
                <MDEditor
                    hideToolbar={true}
                    preview="edit"
                    value={data.comment}
                    height={200}
                    minHeight={200}
                    maxHeight={200}
                    disabled={processing}
                    onChange={(e) => { setData('comment', e) }}
                />
            </div>
            <button
                type="submit"
                disabled={processing}
                className="flex justify-center btn"
            >
                Envoyer
            </button>
        </form>
    )


}