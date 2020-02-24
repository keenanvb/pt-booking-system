import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiChevronRight, FiArrowUpCircle } from "react-icons/fi"
import { Link } from 'react-router-dom'

const containerVariants = {
    open: {
        width: `800px`,
        transition: {
            staggerChildren: 0.1,
        },
    },
    closed: {
        width: `80px`,
        transition: {
            staggerChildren: 0.1,
            when: "afterChildren",
            staggerDirection: -1,
        },
    },
}

const childVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
}

const MobileActions = () => {
    const [isOpen, setIsOpen] = useState(false)

    let actions = [
        {
            title: 'Manage Booking',
            icon: 'fas fa-calendar-check',
            link: 'admin-manage-booking'
        },
        {
            title: 'Sign up User',
            icon: 'fas fa-user-plus',
            link: 'register'
        },
        {
            title: 'Add New Package',
            icon: 'fa fa-plus',
            link: 'admin-add-package'
        },
        {
            title: 'Update sessions',
            icon: 'fa fa-plus',
            link: 'admin-update-session'
        },
    ]

    return (
        <div>
            <motion.div
                className='mobile-actions'
                initial={`closed`}
                animate={isOpen ? `open` : `closed`}
                variants={containerVariants}
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FiChevronRight size={48} />
                </motion.div>

                {actions.map(({ title, icon, link }) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        variants={childVariants}
                    // style={{ rotate: value }}
                    >
                        <Link to={`/${link}`} style={{ backgroundColor: '#7ed6df' }} className="btn btn-light"><i className={`${icon}`}></i></Link>
                        {/* <FiArrowUpCircle size={36} /> */}
                    </motion.div>
                ))}

            </motion.div>
        </div>
    )
}

export default MobileActions;