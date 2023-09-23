import React, { useState, useRef } from "react"
import { Link, Head } from '@inertiajs/react'
import Layout from "@/Layouts/Layout"
import * as minecraftAuth from "minecraft-auth";

const title = "Connexion à Microsoft.."
const MicrosoftAuth = minecraftAuth.MicrosoftAuth;

export default class ProfileIndex extends React.Component {

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        let account = new minecraftAuth.MicrosoftAccount();
        MicrosoftAuth.setup({appID:"747bf062-ab9c-4690-842d-a77d18d4cf82"});
        await account.authFlow(this.props.codeMSA.replace('access_token:', ''));
    }

    render() {
        return (
            <Layout
                props={this.props}
                title={title}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
            >
                <Head title={title} />

            </Layout>
        )
    }
}
