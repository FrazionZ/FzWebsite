import { useState } from 'react';
import Navbar from '@/Components/Navbar'
import { Link } from '@inertiajs/react';
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaTwitch } from 'react-icons/fa'
import FzToastContainer from '@/Components/FzToastContainer'
import '../../css/app.css';
import '../../css/switch.css';
import "../../css/editor.css";
import Logo from '../../assets/img/logo.svg'
import Discord from '../../assets/img/icons/network/discord'
import Insta from '../../assets/img/icons/network/insta'
import Tiktok from '../../assets/img/icons/network/tiktok'
import Twitter from '../../assets/img/icons/network/twitter'
import Twitch from '../../assets/img/icons/network/twitch'
import Youtube from '../../assets/img/icons/network/youtube'

export default function Layout({ props, mc, title, isHome, children }) {

    return (
        <>
            <div id="app" className='flex relative'>
                <Navbar auth={props.auth} mc={mc} title={title} isHome={isHome} navbar={props.navbar} />
                <div className={`content children ${(isHome) ? "home" : "other"} flex flex-col items-center gap-[90px]`}>
                    <div className="w-full lg:w-[1180px] pb-16">
                        {children}
                    </div>
                </div>
                <footer>
                    <div className="network">
                        <div className="title">Nos Réseaux</div>
                        <ul>
                            <li><a className="social" href="https://discord.frazionz.net/" target="_blank"><Discord /></a></li>
                            <li><a className="social" href="https://twitter.com/frazionz/" target="_blank"><Twitter /></a></li>
                            <li><a className="social" href="https://www.instagram.com/frazionz/" target="_blank"><Insta /></a></li>
                            <li><a className="social" href="https://www.youtube.com/" target="_blank"><Youtube /></a></li>
                            <li><a className="social" href="https://www.tiktok.com/@frazionz" target="_blank"><Tiktok /></a></li>
                            <li><a className="social" href="https://www.twitch.tv/frazionz" target="_blank"><Twitch /></a></li>
                        </ul>
                    </div>
                    <div className='separator' />
                    <div className="contact">
                        <div className="title">Nous Contacter</div>
                        <a href="mailto:contact@frazionz.net">contact@frazionz.net</a>
                    </div>
                    <div className='separator' />
                    <div className="credits">
                        <ul>
                            <li>2022 - Tous droits réservés</li>
                            <li><Link href="#">Politique de Confidentialités</Link></li>
                            <li><Link href="#">Mentions Légales</Link></li>
                            <li><Link href="#open_consent_cookies" id='open_consent_cookies'>Changer mes préférences de mes cookies</Link></li>
                            <li><Link href={route('page.display', {slug: 'contrat-generales-dutilisations-et-de-ventes'})}>CGU</Link></li>
                            <li><Link href={route('page.display', {slug: 'contrat-generales-dutilisations-et-de-ventes'})}>CGV</Link></li>
                        </ul>
                    </div>
                </footer>
                <FzToastContainer />
            </div>
        </>
        
    );
}
