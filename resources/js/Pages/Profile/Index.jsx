import React, { useState } from "react"
import Layout from "@/Layouts/Layout"
import { Link, Head } from '@inertiajs/react'
import Alert from "@/Components/Alert"
import ReactSkinview3d from 'react-skinview3d'
import Language from "@/Components/Language";
import { motion, AnimatePresence } from "framer-motion";

import BubbleInfos from '../../../assets/img/icons/bubble_infos.svg'
import Coins from '../../../assets/img/icons/coins.svg'
import Money from '../../../assets/img/icons/money.svg'
import Faction from '../../../assets/img/icons/faction.svg'
import Cogs from '../../../assets/img/icons/cogs.svg'

import MenuInventory from '../../../assets/img/icons/profile/inventory.jsx'
import MenuAppareance from '../../../assets/img/icons/profile/appareance.jsx'
import MenuSkills from '../../../assets/img/icons/profile/skills.jsx'
import MenuFaction from '../../../assets/img/icons/profile/factions.jsx'
import MenuSuccess from '../../../assets/img/icons/profile/success.jsx'
import MenuSettings from '../../../assets/img/icons/profile/settings.jsx'
import MenuLogExternal from '../../../assets/img/icons/profile/logexternal.jsx'

import FrameInventory from './Frame/Inventory'
import FrameAppareance from './Frame/Appareance'
import FrameSettings from './Frame/Settings'
import FrameLogExternal from './Frame/LogExternal'
import FrameGuild from './Frame/Guild'

import { FaDiscord, FaPencilAlt } from "react-icons/fa"
import FzToast from "@/Components/FzToast"

import moment from 'moment-timezone'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

import { WalkingAnimation } from 'skinview3d'

