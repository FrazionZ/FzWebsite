import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaBell } from 'react-icons/fa'
import { usePage } from '@inertiajs/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function DropdownNotifications() {

    const props = usePage().props
    const notifications = props.auth.notifications

    return (
        <Menu as="div" className="relative inline-block text-left notifications">
            <div>
                <Menu.Button style={{ background: 'var(--gradient)' }} className="inline-flex w-full justify-center gap-x-1.5 rounded-md p-3 text-sm font-semibold fill-[var(--color-2)] shadow-sm">
                    <FaBell style={{ fill: "var(--text-button)", width: "18px", height: "18px" }} />
                </Menu.Button>
                <span className='badge'>{notifications.length}</span>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {notifications.map((notification, index) => {
                            return (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {notification.enum}
                                        </a>
                                    )}
                                </Menu.Item>
                            )
                        })}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}