import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import '../../css/dropdownProfile.css'



export default function DropdownProfile({ text, items, user }) {
  
  
  const itemVariants = {
      open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
      },
      closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  }

  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="dropdownProfile menu"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className={(isOpen) ? "isOpen" : ""}
      >
        <div className="user">
          <img src={`https://auth.frazionz.net/skins/face.php?u=${user.id}`} alt="" />
          <span className='hidden lg:block'>{ user.name }</span>
        </div>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
          className="hidden xl:block"
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
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
        style={{ pointerEvents: isOpen ? "auto" : "none", width: "16rem", right: "0rem" }}
      >
        {items.map((elem, i) => {
          if(elem.type == "hyperlink"){
            return (
              <a key={i} href={elem.value}>
                <motion.li variants={itemVariants}>{elem.name}</motion.li>
              </a>
            )
          }else if(elem.type == "inerlink"){
            return (
              <Link
                key={i}
                href={elem.value}
                method={(elem.method !== undefined) ? elem.method : "get"}
                as={elem?.as}
                >
                <motion.li variants={itemVariants}>{elem.name}</motion.li>
              </Link>
            )
          }
        })}
      </motion.ul>
    </motion.nav>
  )


}