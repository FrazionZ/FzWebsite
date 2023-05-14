import React from "react";
import { usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";

export default function FrameInventory() {
    const props = usePage().props;
    const guild = props.guild;
    const guildProfile = props.guildProfile;
    const blasonDefault = "https://api.frazionz.net/blasonapi/";

    if (guildProfile == null) return <Alert state="infos">Vous devez vous connecter au serveur Faction au moins une fois pour visualiser cette page.</Alert>

    if (guildProfile?.faction_id == null) return <Alert state="infos">Vous devez créer une Faction pour visualiser cette page.</Alert>

    console.log("guild", guild)
    console.log("guildProfile", guildProfile)

    return (
        <div className="faction">
            <div className="column">
                <div className="title">Ma Faction</div>
                <div className="card">
                    <div className="flex gap-6 w-full justify-between">
                        <img src="https://api.frazionz.net/blasonapi/" alt="blason" width={64} />
                        <div className="info flex-1">
                            <div className="name">{guild.name}</div>
                            <div className="descr">{guild.description}</div>
                        </div>
                        <div className="ranked">
                            <div className="title">
                                Points de Classement
                            </div>
                            <div className="score">
                                N/A
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="title">Les Membres</div>
                <div className="grid grid-cols-2 gap-4">
                    {guild.members.map((member, i) => {
                        return (
                            <div key={i} className={`card guild_member ${member.faction_rank == 1 ? "leader" : ""}`}>
                                <div className="flex gap-6 w-full justify-between items-center">
                                    <img className="avatar" src={`https://api.frazionz.net/user/${member.user_id}/skin/head?s=32`} alt={`avatar_${member.user_id}`} />
                                    <div className="info flex-1">
                                        <div className="username">{member.udata.name}</div>
                                        <div className="userdata text-white"><span className="rank">{member.rank}</span> - Power: {member.power} / 20</div>
                                    </div>
                                </div>
                            </div> 
                        )
                    })}
                     
                </div>
            </div>
            <div className="column">
                <div className="title">Mon Alliance</div>
                <div className="card">
                    fff
                </div>
            </div>
            <div className="column">
                <div className="title">Membres de l'Alliance</div>
                <div className="card">
                    fff
                </div>
            </div>
        </div>
    );
}
