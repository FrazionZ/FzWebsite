import React, { useRef } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import TwitchIcon from '../../../assets/img/icons/network/twitch'
import Badge from '@/Components/Badge';

export default function TwitchIndex(props) {

    const title = "Twitch"
    return (
        <>
            <Head title={title} />
            <Layout props={props} title={title}>
                <div className="profile">
                    <div className="logExternal">
                        {props?.channels?.map((channel, index) => {
                            
                            const isLive = channel?.stream?.data?.length > 0 && channel?.stream?.data?.[0]?.type == "live"
                            const isEligible = channel?.stream?.data?.[0]?.tags.includes('FrazionZ') && channel?.stream?.data?.[0]?.game_id == "27471"

                            if(channel?.stream?.data?.[0]?.tags.includes('FrazionZ') && channel?.stream?.data?.[0]?.game_id == "27471"){
                                return (
                                    <div key={index} className="card">
                                        <div className="head">
                                            <TwitchIcon />
                                            <img src={channel?.data?.profile_image_url} alt="" className="avatar" />
                                            <div className="flex flex-col">
                                                <div className="name" style={{ width: "fit-content" }}>
                                                    {channel?.stream?.data?.[0]?.title !== undefined ? channel?.stream?.data?.[0]?.title : "Aucun Titre"}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {channel?.data?.display_name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            {isLive && 
                                                <Badge state="error" message="Live" />
                                            }
                                            {!isLive &&
                                                <Badge state="warning" message="Offline" />
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            
                        })}
                    </div>
                </div>
                
            </Layout>
        </>
    )


}