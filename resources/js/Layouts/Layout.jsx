import { useState } from 'react';
import Navbar from '@/Components/Navbar'
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaTwitch } from 'react-icons/fa'
import FzToastContainer from '@/Components/FzToastContainer'
import '../../css/app.css';

import Discord from '../../assets/img/icons/network/discord'
import Insta from '../../assets/img/icons/network/insta'
import Tiktok from '../../assets/img/icons/network/tiktok'
import Twitter from '../../assets/img/icons/network/twitter'
import Twitch from '../../assets/img/icons/network/twitch'
import Youtube from '../../assets/img/icons/network/youtube'

export default function Layout({ props, mc, title, isHome, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false); 

    return (
        <div id="app">
            <Navbar auth={props.auth} mc={mc} title={title} isHome={isHome} navbar={props.navbar} />
            <div className={`content ${(isHome) ? "home" : "other"} flex flex-col gap-[90px]`}>
                <div className="mx-[380px] pb-16">
                    {children}
                </div>
                <footer>
                    <div className="network">
                        <div className="title">Nos Réseaux</div>
                        <ul>
                            <li><a className="social" href="https://discord.gg/sSf7NCs8Ap" target="_blank"><Discord /></a></li>
                            <li><a className="social" href="https://twitter.com/frazionz/" target="_blank"><Twitter /></a></li>
                            <li><a className="social" href="https://www.instagram.com/frazionz/" target="_blank"><Insta /></a></li>
                            <li><a className="social" href="https://www.youtube.com/" target="_blank"><Youtube /></a></li>
                            <li><a className="social" href="https://www.tiktok.com/@frazionz" target="_blank"><Tiktok /></a></li>
                            <li><a className="social" href="https://www.twitch.tv/frazionz" target="_blank"><Twitch /></a></li>
                        </ul>
                    </div>
                    <div className="contact">
                        <div className="title">Nous Contacter</div>
                        <a href="mailto:contact@frazionz.net">contact@frazionz.net</a>
                    </div>
                    <div className="credits">
                        <ul>
                            <li>2022 - Tous droits réservés</li>
                            <li><a href="#">Politique de Confidentialités</a></li>
                            <li><a href="#">Mentions Légales</a></li>
                            <li><a href="#">CGU/CGV</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
            <FzToastContainer />
        </div>
    );
}
