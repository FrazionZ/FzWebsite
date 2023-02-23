import React from 'react';
import { Head } from '@inertiajs/react';
import logo from '../../assets/img/logo.svg'
import '../../css/app.css';

export default class Maintenance extends React.Component {

    constructor(props){
        super(props)
        this.title = "Maintenance"
    }

    async componentDidMount(){
    }

    render(){
        return (
            <>
                <Head title={this.title} />
                <div className="maintenance flex justify-center h-[100vh] items-center">
                    <img src={logo} alt="fzlogo" />
                    <div className="title">
                        Maintenance en cours
                    </div>
                    <span>
                        { this.props.maintenanceMessage }
                    </span>
                </div>
            </>
        );
    }
}
