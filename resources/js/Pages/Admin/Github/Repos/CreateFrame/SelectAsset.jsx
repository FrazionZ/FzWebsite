import { usePage } from "@inertiajs/react"

export default function SelectAsset({ tas, handleNext }) {

    const subasset = usePage().props.subasset

    async function selectTypeAsset(index) {
        tas.setTypeAssetSelect(index)
        handleNext()
    }

    return (
        <>
            <div className="flex gap-4 flex-col" id="branch_select">
                <div className="flex flex-col">
                    <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Type de l'asset</h6>
                    <i className="text-white">Séléctionner le type l'asset correspondant à la release</i>
                </div>
                <div className="flex gap-4">
                    {subasset.map((asset, index) => {
                        return (
                            <div key={index} className={`card w-60 branch_item ${(tas.typeAssetSelect == index) ? "active" : ""}`} onClick={() => { selectTypeAsset(index) }}>
                                <div className="card-body">
                                    {asset}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>

    )

}