import React from "react";
import { usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";

export default function FrameInventory() {
    const props = usePage().props;
    const guild = props.guild;
    const guildProfile = props.guildProfile;
    const blasonDefault = "https://api.frazionz.net/blasonapi/";

    return (
        <>
            {guildProfile !== null && (
                <>
                    {guildProfile.faction_id !== null && (
                        <div className="flex gap-8">
                            <img src={blasonDefault}  width={100} alt="blasonDefault" />
                            <h2 className="text-2xl">{guild.name}</h2>
                        </div>
                    )}
                    {guildProfile.faction_id == null && (
                        <Alert state="infos">Vous devez créer une Faction pour visualiser cette page.</Alert>
                    )}
                </>
            )}
            {guildProfile == null && (
                <Alert state="infos">Vous devez vous connecter au serveur Faction au moins une fois pour visualiser cette page.</Alert>
            )}
        </>
    );
}
