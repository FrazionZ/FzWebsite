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
        this.setPageCategory = this.setPageCategory.bind(this)
        this.setLoading = this.setLoading.bind(this)
        this.funcParse = { setLoading: this.setLoading, setPageCategory: this.setPageCategory }
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
                            <Alert className="w-full" state="error" message="Les Candidatures sont temporairement désactivées." />
                        }
                        
                        {this.props.feature == true && 
                            <>
                                <div className="alert infos w-full">
                                    <span>
                                        Pour rejoindre notre équipe, merci de remplir le formulaire ci-dessous. <br />Merci de suivre un maximum les conditions pour postuler. 
                                        <br />Les conditions, et un exemple, sont présents sur <Link href="#">cette page.</Link>
                                    </span>
                                </div>
                                <Link href="#" className='btn'>Postuler Maintenant</Link>
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
                                        <Alert state="infos" message={category.info} />
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
                                                <CandidateComponentCard key={index} candid={candid} />   
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