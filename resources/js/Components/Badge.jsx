import React from "react";

export default function Badge({ state, message, className, styleBadge, styleMessage }) {


    return (
        <div className={`badge ${state} ${className}`} style={styleBadge}>
            <span style={ styleMessage }>{message}</span>
        </div>
    );
}
