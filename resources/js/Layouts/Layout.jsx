import { useState } from 'react';
import Navbar from '@/Components/Navbar'
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaTwitch } from 'react-icons/fa'
import FzToastContainer from '@/Components/FzToastContainer'
import '../../css/app.css';

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
                            <li><a href="https://discord.gg/sSf7NCs8Ap" target="_blank"><FaDiscord /></a></li>
                            <li><a href="https://twitter.com/frazionz/" target="_blank"><FaTwitter /></a></li>
                            <li><a href="https://www.instagram.com/frazionz/" target="_blank"><FaInstagram /></a></li>
                            <li><a href="https://www.youtube.com/" target="_blank"><FaYoutube /></a></li>
                            <li><a href="https://www.tiktok.com/@frazionz" target="_blank"><FaTiktok /></a></li>
                            <li><a href="https://www.twitch.tv/frazionz" target="_blank"><FaTwitch /></a></li>
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
