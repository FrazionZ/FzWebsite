import React from 'react'

export default function LogExternal({ className }) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={ className } id="Filled" viewBox="0 0 24 24" width="512" height="512">
            <defs>
                <linearGradient id="gradientLExternal" gradientUnits="userSpaceOnUse" fy="90%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="white"/>
                </linearGradient>
            </defs>
            <path
                fill="url(#gradientLExternal)" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm3.222,7H8.778A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7Zm.8,2a10.211,10.211,0,0,1,.476,3,10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2,12a9.986,9.986,0,0,1,.461-3H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461A9.986,9.986,0,0,1,2,12Zm1.353,5H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm5.425,0h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm5.827,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM22,12a9.986,9.986,0,0,1-.461,3H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437A9.986,9.986,0,0,1,22,12ZM17.426,7a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7Z" />
        </svg>
    )
}