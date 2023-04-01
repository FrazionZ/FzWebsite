import Alert from "@/Components/Alert";
import { Link, usePage, useForm } from "@inertiajs/react";
import { Label, Radio } from "flowbite-react";
import { useState } from "react";

export default function FrameAppareance() {


    const props = usePage().props;
    const user = props.auth.user;
    const [typeSkin, setTypeSkin] = useState('steve')

    const { data, setData, post, processing, errors } = useForm({
        typeSkin: props.auth.user.isSlim,
        skinFile: null,
        _token: props.csrf_token
    })

    async function submitSkin(e) {
        e.preventDefault()
        post(route('profile.skin.update'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setData('skinFile', null)
            }
        })
    }

    return (
        <form onSubmit={submitSkin} className="flex flex-col gap-[32px]">
            <Alert state="infos">
                Une liste de Capes est diplonible sur cette <Link href={"#"}>page</Link>
            </Alert>
            <div className="appareance px-[102px] form-group">
                <legend>
                    Type de Skin
                </legend>
                <div className="flex">
                    <div className="radioGroup">
                        <input
                            className="h-4 w-4 border border-gray-300 w-[40px] h-[40px]"
                            type="radio"
                            id="type_steve"
                            name="typeSkin"
                            value="steve"
                            disabled={processing}
                            onChange={(e) => setData('typeSkin', e.target.value)}
                            checked={data.typeSkin == "steve"} />
                        <Label htmlFor="type_steve">Steve</Label>
                    </div>
                    <div className="radioGroup">
                        <input
                            className="h-4 w-4 border border-gray-300 w-[40px] h-[40px]"
                            type="radio"
                            id="type_alex"
                            name="typeSkin"
                            value="alex"
                            disabled={processing}
                            onChange={(e) => setData('typeSkin', e.target.value)}
                            checked={data.typeSkin == "alex"} />
                        <Label htmlFor="type_alex">Alex</Label>
                    </div>
                </div>
            </div>
            <div className="flex px-[102px] gap-[32px] items-center">
                <img src={`https://api.frazionz.net/user/${user.uuid}/skin/head?s=64`} style={{ width: "64px", height: "64px", borderRadius: "5px" }} alt="avatar" />
                <div className="form-group w-full">
                    <label htmlFor="skin">Skin</label>
                    <label className="file-upload" disabled={processing}>
                        <input disabled={processing} onChange={(e) => {
                            setData('skinFile', e.target.files[0])
                        }} type="file" className="profile-skin custom-file-input w-full" id="fileSkinInput" name="skin" accept=".png" />
                        <span>{data.skinFile !== null ? data.skinFile.name : "Clique pour choisir un fichier, ou drop ici"}</span>
                    </label>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" disabled={processing} className="btn flex justify-center">Sauvegarder</button>
            </div>
        </form>

    )

}