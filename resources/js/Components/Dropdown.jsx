import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/react'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ text, items }) {
  return (
    <Menu as="div" className="relative inline-block text-left nav-link">
      <div>
        <Menu.Button className="nav-link">
          { text }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="absolute dropdown_menu right-0 z-10 mt-2 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((elem, i) => {
            return (
              <Menu.Item key={i}>
                {({ active }) => (
                  <Link
                    href={elem.value}
                    method={(elem.method !== undefined) ? elem.method : "get"}
                    className={classNames(
                      active ? 'bg-[var(--fzbg-1)]' : '',
                      'block px-4 py-2 text-[16px] leading-[24px] font-normal text-[#FFF]'
                    )}
                  >
                    {elem.name}
                  </Link>
                )}
              </Menu.Item>
            )
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}