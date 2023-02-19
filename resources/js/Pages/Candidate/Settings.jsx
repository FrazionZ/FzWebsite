import { Dialog, Transition, Switch } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "@inertiajs/react";
import { FaTimes } from "react-icons/fa";

import Settings from '../../../assets/img/icons/settings.svg'

export default function CandidateSettings(props, {funcParse}) {

    console.log(props)

    const [isOpen, setIsOpen] = useState(false);

    let candid = props.candid

    let statesOptions = [
        {
            value: "0_0",
            display: "En attente"
        },
        {
            value: "1_0",
            display: "En cours de traitement"
        },
        {
            value: "2_0",
            display: "Traitée/Acceptée"
        },
        {
            value: "2_1",
            display: "Traitée/Refusée"
        },
    ]
    
    const { data, setData, patch, processing, errors } = useForm({
        cid: candid.id,
        state: `${candid.state}_${candid.substate}`,
        locked: (candid.locked) ? true : false,
        _token: props.csrf_token
    })

    function closeModal() {
        setIsOpen(false);
    }

    async function openModal() {
        await setIsOpen(true);
    }

    async function submitSettings(e) {
        e.preventDefault()
        patch(route('candidate.handleSettings'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (data) => {
                props.funcParse.reloadCandidature(data.props.categories)
                closeModal()
            },
            onError: () => {
                closeModal()
            },
        });
    }

    return (
        <>
            
            <button className="btn icon" onClick={openModal} style={{width: "95px !important"}}><img src={Settings} /></button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={ () => {}}
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur" aria-hidden="true" />
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="dialog inline-block w-9/12 transition-all p-10  text-white transform bg-[var(--fzbg-4)] shadow-xl rounded-2xl">
                                <div className="head">
                                    <h2 className="titleDialog">Paramètres de la candidature - #{candid.id} - {candid.upseudo}</h2>
                                    <span onClick={closeModal}><FaTimes /></span>
                                </div>
                                <form onSubmit={submitSettings} className="flex flex-col gap-5">
                                    <div className="flex gap-10">
                                        <div className="form-group w-full">
                                            <label>Etat de la candidature</label>
                                            <select disabled={processing} value={data.state} onChange={(e) => { setData('state', e.target.value) }}>
                                                {statesOptions.map((state, index) => {
                                                    return (
                                                        <option value={state.value} key={index}>{state.display}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group w-full items-center">
                                            <label>Verrouillage de la candidature</label>
                                            <div className="flex gap-5 items-center h-full">
                                                <Switch
                                                    checked={data.locked}
                                                    disabled={processing} 
                                                    onChange={(e) => { setData('locked', e) }}
                                                    className={`${data.locked ? '' : 'bg-[var(--fzbg-3)]'
                                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                    >
                                                    <span
                                                        className={`${data.locked ? 'translate-x-6' : 'translate-x-1'
                                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                        />
                                                </Switch>
                                                <span>Si activé, vous ne pourrez plus commenter la candidature.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn mt-5" disabled={processing}>Sauvegarder</button>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}