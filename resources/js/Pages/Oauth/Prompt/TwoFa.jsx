import OAuthLayout from "@/Layouts/OAuthLayout"
import { Head } from "@inertiajs/react"
import { router } from '@inertiajs/react'
import { FaFingerprint } from "react-icons/fa"
import AuthCode from "react-auth-code-input"
import { useState } from "react"

export default function OauthPromptTwoFa(props){
    
    let title = "Authentification"

    
    const [disabledForm, setDisabledForm] = useState(false);
    const [typeCode, setTypeCode] = useState(0)
    const [result, setResult] = useState();

    async function handleOnChange(code) {
        await setResult(code);
        if(code !== undefined)
          if(code.length == 6)
            handleClick(code)
    };
    
    async function handleClick(code) {
        setDisabledForm(true)
        router.post(route('2fa.handleLogin'), { code: code, typeCode: typeCode, _token: props.csrf_token }, {onFinish: () => {setDisabledForm(false)}})
    }

    async function switchTypeCode() {
        setResult(null)
        setTypeCode(typeCode !== 0 ? 0 : 1)
    }

    return (
        <OAuthLayout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col items-center gap-[48px]">
                <div className="form-group">
                    {typeCode == 0 && 
                        <>
                            <label>Code 2FA</label>
                            <AuthCode
                                autoFocus={true}
                                containerClassName="flex gap-[24px]"
                                disabled={disabledForm}
                                length="6"
                                allowedCharacters="numeric"
                                inputClassName="w-[80px] h-[78px]"
                                onChange={handleOnChange}
                                />
                        </>
                    }
                    {typeCode == 1 && 
                        <>
                            <label>Code de secours</label>
                            <input type="text" value={result} onChange={(e) => setResult(e.target.value)} name="code_backup" />
                        </>
                    }
                    <span className="text-center text-[var(--color-2)] mt-8 text-lg cursor-pointer select-none" autoFocus={true} onClick={switchTypeCode}>
                        {typeCode == 0 ? "Utiliser un code de secours" : "Utiliser le code 2FA"}
                    </span>
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
        </OAuthLayout>
    )


}