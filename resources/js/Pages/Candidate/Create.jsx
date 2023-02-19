import Layout from '@/Layouts/Layout'
import React from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import FzToast from '@/Components/FzToast';
import CommentPen from '../../../assets/img/icons/comment-pen.svg'
import Alert from '@/Components/Alert';
import { Switch } from '@headlessui/react';
import MDEditor from '@uiw/react-md-editor';

export default function CandidateShow(props) {

    
    let title = `Candidature`
    let auth = props.auth

    const min = 15;
    const max = 90;
    
    
    const { data, setData, post, processing, errors } = useForm({
        age: min,
        rank: "helper",
        discordTag: '',
        public: true,
        present: '',
        _token: props.csrf_token
    })

    async function ageChange(){
        const value = Math.max(min, Math.min(max, Number(event.target.value)));
        setData('age', value);
    }
    
    async function submitCandidate(e) {
        e.preventDefault()
        post(route('candidate.handleCreate'), {
            preserveScroll: true,
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
                console.log(data)
            },
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (data) => {
                console.log(data)
                FzToast.flash(data)
            },
        });
    }

    return (
        <Layout title={title} props={props}>
            <Head title={title} />
            <form onSubmit={submitCandidate} className="flex flex-col gap-[120px]">
                <div className="flex flex-col gap-[30px]">
                    <div className="justify-start icon_title w-full">
                        <img src={CommentPen} alt="" />
                        <span>Candidater</span>
                    </div>
                    {props.feature == false && 
                        <Alert state="error" message="Les candidatures sont temporairement désactivées" />
                    }
                    {props.feature == true && 
                        <>
                            <div className="alert infos w-full">
                                <span>
                                    Pour rejoindre notre équipe, merci de remplir le formulaire ci-dessous. <br />Merci de suivre un maximum les conditions pour postuler. 
                                    <br />Les conditions, et un exemple, sont présents sur <Link href="#">cette page.</Link>
                                </span>
                            </div>
                            <div className="flex gap-8">
                                <div className="form-group w-1/6">
                                    <label>Votre âge</label>
                                    <input
                                        type="number"
                                        className='text-center'
                                        disabled={processing}
                                        value={data.age}
                                        onChange={ageChange}
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Rôle souhaité</label>
                                    <select name="rank" value={data.rank} disabled={processing} onChange={(e) => { setData('rank', e.target.value) }}>
                                        <option value="helper">Helper</option>
                                        <option value="michel">Michel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-8 w-full">
                                <div className="form-group w-full">
                                    <label>Votre Tag Discord</label>
                                    <input
                                        type="text"
                                        className='discord'
                                        disabled={processing} 
                                        value={data.discordTag}
                                        placeholder="SuberBob3000#9999"
                                        onChange={(e) => { setData('discordTag', e.target.value) }}
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Visibilité</label>
                                    <div className="flex items-center gap-6 h-full">
                                        <Switch
                                            checked={data.public}
                                            disabled={processing} 
                                            onChange={(e) => { setData('public', e) }}
                                            className={`${data.public ? '' : 'bg-[var(--fzbg-3)]'
                                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                                            >
                                            <span
                                                className={`${data.public ? 'translate-x-6' : 'translate-x-1'
                                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                />
                                        </Switch>
                                        <span className="text-base">Souhaitez-vous que votre candidature soit publique ?</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="flex flex-col gap-[30px]">
                    <div className="justify-start icon_title w-full">
                        <img src={CommentPen} alt="" />
                        <span>A toi de jouer !</span>
                    </div>
                    <MDEditor
                        value={data.present}
                        height={500}
                        disabled={processing}
                        onChange={(e) => { setData('present', e) }}
                    />
                </div>
                <div className="flex justify-center">
                    <button className='btn' type="submit" disabled={processing}>Envoyer la candidature</button>
                </div>
            </form>
        </Layout>
    );


}