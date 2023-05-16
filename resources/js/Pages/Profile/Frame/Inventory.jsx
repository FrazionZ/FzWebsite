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

    if(enderchest == undefined)
        enderchest = []

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
        slots.push(inventory[i])

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
                <div className="flex flex-col lg:flex-row gap-[50px] items-center">
                    <div className="flex flex-col lg:flex-row gap-[10px]">
                        <div className="lg:hidden grid grid-cols-4 gap-[10px]">
                            <Slots items={armor} />
                        </div>
                        <div className="lg:hidden grid grid-cols-4 gap-[10px]">
                            <Slots items={trophy} />
                        </div>

                        <div className="hidden lg:grid grid-rows-4 gap-[10px]">
                            <Slots items={armor} />
                        </div>
                        <div className="hidden lg:grid grid-rows-4 gap-[10px]">
                            <Slots items={trophy} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 lg:grid-cols-[repeat(9,_1fr)] gap-[10px]">
                        <Slots items={slots} />
                    </div>
                </div>
            </div>
            <div className="inventory">
                <div className="icon_title">
                    <img src={BubbleInfos} alt="" />
                    <span>Mon Ender Chest</span>
                </div>
                <div className="flex justify-center gap-[50px] overflow-auto xl:overflow-hidden">
                    <div className="grid grid-cols-3 lg:grid-cols-[repeat(9,_1fr)] gap-[10px]">
                        <Slots items={enchest} />
                    </div>
                </div>
            </div>
        </div>
    )

}