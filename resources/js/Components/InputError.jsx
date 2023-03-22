import Lang from '@/Components/Language'
import { usePage } from '@inertiajs/react';

export default function InputError({ prefixLang, attribute, message, isTrad, className = '' }) {

    const props = usePage().props
    const lang = new Lang(props.language)

    const msgPrepare = prefixLang + "."+ message

    const msg = message ? 
        <p className={'text-sm text-red-600 ' + className}>
            {isTrad ? lang.get(msgPrepare, []) : message}
        </p>
    : null

    return msg;
}
