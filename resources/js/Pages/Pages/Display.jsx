import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import MarkdownIt from 'markdown-it'
import { toByteArray } from "base64-js";
import '../../../css/page.css'

export default function PageDisplay(props){

    const title = props.pageData.title
    const md = new MarkdownIt();
    let content = toByteArray(props.pageData.content)
    content = new TextDecoder().decode(content)

    return (
        <>
            <Head title={title} />
            <Layout props={props} title={title}>
                <div className="content break-all" dangerouslySetInnerHTML={{ __html: md.render(content) }}/>
            </Layout>
        </>
    )


}