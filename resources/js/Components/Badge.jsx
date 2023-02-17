import React from "react";

export default function Badge({ state, message, className, styleBadge }) {


    return (
        <div className={`badge ${state} ${className}`} style={styleBadge}>
            <span>{message}</span>
        </div>
    );
}
