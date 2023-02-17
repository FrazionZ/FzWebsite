import Layout from "@/Layouts/Layout"
import { Head } from "@inertiajs/react"
import { router } from '@inertiajs/react'
import { FaFingerprint } from "react-icons/fa"
import AuthCode from "react-auth-code-input"
import { useState } from "react"

export default function Register(props){
    
    let title = "Se Connecter"

    
    const [disabledForm, setDisabledForm] = useState(false);
    const [result, setResult] = useState();

    async function handleOnChange(code) {
        await setResult(code);
        if(code !== undefined)
          if(code.length == 6)
            handleClick(code)
    };
    
    async function handleClick(code) {
        setDisabledForm(true)
        router.post(route('2fa.handleLogin'), { code: code })
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col items-center gap-[48px]">
                <div className="form-group">
                    <label>Code</label>
                    <AuthCode
                        autoFocus={true}
                        containerClassName="flex gap-[24px]"
                        disabled={disabledForm}
                        length="6"
                        allowedCharacters="numeric"
                        inputClassName="w-[80px] h-[78px]"
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    id="buttonLoginAuth"
                    disabled={disabledForm}
                    className="btn w-fit"
                    onClick={() => handleClick(result)}
                    >
                    Vérifier le code
                </button>
            </div>
        </Layout>
    )


}