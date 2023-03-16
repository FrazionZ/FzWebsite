import React from 'react'
import BubbleInfos from '../../../../assets/img/icons/bubble_infos.svg'
import { usePage } from '@inertiajs/react'
import "../../../../css/items.css"
import Slots from './Slots';

export default function FrameInventory() {

    let inventory = usePage().props.factionProfile?.inventory
    let enderchest = usePage().props.factionProfile?.enderchest

    if (inventory == undefined)
        inventory = []

    let armor = [];
    let trophy = [];
    let slots = [];
    let bar = [];
    let enchest = [];

    for (var i = 39; i >= 36; i--)
        armor.push(inventory[i])

    for (var i = 40; i <= 43; i++)
        trophy.push(inventory[i])

    for (var i = 9; i <= 35; i++)
        slots.push(inventory[i])

    for (var i = 0; i <= 8; i++)
        bar.push(inventory[i])

    // @for ($i = 0; $i <= 26; $i++)
    for (var i = 0; i <= 26; i++)
        enchest.push(enderchest[i])

    return (
        <div className="containers-player">
            <div className='inventory'>
                <div className="icon_title">
                    <img src={BubbleInfos} alt="" />
                    <span>Mon Inventaire</span>
                </div>
                <div className="flex gap-[50px] overflow-auto xl:overflow-hidden">
                    <div className="flex gap-[10px]">
                        <div className="grid grid-row-4 gap-[10px]">
                            <Slots items={armor} />
                        </div>
                        <div className="grid grid-row-4 gap-[10px]">
                            <Slots items={trophy} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
                            <Slots items={slots} />
                        </div>
                        <div className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
                            <Slots items={bar} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory">
                <div className="icon_title">
                    <img src={BubbleInfos} alt="" />
                    <span>Mon Ender Chest</span>
                </div>
                <div className="flex justify-center gap-[50px] overflow-auto xl:overflow-hidden">
                    <div className="grid gap-[10px]" style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
                        <Slots items={enchest} />
                    </div>
                </div>
            </div>
        </div>
    )

}