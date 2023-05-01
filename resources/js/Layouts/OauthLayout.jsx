import FzToastContainer from '@/Components/FzToastContainer'
import '../../css/app.css';
import '../../css/switch.css';
import Logo from '../../assets/img/logo.svg'

export default function Layout({ props, children }) {

    return (
        <>
            <div className="md:hidden flex flex-col justify-center h-screen items-center text-center mx-8 gap-5">
                <img src={Logo} alt="" width={120} />
                <h2 className='text-md'>La taille de cet écran n'est pour le moment pas adapté sur notre site, revenez ici plus tard ;) <br />
                <p className='mt-2'>- Signé, Bob</p></h2>
            </div>
            <div id="app" className='hidden md:flex md:justify-center md:items-center md:h-screen '>
                <img src={Logo} alt="logo" width={120} height={120} />
                {children}
                <FzToastContainer />
            </div>
        </>
        
    );
}
