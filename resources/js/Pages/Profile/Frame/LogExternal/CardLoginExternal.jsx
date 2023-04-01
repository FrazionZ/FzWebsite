import { usePage, router } from "@inertiajs/react"

export default function CardLoginExternal({ data, updateData }){

    const props = usePage().props

    async function link(){
        router.get(data?.action?.link, {}, {
            preserveScroll: true
        })
    }

    async function unlink(){
        router.post(data?.action?.unlink, { _token: props.csrf_token }, {
            preserveScroll: true,
            onSuccess: (res) => {
                updateData(undefined)
            }
        })
    }

    return (
        <div className="card">
            <div className="head">
                {data?.icon} 
                {data.avatar !== undefined ? <img src={data.avatar} alt="" className="avatar" /> : "" }
                <div className="name">
                    { data?.display }
                </div>
                <div className="details">
                    { (data?.details !== undefined) ? data?.details : "Aucun compte lié" }
                </div>
            </div>
            <div className="actions">
                <button className="btn" disabled={!data?.loaded} onClick={(data?.isLink) ? unlink : link}>{(!data?.loaded) ? " - " : (data.isLink) ? "Délier" : "Lier"}</button>
            </div>
        </div>
    )

}