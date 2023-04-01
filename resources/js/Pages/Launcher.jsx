import Layout from '@/Layouts/Layout';

import LauncherPatchNotes from '@/Components/LauncherPatchNotes';

import CloudDL from '../../assets/img/icons/cloud_dl.svg'
import PNotes from '../../assets/img/icons/pnotes.svg'


import Windows from '../../assets/img/icons/windows.svg'
import Linux from '../../assets/img/icons/ubuntu.svg'
import Apple from '../../assets/img/icons/apple.svg'

import { Link, Head } from '@inertiajs/react';
import React from 'react'
import LauncherPlatformCard from '@/Components/LauncherPlatformCard';

import Alert from '@/Components/Alert';

export default class Launcher extends React.Component {
    

    constructor(props){
        super(props)
        this.state = { 
            pnotes: null,
            platforms: [
                {
                    icon: Windows, 
                    name: 'Windows', 
                    key: 'windows', 
                    vstotal: 'https://www.virustotal.com/gui/file-analysis/YTdjZWIyYTlkMjRkODA4YWNlMmZkYTEzNWIyZTQyNTY6MTY3NjI0NDA0Mw==', 
                    fake: false
                }, 
                {   
                    icon: Linux, 
                    name: 'Ubuntu (Linux)', 
                    key: 'ubuntu',
                    vstotal: '', 
                    fake: true
                }, 
                {
                    icon: Apple, 
                    name: 'Apple', 
                    key: 'apple', 
                    vstotal: '', 
                    fake: true
                }
            ]
        }

    }

    async componentDidMount(){
        for await (const [i, value] of this.state.platforms.entries()){
            if(!value.fake){
                const response = await axios.get(`https://download.frazionz.net/serverNodeJS/?branch=${value.key}`)
                this.state.platforms[i].datas = response.data
            }
        }

        let pnotes = await axios.get('https://api.frazionz.net/github/launcher')

        this.setState({ pnotes: pnotes.data })

        this.setState({ platforms: this.state.platforms })
    }

    
    title = "Rejoindre le Serveur"

    render(){
        return (
            <>
                <Head title={this.title} />
                <Layout props={this.props} title={this.title}>
                    <div className="flex flex-col gap-[30px]">
                        <div className="icon_title">
                            <img src={ CloudDL } alt="" />
                            <span>Télécharger le launcher</span>
                        </div>
                        {this.state.platforms.map((plm, i) => {
                            return <LauncherPlatformCard key={i} platform={plm} />
                        })}
                    </div>
                    <div className="flex flex-col gap-[16px] mt-[60px]">
                        <div className="icon_title">
                            <span>Un Problème avec le Launcher ?</span>
                        </div>
                        <Alert state="error">Contactez nous sur le serveur discord ! On trouvera sûrement le problème.</Alert>
                    </div>
                    <div className="flex flex-col gap-[30px] mt-[120px]">
                        <div className="icon_title">
                            <img src={ PNotes } alt="" />
                            <span>Y'a quoi de nouveau ?</span>
                        </div>
                        <div className="overflow-y-auto h-[40rem] px-4">
                            <LauncherPatchNotes pnotes={this.state.pnotes} />
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}
