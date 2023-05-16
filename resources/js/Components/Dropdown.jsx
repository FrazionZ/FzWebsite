import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import '../../css/dropdown.css'

export default function Dropdown({ text, items, hideArrow, buttonClassName, styleButton, styleMenu }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const itemVariants = {
      open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
      },
      closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  }

  if(styleMenu == undefined)
    styleMenu = {pointerEvents: isOpen ? "auto" : "none"}
  else
    styleMenu.pointerEvents = isOpen ? "auto" : "none"

  

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="dropdownFz menu"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${(isOpen) ? "isOpen" : ""} ${buttonClassName}`}
        style={styleButton}
      >
        { text }
        {hideArrow !== true && <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div> }
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={styleMenu}
        className={isOpen ? "open" : "close"}
      >
        {items.map((elem, i) => {
            return (
              <Link
                key={i}
                href={elem.value}
                data={elem?.data}
                method={(elem.method !== undefined) ? elem.method : "get"}
                >
                <motion.li variants={itemVariants}>{elem.name}</motion.li>
              </Link>
            )
          })}
      </motion.ul>
    </motion.div>
  )


}