import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";

export default function SupportCreate(props) {

    const title = "Support"
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        ch_id: 1,
        problem: '',
        _token: props.csrf_token
    })

    const submitTicket = (e) => {
        e.preventDefault()
        post(route('support.create.handle'))
    }

    return (
        <Layout props={props} title={title}>
            <Head title={title} />
            <form onSubmit={submitTicket} className="flex flex-col gap-5 mt-8">
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
                        <select disabled={processing} onChange={(e) => { setData('ch_id', e.taget.value) }}>
                            {props.categories.map((category, index) => {
                                return <option key={index} value={category.id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Quel est votre problème ?</label>
                    <MDEditor 
                        preview="edit"
                        value={data.problem}
                        onChange={(e) => { setData('problem', e) }}
                        />
                </div>
                <button disabled={processing} type="submit" className="btn">Envoyer</button>
            </form>
        </Layout>
    )


}