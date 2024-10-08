import Alert from "@/Components/Alert";
import { Link, usePage } from "@inertiajs/react";
import CardLoginExternal from "./LogExternal/CardLoginExternal";

import DiscodIcon from '../../../../assets/img/icons/network/discord'
import YoutubeIcon from '../../../../assets/img/icons/network/youtube'
import TwitchIcon from '../../../../assets/img/icons/network/twitch'
import { BsMicrosoft } from 'react-icons/bs'

export default function FrameLogExternal({ microsoft, discord, updateDiscord, twitch, updateTwitch }) {

    const logsExternal = [
        {
            icon: <DiscodIcon />,
            display: "Discord",
            details: (discord !== null) ? (discord !== undefined && discord?.result !== false) ? discord?.username : "Aucun compte lié" : "Recherche..",
            avatar: (discord !== null) ? discord?.avatar : undefined,
            isLink: (discord !== null && discord !== undefined && discord?.result !== false),
            loaded: (discord !== null),
            action: {
                link: route('social.discord.start'),
                unlink: route('social.discord.unlink')
            }
        },
        /*{
            icon: <YoutubeIcon />,
            display: "YouTube"
        },*/
        {
            icon: <TwitchIcon />,
            display: "Twitch",
            details: (twitch !== null) ? (twitch !== undefined) ? twitch?.iuser?.display_name : "Aucun compte lié" : "Recherche..",
            avatar: (twitch !== null) ? twitch?.iuser?.profile_image_url : undefined,
            isLink: (twitch !== null && twitch !== undefined && twitch?.result !== false),
            loaded: (twitch !== null),
            action: {
                link: route('social.twitch.start'),
                unlink: route('social.twitch.unlink')
            }
        },
        {
            icon: <BsMicrosoft />,
            display: "Microsoft",
            details: (microsoft == null) ? "Aucun compte lié" : microsoft?.profileName,
            avatar: undefined,
            isLink: (microsoft !== null),
            loaded: (microsoft !== null),
            action: {
                link: route('social.twitch.start'),
                unlink: route('social.twitch.unlink')
            }
        }
    ]

    return (
        <>
            <div className="logExternal">
                <span className="title">Comptes externes liés à FrazionZ</span>
                <CardLoginExternal updateData={updateDiscord} data={logsExternal[0]} />
                <CardLoginExternal updateData={updateTwitch} data={logsExternal[1]} />
                <CardLoginExternal updateData={updateTwitch} data={logsExternal[2]} />
            </div>
            <Alert state="infos" className="mt-6">
                Les connexions à vos comptes externes sont soumises aux règles de la politique de confidentialité de ces réseaux ainsi que <Link href="#">ceux de FrazionZ</Link>
            </Alert>
        </>
    )

}
