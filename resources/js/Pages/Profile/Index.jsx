import React from "react"
import Layout from "@/Layouts/Layout"
import { Link, Head } from '@inertiajs/react'
import Alert from "@/Components/Alert"

export default class ProfileIndex extends React.Component {

    constructor(props){
        super(props)
        this.title = "Profil"
        this.status = props.status
        this.mustVerifyEmail = props.mustVerifyEmail
        this.TwoFA = props.auth.TwoFA
        this.user = props.auth.user
    }


    render(){
        return (
            <Layout
                props={this.props}
                title={this.title}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            >
                <Head title={this.title} />
                <div className="flex flex-col gap-[60px]">
                    {this.TwoFA === false && (
                        <div className="alert infos w-full"><span>Tu peux activer la double authentification en allant <Link href="/2fa/register">ici</Link></span></div>
                    )}
                    {this.mustVerifyEmail && this.user.email_verified_at === null && (
                        <div className="flex justify-between items-center gap-[60px]">
                            <Alert state="warning" message="Tu dois valider ton adresse mail pour pouvoir jouer !" />
                            <Link href={route('verification.send')} data={{_token: props.csrf_token}} method="post" as="button" className="btn">Renvoyer un email</Link>

                            {this.status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Layout>
        ) 
    }

}