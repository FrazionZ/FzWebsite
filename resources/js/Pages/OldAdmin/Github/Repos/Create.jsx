import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Language from "@/Components/Language";
import { Card } from "flowbite-react";
import Box from '@mui/material/Box';
import { Button } from 'flowbite-react'
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "../../../../../css/stepper.css"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { FaCheck, FaCloudDownloadAlt, FaCloudUploadAlt, FaCog, FaPencilAlt } from "react-icons/fa";

import BranchSelect from "./CreateFrame/BranchSelect";
import PatchNotes from "./CreateFrame/PatchNotes";
import Process from "./CreateFrame/Process"
import Recap from "./CreateFrame/Recap";
import SelectAsset from "./CreateFrame/SelectAsset";
import UploadAssset from "./CreateFrame/UploadAsset";
import VersionName from "./CreateFrame/VersionName";

export default function GithubCreate(props) {

    let title = "Github";
    const lang = new Language(props.language);

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [branchSelect, setBranchSelect] = useState()
    const [typeAssetSelect, setTypeAssetSelect] = useState()
    const [versionName, setVersionName] = useState("")
    const [filesAssets, setFilesAssets] = useState([]);

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'var(--gradient)',
                color: "#fff",
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: 'var(--gradient)',
                color: "#fff",
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            color: "#fff",
            backgroundColor: theme.palette.grey[800],
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.grey[700],
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage: 'var(--gradient)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage: 'var(--gradient)',
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <FaPencilAlt />,
            2: <FaPencilAlt />,
            3: <FaPencilAlt />,
            4: <FaCloudUploadAlt />,
            //5: <FaPencilAlt />,
            5: <FaCheck />,
            6: <FaCog />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    ColorlibStepIcon.propTypes = {
        active: PropTypes.bool,
        className: PropTypes.string,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    const handleNext = (callback) => {
        if (typeof callback == "function") {
            const data = callback()
            if (data.files !== undefined)
                setFilesAssets(data.files)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handlePrev = (callback) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const navigation = (index) => {
        setActiveStep(index)
    }

    useEffect(() => {
        
    }, [activeStep]);


    let stepsList = [
        {
            component: <BranchSelect bs={{ branchSelect: branchSelect, setBranchSelect: setBranchSelect }} handleNext={handleNext} />,
            label: 'Séléction de la branche cible',
            hideNext: true
        },
        {
            component: <SelectAsset tas={{ typeAssetSelect: typeAssetSelect, setTypeAssetSelect: setTypeAssetSelect }} handleNext={handleNext} />,
            label: 'Séléction du type de l\'asset'
        },
        {
            component: <VersionName vn={{ versionName: versionName, setVersionName: setVersionName }} handleNext={handleNext} />,
            label: 'Définition du nom de la version',
            hideNext: true
        },
        {
            component: <UploadAssset handleNext={handleNext} />,
            label: 'Upload de l\'asset',
            hideNext: true
        },
        /*{
            component: <PatchNotes />,
            label: 'Patch Note'
        },*/
        {
            component: <Recap navigation={setActiveStep} recapData={{ versionName: versionName, branchSelect: branchSelect, typeAssetSelect: typeAssetSelect, filesAssets: filesAssets }} handleNext={handleNext} />,
            label: 'Récapitulatif',
            hideNext: true
        },
        {
            component: <Process recapData={{ versionName: versionName, branchSelect: branchSelect, typeAssetSelect: typeAssetSelect, filesAssets: filesAssets }} handleNext={handleNext} />,
            label: 'Processus de création',
            hideNext: true,
            hidePrev: true
        }
    ];


    if (props.subasset == 0)
        stepsList = stepsList.filter((step, index) => index !== 1)

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="p-10 flex flex-col gap-12">
                <div className="infos">
                    <h1 className="mb-1 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{title}</h1>
                    <h3 className="text-base font-semibold text-gray-900 sm:text-base dark:text-white">Création d'une release</h3>
                </div>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {stepsList.map((step, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Card>
                    <React.Fragment>
                        {stepsList[activeStep].component}
                        <Box sx={{ display: 'flex', gap: "15px", flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {stepsList[activeStep].hidePrev !== true &&
                                <Button onClick={handlePrev} disabled={(activeStep == 0)}>Précedent</Button>
                            }
                            {stepsList[activeStep].hideNext !== true &&
                                <Button onClick={handleNext} disabled={(stepsList.length - 1 == activeStep)}>Suivant</Button>
                            }
                        </Box>
                    </React.Fragment>
                </Card>
            </div>
        </AdminLayout>
    );
}

