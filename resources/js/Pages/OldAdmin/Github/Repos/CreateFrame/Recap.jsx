import FzToast from "@/Components/FzToast"
import { usePage } from "@inertiajs/react"
import axios from "axios"
import { Button } from "flowbite-react"
import { useState, useEffect } from "react"
export default function Recap({ navigation, recapData, handleNext }) {

    const repos = usePage().props.repos
    const subasset = usePage().props.subasset

    const navigateStep = (index) => {
        navigation(index)
    }

    let branchSelect = repos.branches[recapData.branchSelect]?.name
    let branchSplit = branchSelect.split("/")
    branchSplit.forEach((bs) => {
        bs = bs.charAt(0).toUpperCase() + bs.slice(1);
    })
    let branchFinal = branchSplit.join('-')
    let assetType = subasset[recapData?.typeAssetSelect]?.charAt(0).toUpperCase() + subasset[recapData?.typeAssetSelect]?.slice(1);
    let defAssetSelect = assetType+"_";
    let tagName = ((subasset[recapData?.typeAssetSelect] !== undefined) ? defAssetSelect : "")+recapData.versionName+"-"+branchFinal;

    const [tagValid, setTagValid] = useState(true)
    const [allChecked, setAllChecked] = useState(0)
    


    useEffect(() => {
        axios.get(route('admin.github.repos.tag.check', {id: repos.name, tag: tagName}))
            .then((response) => {

                if(response.data.id !== undefined && typeof response.data.id == 'number')
                    setTagValid(false)

                setAllChecked(true)

            })
    }, [tagValid])

    const datas = [
        {
            key: "Branche sélectionné",
            value: branchSelect,
            checked: true,
            link: 0
        },
        {
            key: "Type d'asset sélectionné",
            value: (typeof assetType == "string") ? assetType : "N/A",
            checked: true,
            link: 1
        },
        {
            key: "Tag final",
            value: tagName,
            checked: tagValid,
            link: 1
        },
        {
            key: "Numéro de la version",
            value: recapData.versionName,
            checked: true,
            link: 1
        }
    ]

    const processHandleNext = () => {
        const checked = datas.find(data => data.checked === false)
        if(checked !== undefined) return FzToast.error('Impossible de créer une release, l\'une des valeurs est invalide !')
        handleNext()
    }

    return (
        <div className="flex gap-4 flex-col" id="branch_select">
            <div className="flex flex-col">
                <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Récapitulatif de la Release</h6>
                <i className="text-white">Vérifier les infos avant la création de la release</i>
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {datas.map((data, index) => {
                        return (
                            <tr key={index} className={` ${(!data.checked) ? "dark:hover:bg-red-900 dark:bg-red-900" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-transparent"}`}>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.key}</td>
                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.value}
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">Fichier(s) à upload</td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <ul>
                                {recapData.filesAssets.map((file, index) => {
                                    return <li key={index}>{file.name}</li>
                                })}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <Button disabled={(!allChecked)} className="w-1/5" onClick={processHandleNext} >{allChecked == false ? "Vérification en cours" : "Créer la release"}</Button>
        </div>
    )

}