export default function ProfileIndex(props) {


    let title = "Profil"
    let status = props.status
    let mustVerifyEmail = props.mustVerifyEmail
    let TwoFA = props.auth.TwoFA
    let lang = new Language(props.language);
    let user = props.auth.user
    let factionUser = props.factionProfile
    let capeData = props.capeData
    const guild = props.guild;
    const guildProfile = props.guildProfile;
    const blasonDefault = "https://api.frazionz.net/blasonapi/";

    const [socialDiscordData, setSocialDiscordData] = useState(null)
    const [socialDiscordLoaded, setSocialDiscordLoaded] = useState(false)


    const [socialTwitchData, setSocialTwitchData] = useState(null)
    const [socialTwitchLoaded, setSocialTwitchLoaded] = useState(false)

    if (!socialDiscordLoaded)
        axios.get(route('social.discord.get'))
            .then((response) => {
                setSocialDiscordData(response.data)
                setSocialDiscordLoaded(true)
            })
            .catch((err) => {
                setSocialDiscordData(undefined)
                setSocialDiscordLoaded(true)
            })

    if (!socialTwitchLoaded)
        axios.get(route('social.twitch.get'))
            .then((response) => {
                setSocialTwitchData(response.data)
                setSocialTwitchLoaded(true)
            })
            .catch((err) => {
                setSocialTwitchData(undefined)
                setSocialTwitchLoaded(true)
            })

    const menu = [
        {
            icon: <MenuInventory className="icon" />,
            display: "Inventaire",
            component: <FrameInventory />
        },
        {
            icon: <MenuAppareance className="icon" />,
            display: "Apparence",
            component: <FrameAppareance />
        },
        {
            icon: <MenuSkills className="icon" />,
            display: "Skills",
            component: null
        },
        {
            icon: <MenuFaction className="icon" />,
            display: "Faction",
            component: <FrameGuild />
        },
        {
            icon: <MenuSuccess className="icon" />,
            display: "Succès",
            component: null
        },
        {
            icon: <MenuSettings className="icon" />,
            display: "Paramètres",
            component: <FrameSettings />
        },
        {
            icon: <MenuLogExternal className="icon" />,
            display: "Connexions Externe",
            component: <FrameLogExternal twitch={socialTwitchData} updateTwitch={setSocialTwitchData} discord={socialDiscordData} updateDiscord={setSocialDiscordData} />
        }
    ]
    const [playerObjectRotateY, setPlayerObjectRotateY] = useState(31.7)
    const [menuItemActive, setMenuItemActive] = useState((props.fastMenu !== null) ? props.fastMenu : 0)


    const switchComponentMenu = (index) => {
        setMenuItemActive(index)  
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?fastMenu='+index;
        window.history.pushState({path:newurl},'',newurl);
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col  gap-[60px]">
                {TwoFA === false && (
                    <Alert state="infos">
                        Tu peux activer la double authentification en allant <Link href="/2fa/register">ici</Link>
                    </Alert>
                )}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="flex justify-between items-center gap-[60px]">
                        <Alert state="warning">Tu dois valider ton adresse mail pour pouvoir jouer !</Alert>
                        <Link href={route('verification.send')} data={{ _token: props.csrf_token }} method="post" as="button" className="btn">Renvoyer un email</Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="profile">
                <div className="top flex-wrap xl:flex-nowrap">
                    <ReactSkinview3d
                        skinUrl={`https://api.frazionz.net/user/${user.uuid}/skin/display`}
                        capeUrl={`https://api.frazionz.net/capes/display/brut/${capeData.cape_id}`}
                        width="262"
                        height="442"
                        onReady={(ready) => {
                            ready.viewer.playerObject.rotation.y = playerObjectRotateY;
                            ready.viewer.controls.enableRotate = true;
                            ready.viewer.controls.enableZoom = false;
                            ready.viewer.controls.enablePan = false;
                            ready.viewer.animation = new WalkingAnimation();
                        }}
                    />
                    <div className="infos">
                        <div className="icon_title">
                            <img src={BubbleInfos} alt="" />
                            <span>Mes Informations</span>
                        </div>
                        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 w-full">
                            <div className="card">
                                <div className="flex justify-between items-center w-full">
                                    <div className="a_u flex gap-6 items-center">
                                        <img src={`https://api.frazionz.net/user/${user.uuid}/skin/head?s=32`} alt="avatar" />
                                        {user.name}
                                    </div>
                                    <div className="act">
                                        <Link href={route('profile.username')}><FaPencilAlt /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <FaDiscord fill={"var(--discord)"} />
                                {(socialDiscordData !== null) ? (socialDiscordData !== undefined) ? socialDiscordData?.username : "Aucun compte lié" : "Recherche.."}
                            </div>
                            <div className="card">
                                <img src={Coins} alt="coins" />
                                <div className="value">{factionUser?.money} <span className="text-[var(--text-inactive)]">Coins</span></div>
                            </div>
                            <div className="card">
                                <img src={Money} alt="money" />
                                <div className="value">{user.money} <span className="text-[var(--text-inactive)]">Points boutique</span></div>
                            </div>
                            <div className="card">
                                <img src={Faction} alt="faction" />
                                {guildProfile !== null && (
                                    <>
                                        {guildProfile.faction_id !== null && (
                                            <>{guild.name}</>
                                        )}
                                        {guildProfile.faction_id == null && (
                                            <>Aucune faction définis</>
                                        )}
                                    </>
                                )}
                                {guildProfile == null && (
                                    <>Aucune faction définis</>
                                )}
                            </div>
                            <div className="card">
                                <img src={Cogs} alt="cogs" />
                                Créé le {lang.replaceMonth(moment(user.created_at).local("fr").tz("Europe/Paris").format('D MMMM YYYY à HH:mm'))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="frame flex-wrap xl:flex-nowrap">
                    <div className="menu">
                        <div className="items">
                            <span className="title">Autres pages</span>
                            {menu.map((item, index) => {
                                return (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.87 }}
                                        onClick={() => { switchComponentMenu(index) }}
                                        className={`item ${(index == menuItemActive) ? "active" : ""}`}
                                    >
                                        {item.icon} {item.display}
                                    </motion.button>

                                )
                            })}
                        </div>
                    </div>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={menuItemActive ? menuItemActive.component : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="component"
                        >
                            {menu[menuItemActive].component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    )

}