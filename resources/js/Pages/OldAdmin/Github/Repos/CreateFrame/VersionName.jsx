import FzToast from "@/Components/FzToast"
import { usePage } from "@inertiajs/react"
import { TextInput } from "flowbite-react"
import { Button } from "flowbite-react"

export default function VersionName({ vn, handleNext }) {

    const vnHandleNext = () => {
        if(vn.versionName == "") return FzToast.error('Le numéro de version semble vide')
        let pattern = /^(\*|\d+(\.\d+){0,2}(\.\*)?)$/;
        if(!pattern.test(vn.versionName)) return FzToast.error('Le numéro de version semble invalide')
        handleNext()
    }

    return (
        <>
            <div className="flex gap-4 flex-col" id="branch_select">
                <div className="flex flex-col">
                    <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Numéro de la version</h6>
                    <i className="text-white">Ce numéro sera ajouter au tag final de la release</i>
                </div>
                <div className="flex gap-4">
                    <TextInput type="text" onChange={(e) => { vn.setVersionName(e.target.value) }} value={vn.versionName} />
                    <Button onClick={vnHandleNext} >Suivant</Button>
                </div>
            </div>
        </>
    )

}