import { useForm, usePage, router } from "@inertiajs/react"
import React, { useState } from 'react';
import FzToast from "@/Components/FzToast";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtmlPuri from "draftjs-to-html";

export default function FormComment({ thread, setThread, afterCommentPublish }) {

    const props = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        th_id: thread.id,
        comment: '',
        _token: props.csrf_token
    })

    const [thId, setThId] = useState(thread.id)
    const [comment, setComment] = useState(EditorState.createEmpty())
     
    const htmlPuri = draftToHtmlPuri(
        convertToRaw(comment.getCurrentContent())
    );

    const [acomment, setAComment] = useState(htmlPuri)
    const [token, setToken] = useState(props.csrf_token)

    function isQuillEmpty() {
        return acomment.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !acomment.includes("<img");
    }
    
    const onEditorStateChange = editorState => {
        setComment(editorState)
        setAComment(htmlPuri)
    };

    async function submitComment(e) {
        e.preventDefault()
        if(isQuillEmpty()) {
            FzToast.error('Votre commentaire est vide.') 
            return;
        }
        router.post(route('forum.thread.comment.publish'), {
            th_id: thId,
            acomment: acomment,
            _token: token
        }, {
            preserveScroll: true,
            onSuccess: (data) => {
                setThread(data.props.flash?.dataReset)
                setComment(EditorState.createEmpty())
                afterCommentPublish(data.props.flash?.dataReset?.comments)

            },
            onError: () => {
                setComment(EditorState.createEmpty())
            },
        });
    }

    return (
        <form onSubmit={submitComment} className="flex flex-col gap-5">
            <div className="form-group">
                <label>Votre commentaire</label>
                <div>
                    <Editor
                        editorState={comment}
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{  }}
                    />
                </div>
                
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