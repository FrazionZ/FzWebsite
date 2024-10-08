import Language from "@/Components/Language";

import MarkdownIt from 'markdown-it'
import moment from 'moment-timezone'
import 'moment/locale/fr'
moment.locale('fr')

export default function LauncherPatchNotes(props) {

    const pnotes = props.pnotes
    const lang = new Language(props.Language)
    const md = new MarkdownIt();

    if (pnotes == null)
        return <>Veuillez patienter</>
    else {
        return (
            <ol className="relative mt-3 border-l border-gray-200 dark:border-gray-700">
                {pnotes.map((version, i) => {
                    return (
                        <li key={i} className="mb-10 ml-6">
                            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full ring-2 ring-gray-900 bg-[var(--color-2)]">
                                <svg aria-hidden="true" className="w-3 h-3" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </span>
                            <h3 className="flex items-center mb-1 text-lg text-white">
                                {version.name}
                                {i == 0 &&
                                    <span className=" bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                        Latest
                                    </span>
                                }
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                Publié le {lang.replaceMonth(moment(version.published_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                            </time>
                            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col gap-1" dangerouslySetInnerHTML={{ __html: md.render(version.body) }} />
                            </div>

                        </li>
                    )
                })}
            </ol>
        )
    }
}
