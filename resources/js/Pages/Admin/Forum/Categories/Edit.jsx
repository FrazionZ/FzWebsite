import { Head, Link, router, useForm } from "@inertiajs/react";
import ForumSubcategoryCard from '../SubCategories/SubcategoryCard'
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import moment from 'moment-timezone'
import { Draggable } from "react-drag-reorder";
import 'moment/locale/fr'  // without this line it didn't work
import { Label, TextInput, Button } from "flowbite-react";
moment.locale('fr')

export default function ForumCategoriesEdit(props) {

    const [category, setCategory] = useState(props.forumCategory);
    const [subcategories, setSubcategories] = useState(category.subcategories);
    const title = "Forum - Catégorie";

    
    async function getChangedPos(currentPos, newPos) {
        let subcategoriesPrepare = subcategories;
        subcategoriesPrepare = subcategoriesPrepare.swap(newPos, currentPos);
        subcategoriesPrepare[newPos].position = newPos;
        subcategoriesPrepare[currentPos].position = currentPos;
        setSubcategories(subcategoriesPrepare);
    }


    async function submitSubcategories(){
        console.log(subcategories)
        router.post(route('admin.forum.subcategories.swap'), {subcategories: subcategories, _token: props.csrf_token}, { 
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }

    const { data, setData, post, processing, errors } = useForm({
        id: category.id,
        name: category.name,
        _token: props.csrf_token
    });

    async function saveCategory(e){
        e.preventDefault()
        post(route('admin.forum.category.save'), {
            preserveState: true,
            resetOnSuccess: true,
            onFinish: (data) => {
            },
            onSuccess: (data) => {
                setCategory(data.props.forumCategory)
            },
            onError: (data) => {
            },
        });
    }

    return (
        <AdminLayout>
            <Head title={title} />

            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-10 dark:bg-gray-900">
                    <div className="col-span-1">
                        <form onSubmit={saveCategory}>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Nom de la catégorie"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="BobbyCategory"
                                value={data.name}
                                disabled={processing}
                                onChange={ (e) => { setData('name', e.target.value) }}
                                required={true}
                            />
                            <Button className="mt-3" disabled={processing} type="submit">Sauvegarder</Button>
                        </form>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center gap-5">
                        <h1 className="text-2xl text-white">Sous catégories</h1>
                        {true &&  
                             <Draggable onPosChange={getChangedPos}>
                                {subcategories.map((subcategory, index) => {
                                    return (
                                        <ForumSubcategoryCard key={index} subcategory={subcategory} />
                                    );
                                })} 
                            </Draggable>
                        }
                        <div className="flex justify-end">
                            <Button onClick={submitSubcategories}>Sauvegarder</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
