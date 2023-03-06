import { usePage, router } from "@inertiajs/react"
import { Button, Alert, Badge } from "flowbite-react"
import { useState } from "react"
import { FaCheck, FaClock, FaCog, FaCogs, FaExclamationTriangle } from "react-icons/fa"
import Buffer from 'buffer'

export default function Recap({ recapData }) {

    const repos = usePage().props.repos
    const subasset = usePage().props.subasset
    const csrf_token = usePage().props.csrf_token

    let branchSelect = repos.branches[recapData.branchSelect]?.name
    let branchSplit = branchSelect.split("/")
    branchSplit.forEach((bs) => {
        bs = bs.charAt(0).toUpperCase() + bs.slice(1);
    })
    let branchFinal = branchSplit.join('-')
    let assetType = subasset[recapData?.typeAssetSelect]?.charAt(0).toUpperCase() + subasset[recapData?.typeAssetSelect]?.slice(1);
    let defAssetSelect = assetType + "_";
    let tagName = ((subasset[recapData?.typeAssetSelect] !== undefined) ? defAssetSelect : "") + recapData.versionName + "-" + branchFinal;

    //STEP BY STEP //0 = En attente, 1 = En cours, 2 = Terminée
    const [processLaunched, setProcessLaunched] = useState(false)
    const [createDraft, setCreateDraft] = useState(0)
    const [uploadFilesFrazionZ, setUploadFilesFrazionZ] = useState(0)
    const [uploadFilesGithub, setUploadFilesGithub] = useState(0)
    const [updateDraft, setUpdateDraft] = useState(0)
    const [filesUpload, setFilesUpload] = useState(recapData.filesAssets)
    const [stateFileCurrent, setStateFileCurrent] = useState({ file: null, percentage: 0 })

    const state = {
        0: {
            icon: FaClock,
            color: "info",
        },
        1: {
            icon: FaCogs,
            color: "warning",
        },
        2: {
            icon: FaCheck,
            color: "success",
        },
        3: {
            icon: FaExclamationTriangle,
            color: "failure",
        }
    }
    
    if(!processLaunched) {
        setProcessLaunched(true)
        setCreateDraft(1)
        axios.post(route('admin.github.repos.draft.create'), {
            id: repos.name,
            branch: branchSelect,
            tag: tagName,
            title: tagName,
            _token: csrf_token
        })
        .then(async function (response) {
            setCreateDraft(2)
            await storeAsset(response.data)
        })
        .catch(function (error) {
            console.log(error)
            setCreateDraft(3)
        });
    }

    async function storeAsset(data){
        let errors = [];
        setUploadFilesFrazionZ(1)
        for await (const [index, file] of filesUpload.entries()) {
            let upload = async(file) => {
                return new Promise((resolve, reject) => {
                    axios.post(route('admin.github.repos.draft.asset.store'), 
                    { 
                        repo_name: repos.name,
                        repo_release_id: data.data.id,
                        file: file,
                        _token: csrf_token
                    }, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: function(progressEvent) {
                            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                            let newArr = [...filesUpload]; // copying the old datas array
                            newArr[index]["percentage"] = percentCompleted; //key and value
                            setFilesUpload(newArr)
                        },
                    }).then((response) => { resolve() }).catch((error) => { resolve({ file: file, error: error}) });
                })
            }
            await upload(file)
        }
        setUploadFilesFrazionZ((errors.length > 0) ? 3 : 2)
        if(!(errors.length > 0))
            uploadAssetToGithub(data)
    }

    async function uploadAssetToGithub(data){
        setUploadFilesGithub(1)
        router.post(route('admin.github.repos.draft.asset.upload'), {
            _method: 'put',
            repo_name: repos.name,
            repo_release_id: data.data.id,
            files: recapData.filesAssets,
            _token: csrf_token
        }, {
            onSuccess: () => {
                setUploadFilesGithub(2)
                updateReleaseDraft(data)
            },
            onError: (error) => {
                setUploadFilesGithub(3)
            }
        })
    }

    async function updateReleaseDraft(data){
        setUpdateDraft(1)
        axios.post(route('admin.github.repos.draft.update'), {
            repo_name: repos.name,
            release_id: data.data.id,
            _token: csrf_token
        })
        .then(function (response) {
            setUpdateDraft(2)
            router.get(route('admin.github.repos.index', {id: repos.name}))
        })
        .catch(function (error) {
            setUpdateDraft(3)
        });
    }

    return (
        <div className="flex gap-4 flex-col" id="branch_select">
            <div className="flex flex-col">
                <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Processus de création en cours..</h6>
                <i className="text-white">Veuillez patienter pendant la création de la release, celà peut prendre du temps en fonction de votre connexion Internet</i>
            </div>
            <div className="processTable">
                <div className="action">
                    <span>Création du draft</span>
                    <Badge
                        className="w-fit"
                        color={state[createDraft].color}
                        icon={state[createDraft].icon}
                    />
                </div>
            </div>

            <div className="processTable">
                <div className="action">
                    <span>Stockage temporaire des fichiers sur nos serveurs</span>
                    <Badge
                        className="w-fit"
                        color={state[uploadFilesFrazionZ].color}
                        icon={state[uploadFilesFrazionZ].icon}
                    />
                </div>
                <div className="files">
                    {filesUpload.map((file, index) => {
                        return (
                            <div className="item" style={{ "--pt-file-percentage": file.percentage+"%" }}>
                                {file.name} - {file.percentage+"%"}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="processTable">
                <div className="action">
                    <span>Envoie des fichiers vers Github</span>
                    <Badge
                        className="w-fit"
                        color={state[uploadFilesGithub].color}
                        icon={state[uploadFilesGithub].icon}
                    />
                </div>
            </div>
            
            <div className="processTable">
                <div className="action">
                    <span>Mise à jour du Draft vers une Release</span>
                    <Badge
                        className="w-fit"
                        color={state[updateDraft].color}
                        icon={state[updateDraft].icon}
                    />
                </div>
            </div>
        </div>
    )

}