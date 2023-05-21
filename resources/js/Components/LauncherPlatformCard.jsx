export default function LauncherPlatformCard({platform}) {

    
    if(platform.fake)
        return (
            <div className="card">
                <img src={platform.icon} alt="" />
                <div className="infos">
                    <div className="title">{platform.name}</div>
                    <div className="subtitle">N/A</div>
                </div>
            </div>
        );
    else {
        if(platform.datas !== undefined)
            return (
                <div className="card flex-col lg:justify-between lg:flex-row">
                    <div className="flex gap-6">
                        <img src={platform.icon} alt="" />
                        <div className="infos">
                            <div className="title">{platform.name}</div>
                            <div className="subtitle">
                                { parseInt(platform.datas.exe.size) } Mo - Dernière Mise à Jours le { platform.datas.date } - <a target="_blank" href={platform.vstotal}>Virus Total</a>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <a className="btn" href={platform.datas.exe.dl} download="Frazionz_Launcher">Download</a>
                    </div>
                </div>
            )
        else
            return (
                <div className="card">
                    <img src={platform.icon} alt="" />
                    <div className="infos">
                        <div className="title">{platform.name}</div>
                        <div className="subtitle">
                            Chargement
                        </div>
                    </div>
                </div>
            )
        
    }
}
