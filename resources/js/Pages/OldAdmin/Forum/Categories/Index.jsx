import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";
import ForumCategoryCard  from './CategoryCard'
import { Draggable } from "react-drag-reorder";
import { Button } from "flowbite-react";
import { useState } from "react";
import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default function ForumCategoriesIndex(props) {

    let title = "Forum - Catégories";
    const lang = new Language(props.language);
    let perms = props.auth.permissions;
    const logger = props.logger;
    const [categories, setCategories] = useState(props.forumCategories);

    
    async function getChangedPos(currentPos, newPos) {
        let categoriesPrepare = roles;
        categoriesPrepare = categoriesPrepare.swap(newPos, currentPos);
        categoriesPrepare[newPos].position = newPos;
        categoriesPrepare[currentPos].position = currentPos;
        setRoles(categoriesPrepare);
    }


    async function submitCategories(){
        router.post(route('admin.forum.categories.swap'), {categories: categories, _token: props.csrf_token}, { 
            onSuccess: (data) => {
            }
        })
    }

    return (
        <AdminLayout>
            <Head title={title} />
            
            <div className="p-10">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-10 dark:bg-gray-900">
                    <div className="col-span-1">
                        {true &&  
                             <Draggable onPosChange={getChangedPos}>
                                {categories.map((category, index) => {
                                    return (
                                        <ForumCategoryCard key={index} category={category} />
                                    );
                                })} 
                            </Draggable>
                        }
                        <div className="flex justify-end">
                            <Button onClick={submitCategories}>Sauvegarder</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
