import Layout from '@/Layouts/Layout'
import React from 'react'
import { Head, Link } from '@inertiajs/react'
import CandidateComponentCard from '@/Components/CandidateComponentCardItem'
import CandidateComponentPaginate from '@/Components/CandidateComponentPaginate'
import { Spinner } from 'flowbite-react'
import Pnotes from '../../../assets/img/icons/pnotes.svg'
import Clock from '../../../assets/img/icons/clock.svg'
import ClockFast from '../../../assets/img/icons/time_fast.svg'
import CommentPen from '../../../assets/img/icons/comment-pen.svg'
import Alert from '@/Components/Alert'

export default class CandidateIndex extends React.Component {


    constructor(props){
        super(props)
        this.title = "Rejoindre notre équipe"
        for (const [i, category] of this.props.categories.entries()){
            switch(i){
                case 0:
                    category.icon = Clock;
                    category.load = false;
                    break;
                case 1:
                    category.icon = ClockFast;
                    category.load = false;
                    break;
                case 2:
                    category.icon = Pnotes;
                    category.load = false;
                    break;
            }
        }
        this.state = { categories: this.props.categories }
        this.reloadCandidature = this.reloadCandidature.bind(this)
        this.setPageCategory = this.setPageCategory.bind(this)
        this.setLoading = this.setLoading.bind(this)
        this.funcParse = { setLoading: this.setLoading, reloadCandidature: this.reloadCandidature, setPageCategory: this.setPageCategory }
    }

    async initCategory(newData) {
        for await (const [i, category] of newData.entries()){
            switch(i){
                case 0:
                    category.icon = Clock;
                    category.load = false;
                    break;
                case 1:
                    category.icon = ClockFast;
                    category.load = false;
                    break;
                case 2:
                    category.icon = Pnotes;
                    category.load = false;
                    break;
            }
        }
        return newData;
    }

    async setLoading(i, bool){
        let categories = this.state.categories;
        let category = categories[i];
        category.load = bool;
        return new Promise((resolve, reject) => {
            this.setState({ categories: categories }, resolve())
        })
    }

    async setPageCategory(i, newData){
        let categories = this.state.categories;
        let category = categories[i];
        category.candids = newData;
        this.setState({ categories: categories })
    }

    async reloadCandidature(categories){
        let newCategories = await this.initCategory(categories)
        this.setState({ categories: newCategories })
    }

    render(){
        return (
            <Layout
                title={this.title}
                props={this.props}>

                <Head title={this.title} />
                
                <div className="flex flex-col gap-[120px]">
                    <div className="flex gap-[30px] flex-col items-center">
                        <div className="justify-start icon_title w-full">
                            <img src={CommentPen} alt="" />
                            <span>Candidater</span>
                        </div>
                        {this.props.feature == false && 
                            <Alert className="w-full" state="error">Les Candidatures sont temporairement désactivées.</Alert>
                        }
                        {this.props.feature == true && this.props.candidCooldown == true && 
                            <Alert className="w-full" state="error">Votre précédente candidature a été traitée. Vous devez attendre 30 jours avant de postuler à nouveau</Alert>
                        }
                        {this.props.feature == true && this.props.candidAlreadyPost == true && 
                            <Alert className="w-full" state="error">Vous avez déjà envoyé une candidature, vous ne pouvez plus en poster pour le moment.</Alert>
                        }
                        {this.props.feature == true && this.props.candidAlreadyPost == false && this.props.candidCooldown == false && 
                            <>
                                <Alert state="infos" className="w-full">
                                    <span>
                                        Pour rejoindre notre équipe, merci de remplir le formulaire ci-dessous. Merci de suivre un maximum les conditions pour postuler. 
                                        <br />Les conditions, et un exemple, sont présents sur <Link href="#">cette page.</Link>
                                    </span>
                                </Alert>
                                <Link href={ route('candidate.create') } className='btn'>Postuler Maintenant</Link>
                            </>
                        }
                    </div>
                    <div className="flex gap-[60px] flex-col">
                        { this.state.categories.map((category, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-[30px]">
                                    <div className="icon_title">
                                        <img src={category.icon} alt="" />
                                        <span>{category.display}</span>
                                    </div>
                                    <div className="column flex flex-col gap-[24px]">
                                        <Alert state="infos">{category.info}</Alert>
                                        {category.load == true && 
                                            <>
                                                <div className="flex justify-center items-center gap-5 py-20">
                                                    <Spinner aria-label="Center-aligned spinner example" />
                                                    <span className='text-xl'>Chargement</span>
                                                </div>
                                            </>
                                        }
                                        {category.load == false && category.candids.data.map((candid, index) => {
                                            return(
                                                <CandidateComponentCard funcParse={ this.funcParse } key={index} canManage={this.props.canManageCandidate} candid={candid} />   
                                            )
                                        })}
                                        <CandidateComponentPaginate funcParse={ this.funcParse } category={category} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </Layout>
        )
    }


}