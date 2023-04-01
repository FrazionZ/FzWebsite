import React, { useRef } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Badge from '@/Components/Badge';

export default function TwitchIndex(props) {

    const title = "Twitch"

    const embed = useRef(); // We use a ref instead of state to avoid rerenders.
    const channel = props?.userTwitch
    const handleReady = (e) => {
        embed.current = e;
    };

    
    const isLive = channel?.stream?.data?.length > 0 && channel?.stream?.data?.[0]?.type == "live"
    const streamTitle = channel?.stream?.data?.[0]?.title;

    return (
        <>
            <Head title={title} />
            <Layout props={props} title={title}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center mb-4 gap-4">
                        <img src={channel?.data?.profile_image_url} alt="" width="64px" style={{ borderRadius: "46px" }} className="avatar" />
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-bold'>{streamTitle !== undefined ? streamTitle : "Stream Offline"}</h1>
                            <h1 className='text-xl text-[var(--text-inactive)]'>{channel?.data?.display_name}</h1>
                        </div>
                    </div>
                    {isLive &&
                        <Badge state="error" message="Live" />
                    }
                </div>
                <TwitchEmbed channel={channel?.data?.login} autoplay withChat darkMode={true} width="100%" onVideoReady={handleReady} />
                <div className="flex gap-2 mt-4">
                    {channel?.stream?.data?.[0]?.tags?.map((tag, index) => {
                        return <Badge key={index} state="tag" message={"#" + tag} />
                    })}
                </div>
            </Layout>
            <style>{`
                #twitch-embed iframe {
                    border-radius: 8px;
                }
            `}  
            </style>
        </>
    )


}