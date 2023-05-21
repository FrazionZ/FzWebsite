import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import logo from '../../../../assets/img/logo.svg'
import ameliorator from '../../../../assets/img/ameliorator.png'

export default function MaintenanceIndex(props) {

    let title = "NewsLetter";



    async function handleSubmit(){
        const testnode = document.querySelector('.newsletter .preview')
        const canvas = document.createElement("canvas");
        canvas.width = testnode.clientWidth;
        canvas.height = testnode.clientHeight;
        canvas.getContext('2d').drawImage(testnode, 0, 0, canvas.width, canvas.height);
        const img = document.createElement("img");
        img.src = canvas.toDataURL();
        document.querySelector('#output').src = canvas.toDataURL()
    }


    const date = new Date(Date.now());
    let day = date.getDay();
    let month = date.getMonth();
    if(day < 10)
        day = 0 + "" + day
        
    if(month < 10)
        month = 0 + "" + month

    return (
        <AdminLayout>
            <Head title={title} />
            <div className="newsletter">
                <h1 className="text-3xl text-white mb-5">{title}</h1>
                <div className="flex">
                    <div className="preview w-full" id="test">
                        <div className="blurring">
                            <div className="head">
                                <h2>News<span className="gradient">Letter</span></h2>
                                <h4>{day + "/" + month + "/" + date.getFullYear()}</h4>
                            </div>
                            <div className="content">
                                <div className="minia">
                                    <img src={ameliorator} alt="Minia" />
                                </div>
                                <div className="body">
                                    <div className="title">
                                        Améliorator
                                    </div>
                                    <div className="text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ornare arcu. Phasellus lorem ipsum, ultrices hendrerit diam non, viverra finibus ex. Cras in sem sit amet libero aliquam venenatis ut ac arcu. Pellentesque non viverra nulla. Pellentesque est ipsum, ullamcorper in enim ut, eleifend egestas urna. Curabitur facilisis venenatis ante placerat malesuada. Aliquam erat volutpat. Proin porttitor, augue ut ultricies ornare, odio ante maximus felis, ut sodales velit dui quis odio.
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <div className="body">
                                    <div className="title">
                                        Améliorator
                                    </div>
                                    <div className="text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ornare arcu. Phasellus lorem ipsum, ultrices hendrerit diam non, viverra finibus ex. Cras in sem sit amet libero aliquam venenatis ut ac arcu. Pellentesque non viverra nulla. Pellentesque est ipsum, ullamcorper in enim ut, eleifend egestas urna. Curabitur facilisis venenatis ante placerat malesuada. Aliquam erat volutpat. Proin porttitor, augue ut ultricies ornare, odio ante maximus felis, ut sodales velit dui quis odio.
                                    </div>
                                </div>
                                <div className="minia">
                                    <img src={ameliorator} alt="Minia" />
                                </div>
                            </div>
                            <div className="footer">
                                <div className="tags">
                                    <div className="tag info">
                                        Annonce
                                    </div>
                                    <div className="tag success">
                                        Spoil
                                    </div>
                                </div>
                                <img src={logo} alt="logo" />
                            </div>
                        </div>
                    </div>
                    <div className="form w-full">
                        Form
                        <button onClick={handleSubmit}>Submit</button>
                        <img id="output" />
                        <canvas id="canvas" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
