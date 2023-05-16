import { followCursor } from 'tippy.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

export default function Slots({ items, setItemShowMobile, tooltipMobileOpen, setTooltipMobileOpen }) {

    function tooltip(item) {
        let hideContent = false;
        if (item?.itemMeta !== undefined || item?.potionMeta !== undefined || item?.storedEnchants !== undefined || item?.skullMeta?.owningPlayer !== undefined || item?.maxDamage > 0)
            hideContent = true;

        return (
            <>
                <div className="tooltip">
                    <div className={`title flex gap-10 align-center ${(hideContent) ? "" : "hide-content"}`}>
                        <div className="column">
                            {item.minecraftItemRealName}
                        </div>
                    </div>
                    <div className={`content grid grid-cols-2 gap-6 ${(hideContent) ? "" : "hide-content"} `}>
                        {item?.itemMeta?.displayName !== undefined &&
                            <div className="column">
                                <h2 className='text-2xl'>Nom</h2>
                                <h4 className="text-gray">{item?.itemMeta?.displayName}</h4>
                            </div>
                        }
                        {item?.itemMeta?.lore !== undefined &&
                            <div className="column">
                                <h2 className='text-xl'>Descr. de l'item (Lore)</h2>
                                {item?.itemMeta?.lore?.map((lore, index) => {
                                    return <h4 key={index} className="text-gray">{lore}</h4>
                                })}
                            </div>
                        }
                        {item?.skullMeta?.owningPlayer !== undefined &&
                            <div className="column">
                                <h2 className='text-xl'>Player</h2>
                                <h4 className="text-gray">{item?.skullMeta?.owningPlayer}</h4>
                            </div>
                        }

                        {item?.potionMeta !== undefined &&
                            <div className="column">
                                <h2 className='text-xl'>Détails de la potion</h2>
                                <h4 className="text-gray">{item?.potionMeta?.displayName}</h4>
                            </div>
                        }
                        {item?.storedEnchants !== undefined &&
                            <div className="column">
                                <h2 className='text-xl'>Enchants</h2>
                                {item?.storedEnchants?.map((ench, i) => {
                                    return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                })}
                            </div>
                        }

                        {item?.itemMeta?.enchantments !== undefined &&
                            <div className="column">
                                <h2 className='text-xl'>Enchants</h2>
                                {item?.itemMeta?.enchantments?.map((ench, i) => {
                                    return <h4 key={i} className="text-gray">{ench?.displayName} {(ench?.level !== undefined) ? ench?.level : ""}</h4>
                                })}
                            </div>
                        }

                        {item?.maxDamage > 0 &&
                            <div className="column">
                                <h2 className='text-xl'>Durabilité</h2>
                                <h4 className="text-gray">{`${item?.useDamage}/${item?.maxDamage}`}</h4>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }

    function tooltipMobile(item) {
        let hideContent = false;
        if (item?.itemMeta !== undefined || item?.potionMeta !== undefined || item?.storedEnchants !== undefined || item?.skullMeta?.owningPlayer !== undefined || item?.maxDamage > 0)
            hideContent = true;
        setTooltipMobileOpen(true)
        setItemShowMobile({ hideContent: hideContent, item: item })
    }

    return (
        <>
            {[...items].map((item, i) => {
                if (item == undefined)
                    return <div key={i} className="item card"></div>
                else {
                    let itemClass = item.idItemNumber + '-' + item.itemData
                    let isEnchant = item?.storedEnchants !== undefined || item?.itemMeta?.enchantments !== undefined
                    let isPotion = item?.potionMeta !== undefined
                    let isSplash = false
                    let isDrink = false
                    let isArrow = false
                    let isLingering = false
                    if (isPotion) {
                        isSplash = item?.idItemNumber == 438;
                        isDrink = item?.idItemNumber == 373;
                        isArrow = item?.idItemNumber == 440;
                        isLingering = item?.idItemNumber == 441;
                    }
                    return (
                        <Tippy key={i} placement="right" onUntrigger={(e) => { e.unmount() }} render={attrs => (tooltip(item))} tabIndex="-1" >
                            <div key={i} onClick={() => { tooltipMobile(item) }} className="item card">
                                {isPotion == true && isSplash &&
                                    <span className="mcsprite mcsprite-potion"><span className="potion-color" style={{ backgroundColor: item?.potionMeta?.color }}></span> {item?.potionMeta?.hasEffect && <span className="mcsprite-potion-enchant"></span>} <span className="mcsprite-potion-bottle splash-bottle"></span></span>
                                }
                                {isPotion == true && isDrink &&
                                    <span className="mcsprite mcsprite-potion"><span className="potion-color" style={{ backgroundColor: item?.potionMeta?.color }}></span> {item?.potionMeta?.hasEffect && <span className="mcsprite-potion-enchant"></span>} <span className="mcsprite-potion-bottle"></span></span>
                                }
                                {isPotion == true && isArrow &&
                                    <span className="mcsprite mcsprite-potion-arrow" ><span className="potion-color" style={{ backgroundColor: item?.potionMeta?.color }}></span> <span className="mcsprite-potion-bottle arrow-bottle"></span></span>
                                }
                                {isPotion == true && isLingering &&
                                    <span className="mcsprite mcsprite-potion" ><span className="potion-color" style={{ backgroundColor: item?.potionMeta?.color }}></span> {item?.potionMeta?.hasEffect && <span className="mcsprite-potion-enchant"></span>} <span className="mcsprite-potion-bottle lingering-bottle"></span></span>
                                }
                                {isPotion == false &&
                                    <span className={`mcsprite mcpsrite-${itemClass} ${(isEnchant) ? "enchanted" : ""}`}></span>
                                }
                                <span className="amount">{ (item?.amount > 1) ? item?.amount : "" }</span>
                                
                            </div>
                        </Tippy>
                    )
                }
            })}
        </>
    )



}