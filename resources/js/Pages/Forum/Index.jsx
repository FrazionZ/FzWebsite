import Layout from '@/Layouts/Layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CommentPen from '../../../assets/img/icons/comment-pen.svg'
import { motion } from 'framer-motion';
import { Spinner } from 'flowbite-react';
import '../../../css/forum.css'
import Alert from '@/Components/Alert';
import CardThread from './Components/CardThread';
import Paginate from '@/Components/Paginate'

export default function ForumIndex(props) {

    const title = "Forum"
    const user = props.auth.user
    const categories = props.categories
    const csrf_token = props.csrf_token

    const [selectCategory, setSelectCategory] = useState(0) //1 = ID in database
    const [selectSubcategory, setSelectSubcategory] = useState(0) //1 = ID in database
    const [allowedCreatedThread, setAllowedCreateThread] = useState(props.isAllowedCreateThread)
    const [threads, setThreads] = useState(props.threads.data)
    const [threadsPaginate, setThreadsPaginate] = useState(props.threads)

    console.log(props)

    const routeNamePagination = "forum.threads.paginate"
 
    async function requestThreads(category_index, subcategory_index, item, page) {
        setSelectCategory(category_index)
        setSelectSubcategory(subcategory_index)
        setAllowedCreateThread(item.isAllowedCreated)
        setThreads(null)
        setThreadsPaginate(null)
        axios.post(route(routeNamePagination), {
            parent_id: item.id,
            page: page,
            _token: props.csrf_token
        })
        .then((res) => {
            let resultPagination = res.data
            setThreads(resultPagination.data)
            setThreadsPaginate(resultPagination)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="forum">
                <div className="top">
                    <div className="justify-start icon_title w-full">
                        <img src={CommentPen} alt="" />
                        <span>Rédiger un Article</span>
                    </div>
                    <div className="card">
                        <button className='btn' disabled={!allowedCreatedThread} onClick={()=>{router.get(route('forum.thread.create.form', {sc_id: selectSubcategory}))}}>Nouvelle Discussion</button>
                        <div className="user">
                            <span>{user.name}</span>
                            <img src={`https://auth.frazionz.net/skins/face.php?u=${user.id}`} alt="" />
                        </div>
                    </div>
                </div>
                <div className="body flex-wrap 2xl:flex-nowrap">
                    <div className="menu w-full 2xl:w-fitcontent">
                        {categories.map((category, category_index) => {
                            return (
                                <div key={category_index} className="category">
                                    <div className="name">{category.name}</div>
                                    <div className="subcategory">
                                        {category.subcategories.map((item, index) => {
                                            return (
                                                <motion.button
                                                    key={index}
                                                    whileTap={{ scale: 0.87 }}
                                                    onClick={() => { requestThreads(category_index, index, item, 1) }}
                                                    className={`item ${(index == selectSubcategory && category_index == selectCategory) ? "active" : ""}`}
                                                >
                                                    {item.name}
                                                </motion.button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="threads">
                        {threads?.length <= 0 &&
                            <Alert state="warning">Aucun Threads n'est disponible dans cette catégorie</Alert>
                        }
                        {threads?.map((thread, index) => {
                            return (
                                <CardThread key={index} thread={thread} />
                            )
                        })}
                        <Paginate layout="bottom" labelType="Threads" routeName={routeNamePagination} pagination={threadsPaginate} parent_id={selectSubcategory} setList={setThreads} setPagination={setThreadsPaginate} />
                    </div>
                </div>
                {categories.length <= 0 &&
                    <Alert state="warning">Aucune catégories n'est disponible</Alert>
                }
            </div>
        </Layout>
    )


}