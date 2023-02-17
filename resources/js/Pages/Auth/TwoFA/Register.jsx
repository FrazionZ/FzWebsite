import Layout from "@/Layouts/Layout"
import { Head, useForm } from "@inertiajs/react"
import { FaFingerprint } from "react-icons/fa"

export default function Register(props){
    
    let title = "Authentification à deux facteurs"

    const { data, setData, post, processing, errors } = useForm({
        code: '',
    })
    
    function submit(e) {
        e.preventDefault()
        post('/2fa/enable')
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={title} />
            
            <div className="flex flex-col gap-5">
                <div className="card">
                    <div className="card-body flex gap-5 items-center">
                        <FaFingerprint className="text-5xl" /> 
                        <span>Pour profiter de l'authentification à deux facteurs, vous pouvez télécharger Google Authenticator.<br />Si votre appareil n'est pas ou plus disponible, vous pouvez utiliser les codes de sauvegarde fournis après la configuration.</span>
                    </div>
                </div>
                <div className="twofa register">
                    <div dangerouslySetInnerHTML={{__html: props.qrCode}} /> 
                    <div className="flex flex-col gap-5 w-full">
                        <form onSubmit={submit}>
                            <div className="flex gap-10">
                                <div className="form-group">
                                    <label>Secret</label>
                                    <input type="text" disabled value={props.secret} />
                                </div>
                                <div className="form-group w-full">
                                    <label>Code</label>
                                    {errors.code && <div>{errors.code}</div>}
                                    <input type="text" value={data.code} onChange={e => setData('code', e.target.value)} />
                                </div>
                            </div>
                        </form>
                        <button className="btn" onClick={submit} type="submit" disabled={processing}>Continuer</button>
                    </div>
                </div>
            </div>
        </Layout>
    )


}