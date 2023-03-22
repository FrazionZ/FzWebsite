import { Switch } from '@headlessui/react';

export default function FzSwitch({ children, large, checked, disabled, refName, label, onChange, classNameChecked, classNameSpan }) {


    return (
        <div className="flex gap-6 items-center">
            <Switch
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                refName={refName}
                className={`${checked ? '' : 'bg-[var(--fzbg-3)]'
                    } relative inline-flex h-6 w-11 items-center rounded-full ${large ? 'large' : ''} ${classNameChecked}`}
            >
                <span
                    className={`${checked ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition ${classNameSpan}`}
                />
            </Switch>
            
            <label htmlFor="switch">
                {label !== undefined ? label : children}
            </label>
        </div>
    )


}