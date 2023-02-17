import Markdown from 'react-markdown'
import { FaStar } from 'react-icons/fa'

export default function LauncherPatchNotes({pnotes}) {

    
    if(pnotes == null)
        return <>Veuillez patienter</>
    else {
        return (
            pnotes.map((version, i) => {
                if (i == 0)
                    return (<div key={i}><div className="flex items-center text-2xl gap-2"><FaStar /><h2 className="text-gray">{version.tag_name}</h2></div><h3><Markdown>{version.body}</Markdown></h3><br /></div>)
                else
                    return (<div key={i}><h3 className="text-gray">{version.tag_name}</h3><h4><Markdown>{version.body}</Markdown></h4><br /></div>)
            })
        )
    }
}
