import { motion, AnimatePresence } from "framer-motion"
import React from 'react'
import { router } from "@inertiajs/react"

export default class ValueCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
        this.title = props.title
        this.value = props.value
        this.callSave = props.callSave
        this.icon = props.icon
        this.link = props.href
    }

    async formSubmitPut(){
        let hasSubmit = false;
        Object.entries(this.props.data).map((data) => {
            if(data[0] !== "_token" && data[1] !== ""){
                hasSubmit = true;
                return;
            }
        })
        if(hasSubmit)
            router.put(this.props.url, this.props.data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload()
                }
            })
    }

    render() {
        return (
            <div className={`card`} >
                <div className="head">
                    <div className="infos">
                        {typeof this.icon == "string" && <img src={this.icon} width="32" height="32" alt="" /> }
                        {typeof this.icon == "object" && this.icon }
                        <span>{this.title}</span>
                        <span className="text-[var(--text-inactive)]">{this.value}</span>
                    </div>
                    <div className="actions">
                        <motion.button whileTap={{ scale: 0.97 }} className="btn" onClick={() => { 
                                if(this.link !== undefined)
                                    router.get(this.link)
                                else {
                                    if(this.state.isOpen && this.props.method == "put")
                                        this.formSubmitPut();
                                    this.setState({ isOpen: !this.state.isOpen }) 
                                }
                            }
                            }>{this.state.isOpen ? "Sauvegarder" : "Modifier"}</motion.button>
                    </div>
                </div>
                <AnimatePresence initial={false}>
                    {this.state.isOpen && (
                        <motion.section
                            key="content"
                            className="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                            {this.props.children}
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        )
    }

}