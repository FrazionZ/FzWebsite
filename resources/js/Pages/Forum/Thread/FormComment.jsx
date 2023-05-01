import { useForm, usePage } from "@inertiajs/react"
import React, { useState } from 'react';

import ReactQuill, { Quill, editor } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import katex from "katex";
import "katex/dist/katex.min.css";
import CustomToolbar from '@/Components/Editor/CustomToolbar'
import FzToast from "@/Components/FzToast";
import MDEditor from '@uiw/react-md-editor';
import Editor from "@/Components/Editor/Editor";

export default function FormComment({ thread, setThread, afterCommentPublish }) {

    const props = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        th_id: thread.id,
        comment: '',
        _token: props.csrf_token
    })
    const modules = {
        toolbar: false
    }
    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'header', 'blockquote', 'code-block',
        'indent', 'list',
        'direction', 'align',
        'link', 'image', 'video', 'formula',
    ]

    function isQuillEmpty() {
        return data.comment.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !data.comment.includes("<img");
    }

    async function submitComment(e) {
        e.preventDefault()
        if(isQuillEmpty()) {
            FzToast.error('Votre commentaire est vide.') 
            return;
        }
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
                <div className="flex flex-col">
                    <Editor 
                        showToolbar={false}
                        processing={processing}
                        state={data.comment}
                        onChange={(e) => { setData('comment', e) }}
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