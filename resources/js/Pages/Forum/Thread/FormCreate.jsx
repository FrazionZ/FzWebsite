import { useForm, Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import CommentPen from '../../../../assets/img/icons/comment-pen.svg'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";
import draftToHtmlPuri from "draftjs-to-html";
import "../../../../assets/css/editor.css";

export default function FormCreate(props) {

    


    const title = "Forum"
    

    const [ftitle, setTitle] = useState("")
    const [content, setContent] = useState(EditorState.createEmpty())

    
    const htmlPuri = draftToHtmlPuri(
        convertToRaw(content.getCurrentContent())
    );

    const [acontent, setAContent] = useState(htmlPuri)
    const [scID, setSCId] = useState(props.sc.id)
    const [token, setToken] = useState(props.csrf_token)

    const [processing, setProcessing] = useState(false)

    async function submitThread(e) {
        e.preventDefault()
        setProcessing(true);
        router.post(route('forum.thread.create.handle'), {
            title: ftitle,
            content: content,
            acontent: acontent,
            sc_id: scID,
            _token: token
        }, {
            onError: () => {
                setProcessing(false)
            }
        })
    }

    const onEditorStateChange = editorState => {
        setContent(editorState)
        setAContent(htmlPuri)
    };

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
                            value={ftitle}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Catégorie</label>
                        <input
                            type="text"
                            value={props.fc.name + " -> " + props.sc.name}
                            disabled={true}
                            onChange={(e) => { setSCId(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Contenue</label>
                    <Editor
                        editorState={content}
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          options: [
                            "inline",
                            "fontSize",
                            "fontFamily",
                            "textAlign",
                            "colorPicker",
                            "link",
                            "remove",
                            "history"
                          ],
                          inline: {
                            inDropdown: false,
                            options: ["bold", "italic", "underline"]
                          }
                        }}
                        />
                        
                </div>
                <button disabled={processing} type="submit" className="btn">Poster</button>
            </form>
        </Layout>
    )


}