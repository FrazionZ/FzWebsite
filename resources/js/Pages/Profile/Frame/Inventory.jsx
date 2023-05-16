import React, { useState } from 'react'
import BubbleInfos from '../../../../assets/img/icons/bubble_infos.svg'
import { usePage } from '@inertiajs/react'
import "../../../../css/items.css"
import Slots from './Slots';
import { FaTimes } from 'react-icons/fa';

export default function FrameInventory() {

    let inventory = usePage().props.factionProfile?.inventory
    let enderchest = usePage().props.factionProfile?.enderchest

    const [tooltipMobileOpen, setTooltipMobileOpen] = useState(false)
    const [itemShowMobile, setItemShowMobile] = useState(null)

    if (inventory == undefined)
        inventory = []

    if (enderchest == undefined)
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
                            <Slots items={armor} setItemShowMobile={setItemShowMobile} tooltipMobileOpen={tooltipMobileOpen} setTooltipMobileOpen={setTooltipMobileOpen} />
                        </div>
                        <div className="lg:hidden grid grid-cols-4 gap-[10px]">
                            <Slots items={trophy} setItemShowMobile={setItemShowMobile} tooltipMobileOpen={tooltipMobileOpen} setTooltipMobileOpen={setTooltipMobileOpen} />
                        </div>

                        <div className="hidden lg:grid grid-rows-4 gap-[10px]">
                            <Slots items={armor} setItemShowMobile={setItemShowMobile} tooltipMobileOpen={tooltipMobileOpen} setTooltipMobileOpen={setTooltipMobileOpen} />
                        </div>
                        <div className="hidden lg:grid grid-rows-4 gap-[10px]">
                            <Slots items={trophy} setItemShowMobile={setItemShowMobile} tooltipMobileOpen={tooltipMobileOpen} setTooltipMobileOpen={setTooltipMobileOpen} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 lg:grid-cols-[repeat(9,_1fr)] gap-[10px]">
                        <Slots items={slots} setItemShowMobile={setItemShowMobile} tooltipMobileOpen={tooltipMobileOpen} setTooltipMobileOpen={setTooltipMobileOpen} />
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
            <div className={`tooltipMobile ${tooltipMobileOpen ? "open" : ""}`}>
                {itemShowMobile?.item?.item !== null &&
                    <>
                        <div className="head">
                            {itemShowMobile?.item.minecraftItemRealName}
                            <div className="close" onClick={() => setTooltipMobileOpen(false)}>
                                <FaTimes />
                            </div>
                        </div>
                        <div className={`content ${itemShowMobile?.hideContent ? "" : "hidden"}`}>
                            {itemShowMobile?.item?.itemMeta?.displayName !== undefined &&
                                <div className="column">
                                    <h2 className='text-2xl'>Nom</h2>
                                    <h4 className="text-gray">{itemShowMobile?.item?.itemMeta?.displayName}</h4>
                                </div>
                            }
                            {itemShowMobile?.item?.itemMeta?.lore !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Descr. de l'item (Lore)</h2>
                                    {itemShowMobile?.item?.itemMeta?.lore?.map((lore, index) => {
                                        return <h4 key={index} className="text-gray">{lore}</h4>
                                    })}
                                </div>
                            }
                            {itemShowMobile?.item?.skullMeta?.owningPlayer !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Player</h2>
                                    <h4 className="text-gray">{itemShowMobile?.item?.skullMeta?.owningPlayer}</h4>
                                </div>
                            }

                            {itemShowMobile?.item?.potionMeta !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Détails de la potion</h2>
                                    <h4 className="text-gray">{itemShowMobile?.item?.potionMeta?.displayName}</h4>
                                </div>
                            }
                            {itemShowMobile?.item?.storedEnchants !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Enchants</h2>
                                    {itemShowMobile?.item?.storedEnchants?.map((ench, i) => {
                                        return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                    })}
                                </div>
                            }

                            {itemShowMobile?.item?.itemMeta?.enchantments !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Enchants</h2>
                                    {itemShowMobile?.item?.itemMeta?.enchantments?.map((ench, i) => {
                                        return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                    })}
                                </div>
                            }

{itemShowMobile?.item?.itemMeta?.enchantments !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Enchants</h2>
                                    {itemShowMobile?.item?.itemMeta?.enchantments?.map((ench, i) => {
                                        return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                    })}
                                </div>
                            }

{itemShowMobile?.item?.itemMeta?.enchantments !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Enchants</h2>
                                    {itemShowMobile?.item?.itemMeta?.enchantments?.map((ench, i) => {
                                        return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                    })}
                                </div>
                            }

{itemShowMobile?.item?.itemMeta?.enchantments !== undefined &&
                                <div className="column">
                                    <h2 className='text-xl'>Enchants</h2>
                                    {itemShowMobile?.item?.itemMeta?.enchantments?.map((ench, i) => {
                                        return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                    })}
                                </div>
                            }

                            {itemShowMobile?.item?.maxDamage > 0 &&
                                <div className="column">
                                    <h2 className='text-xl'>Durabilité</h2>
                                    <h4 className="text-gray">{`${itemShowMobile?.item?.useDamage}/${itemShowMobile?.item?.maxDamage}`}</h4>
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )

}