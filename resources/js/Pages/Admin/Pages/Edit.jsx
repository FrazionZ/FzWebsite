import { Head, Link, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";
import { useState } from "react";
import { toByteArray } from "base64-js";
import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

import { Button, Label, TextInput } from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";

export default function PageEdit(props) {

    let title = "Edition de la page";
    const lang = new Language(props.language);
    const page = props.pageData;
    const [pageTitle, setPageTitle] = useState(props.pageData.title);
    const [pageSlug, setPageSlug] = useState(props.pageData.slug);
    const [disabledForm, setDisabledForm] = useState(false)

    
    let content = toByteArray(props.pageData.content)
    content = new TextDecoder().decode(content)

    const [pageContent, setPageContent] = useState(content)

    async function submitUpdatePage(){
        setDisabledForm(true)
        router.post(route('admin.pages.update'), {
            id: page.id,
            title: pageTitle,
            slug: pageSlug,
            content: pageContent,
            _token: props.csrf_token
        }, {onFinish: () => {
            setDisabledForm(false)
        }})
    }

    return (
        <AdminLayout>
            <Head title={title} />

            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <div className="w-4/5 flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title"
                                value="Titre"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            disabled={disabledForm}
                            onChange={(e) => {
                                setPageTitle(e.target.value)
                                setPageSlug(e.target.value.toString()
                                                            .normalize('NFD')
                                                            .replace(/[\u0300-\u036f]/g, '')
                                                            .toLowerCase()
                                                            .trim()
                                                            .replace(/\s+/g, '-')
                                                            .replace(/[^\w-]+/g, '')
                                                            .replace(/--+/g, '-'))
                            }}
                            value={pageTitle}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="slug"
                                value="Slug"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            disabled={true}
                            value={pageSlug}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="content" value="Contenue" />
                        </div>
                        <MDEditor
                            value={pageContent}
                            height={500}
                            preview="edit"
                            disabled={disabledForm}
                            onChange={(e) => {
                                setPageContent(e)
                            }}
                            />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={submitUpdatePage} disabled={disabledForm} className="w-fit">Sauvegarder</Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
