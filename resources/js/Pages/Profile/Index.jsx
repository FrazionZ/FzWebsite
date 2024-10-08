import React, { useState, useRef } from "react"
import Layout from "@/Layouts/Layout"
import { Link, Head } from '@inertiajs/react'
import Alert from "@/Components/Alert"
import ReactSkinview3d from 'react-skinview3d'
import Language from "@/Components/Language";
import { motion, AnimatePresence } from "framer-motion";
import * as minecraftAuth from "minecraft-auth";
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
import MenuBank from '../../../assets/img/icons/profile/bank.jsx'
import MenuSettings from '../../../assets/img/icons/profile/settings.jsx'
import MenuLogExternal from '../../../assets/img/icons/profile/logexternal.jsx'

import FrameInventory from './Frame/Inventory'
import FrameAppareance from './Frame/Appareance'
import FrameHistoryStore from './Frame/HistoryStore'
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
    let microsoft = props.auth.msa
    let mustVerifyEmail = props.mustVerifyEmail
    let TwoFA = props.auth.TwoFA
    let lang = new Language(props.language);
    let user = props.auth.user
    let factionUser = props.factionProfile
    let capeData = props.capeData

    const pcodeEnabled = props.pcodeEnabled
    const guild = props.guild;
    const guildProfile = props.guildProfile;
    const blasonDefault = "https://api.frazionz.net/blasonapi/";

    const [socialDiscordData, setSocialDiscordData] = useState(null)
    const [socialDiscordLoaded, setSocialDiscordLoaded] = useState(false)


    const [socialTwitchData, setSocialTwitchData] = useState(null)
    const [socialTwitchLoaded, setSocialTwitchLoaded] = useState(false)

    const [rotateSkin, setRotateSkin] = useState(window.screen.width >= 768)

    const MicrosoftAuth = minecraftAuth.MicrosoftAuth;


    const webview = useRef(null);

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
            icon: <MenuBank className="icon" />,
            display: "Historique des transactions",
            component: <FrameHistoryStore />
        },
        {
            icon: <MenuSettings className="icon" />,
            display: "Paramètres",
            component: <FrameSettings />
        },
        {
            icon: <MenuLogExternal className="icon" />,
            display: "Connexions Externe",
            component: <FrameLogExternal microsoft={microsoft} twitch={socialTwitchData} updateTwitch={setSocialTwitchData} discord={socialDiscordData} updateDiscord={setSocialDiscordData} />
        }
    ]
    const [playerObjectRotateY, setPlayerObjectRotateY] = useState(31.7)
    const [menuItemActive, setMenuItemActive] = useState((props.fastMenu !== null) ? props.fastMenu : 0)

    const skinMsa = props.auth.msa?.textures?.SKIN?.url
    const capeMsa = props.auth.msa?.textures?.CAPE?.url


    const switchComponentMenu = (index) => {
        setMenuItemActive(index)
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?fastMenu=' + index;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="flex flex-col gap-[60px]">
                {TwoFA === false && (
                    <Alert state="infos">
                        Tu peux activer la double authentification en allant <Link href="/2fa/register">ici</Link>
                    </Alert>
                )}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="flex lg:justify-between lg:items-center flex-col gap-6 lg:flex-row lg:gap-[60px]">
                        <Alert state="warning" className="flex-1">Tu dois valider ton adresse mail pour pouvoir jouer !</Alert>
                        <Link href={route('verification.send')} data={{ _token: props.csrf_token }} method="post" as="button" className="btn">Renvoyer un email</Link>

                        {status === 'verification-link-sent' && FzToast.success('Un mail vous a été envoyée à l\'instant')}
                    </div>
                )}
                {microsoft != null &&
                    <div className="profile">
                        <div className="top flex-col lg:flex-row">
                            <ReactSkinview3d
                                skinUrl={`${skinMsa}`}
                                capeUrl={`${capeMsa}`}
                                width="262"
                                height="442"
                                options={{ enableControls: rotateSkin, backEquipment: "elytra"}}
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
                                                <img src={`https://minotar.net/helm/${ microsoft != null ? microsoft?.profileId : "steve" }/600.png`} alt="avatar" />
                                                { microsoft != null ? microsoft?.profileName : "Visiteur" }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <FaDiscord fill={"var(--discord)"} />
                                        {(socialDiscordData !== null) ? (socialDiscordData !== undefined && socialDiscordData?.result !== false) ? socialDiscordData?.username : "Aucun compte lié" : "Recherche.."}
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
                        <div className="frame flex-col lg:flex-row">
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
                }
                {microsoft == null &&
                    <>
                        <Alert state="infos">
                            Pour pouvoir accéder à cette page, ainsi qu'au serveur, vous devez impérativement lier votre compte Microsoft avec FrazionZ.
                        </Alert>
                        <a className="btn" href={ route('social.msa.start') }>Lier mon compte Microsoft</a>
                    </>
                }
            </div>

        </Layout>
    )

}
