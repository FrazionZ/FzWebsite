import FzToast from "@/Components/FzToast";
import { Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaTimes } from "react-icons/fa";

const fileTypes = ["jar", "asar", "exe"];

export default function UploadAsset({ handleNext }) {

    const [files, setFiles] = useState([]);

    const handleChange = (file) => {
        let copyFiles = files;
        file.percentage = 0
        copyFiles.push(file)
        setFiles(prevFiles => ([...copyFiles]));
    };

    const deleteFileUpload = (index) => {
        let copyFiles = files.filter((file, fix) => fix !== index)
        setFiles(prevFiles => ([...copyFiles]));
    }

    const uploadHandleNext = () => {
        if(files.length <= 0) return FzToast.error('Vous devez choisir au moins un fichier')
        handleNext(() => {
            return { files: files }
        })
    }

    return (
        <div className="flex gap-4 flex-col" id="branch_select">
            <div className="flex flex-col">
                <h6 className="text-base text-[#fff]" style={{ fontWeight: "600" }}>Upload des fichiers</h6>
                <i className="text-white">Séléctionner les fichiers présent dans la future Release</i>
            </div>
            <div className="flex flex-col gap-4 w-1/3">
                <FileUploader hoverTitle="Déposez ici" className="w-full" label="Cliquer ou glisser et déposer un fichier dans cette zone" handleChange={handleChange} name="file" types={fileTypes} />
                <div className="flex flex-col gap-2">
                    {files.map((file, index) => {
                        return (
                            <li key={index} className="flex items-center justify-between text-white font-semibold">
                                <span>{file.name}</span>
                                <Button size="sm" onClick={ () => { deleteFileUpload(index) }}><FaTimes /></Button>
                            </li>
                        )
                    })}
                </div>
                
                <Button onClick={uploadHandleNext} >Suivant</Button>
            </div>
        </div>
    )

}