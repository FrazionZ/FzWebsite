import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';

export default function CapesIndex(props) {

    const title = "Bibliothèque des capes"

    const capes = props.capes;

    console.log(capes)

    return (
        <Layout
            props={props}
            title={title}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title} />
            <div className="apparence w-full">
                <div className="library">
                    {capes.map((cape, i) => {
                        return (
                            <div key={i} onClick={() => {  }} className={`card skin`}>
                                <div className="card-body">
                                    <img src={`https://api.frazionz.net/capes/display/2d/${cape.id}`} alt="" />
                                    <div className="datas">
                                        <span className="name">{cape.display}</span>
                                        <span className="model">
                                            {cape.category.display}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    )


}