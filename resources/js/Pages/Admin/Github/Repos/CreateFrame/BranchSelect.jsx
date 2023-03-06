import React from 'react'
import { usePage } from '@inertiajs/react'

export default function BranchSelect({ bs, handleNext }) {

    const repos = usePage().props.repos

    async function selectBranch(index) {
        bs.setBranchSelect(index)
        handleNext()
    }

    
    async function branchHandleNext() {
    }

    return (
        <>
            <div className="flex gap-4 flex-col" id="branch_select">
                <div className="flex flex-col">
                    <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Branche</h6>
                    <i className="text-white">Séléctionner la cible vers laquelle vous souhaitez publier la version</i>
                </div>
                <div className="flex gap-4">
                    {repos.branches.map((branch, index) => {
                        return (
                            <div key={index} className={`card w-60 branch_item ${(bs.branchSelect == index) ? "active" : ""}`} onClick={() => { selectBranch(index) }} data-branch-name={branch.name}>
                                <div className="card-body">
                                    {branch.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}