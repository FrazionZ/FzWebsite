import Layout from '@/Layouts/Layout'
import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import CandidateComponentCardComment from '@/Components/CandidateComponentCardComment'

import Comments from '../../../assets/img/icons/comments.svg'
import BubbleInfos from '../../../assets/img/icons/bubble_infos.svg'
import EnvoleOpen from '../../../assets/img/icons/envelope_open.svg'
import MDEditor from '@uiw/react-md-editor';

export default class CandidateShow extends React.Component {

    constructor(props){
        super(props)
        this.title = `Candidature`
        this.auth = props.auth
        this.category = props.category
        this.candidate = props.candidate
        this.comments = props.comments
        this.state = { comment: "", disabledForm: false }
        this.handleClick = this.handleClick.bind(this)
    }
    
    async handleClick() {
        this.setState({ disabledForm: true })
        router.post(route('candidate.comment'), { comment: this.state.comment })
    }

    render(){
        return (
            <Layout
                title={this.title}
                props={this.props}>

                <Head title={this.title} />

                <div className="flex flex-col gap-[120px]">
                    <div className="flex flex-col gap-[30px]">
                        <div className="justify-start icon_title w-full">
                            <img src={BubbleInfos} alt="" />
                            <span>Information</span>
                        </div>
                        <Alert state="infos" message={this.category.show} />
                        <div className="flex gap-8">
                            <div className='form-group w-1/2'>
                                <label>Pseudo</label>
                                <input type="text" disabled value={this.candidate.upseudo} />
                            </div>
                            <div className='form-group w-full'>
                                <label>Rôle souhaité</label>
                                <input type="text" disabled value={this.candidate.rank} />
                            </div>
                        </div>
                        {(this.auth.isAdmin == true || this.auth.user.id == this.candidate.uid) && 
                            <>
                                <div className="flex gap-8">
                                    <div className='form-group w-full'>
                                        <label>Tag Discord <span className="text-sm">*</span></label>
                                        <input type="text" disabled value={this.candidate.discordtag} />
                                    </div>
                                    <div className='form-group w-1/2'>
                                        <label>Âge <span className="text-sm">*</span></label>
                                        <input type="text" disabled value={this.candidate.age} />
                                    </div>
                                </div>
                                <span className='flex justify-end text-sm'>*Ces informations ne sont visibles que par vous et le Staff.</span>
                            </>
                        }
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <div className="justify-start icon_title w-full">
                            <img src={EnvoleOpen} alt="" />
                            <span>Présentation</span>
                        </div>
                        <div className="card ">
                            <div className="card-body overflow-y-auto max-h-[800px] pr-5" dangerouslySetInnerHTML={{ __html: this.candidate.present }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <div className="justify-start icon_title w-full">
                            <img src={Comments} alt="" />
                            <span>Commentaires</span>
                        </div>
                        {this.comments.map((comment, index) => {
                            return (
                                <CandidateComponentCardComment comment={comment} />
                            )
                        })}
                        {this.comments.length == 0 && 
                            (
                                <Alert state="infos" message="Aucun commentaire n'a été posté" />
                            )
                        }
                        {this.candidate.locked == true &&
                            (
                                <Alert state="error" message="Cette candidature est verrouillée, vous ne pouvez plus commenter" />
                            )
                        }
                        {this.candidate.locked == false &&
                            (
                                <>
                                    <div className="form-group">
                                        <label>Rédaction de votre commentaire</label>
                                        <textarea 
                                            className="h-9"
                                            disabled={this.state.disabledForm}
                                            onChange={(e) => { this.setState({ comment: e }) }}
                                        >{this.state.comment}</textarea>
                                    </div>
                                    <button onClick={this.handleClick} disabled={this.state.disabledForm} className="flex justify-center btn">
                                        Envoyer
                                    </button>
                                </>
                            )
                        }
                    </div>
                </div>

            </Layout>
        )
    }


}