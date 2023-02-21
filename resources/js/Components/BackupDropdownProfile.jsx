import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/react'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownProfile({ text, items, user }) {
  return (
    <Menu as="div" className="relative inline-block text-left nav-link">
      <div>
        <Menu.Button className="nav-link user">
          <span className='py-[10px] px-[24px]'>{ text }</span>
          <img className='rounded-[5px] w-[48px]' src={`https://auth.frazionz.net/skins/face.php?u=${user.id}`} alt="" />
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
            if(elem.type == "hyperlink"){
              return (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <a
                      href={elem.value}
                      className={classNames(
                        active ? 'bg-[var(--fzbg-1)]' : '',
                        'block px-4 py-2 text-[16px] leading-[24px] font-normal text-[#FFF]'
                      )}
                    >
                      {elem.name}
                    </a>
                  )}
                </Menu.Item>
              )
            }else if(elem.type == "inerlink"){
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
            }
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}