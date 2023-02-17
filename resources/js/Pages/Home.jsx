import SuperButton from '@/Components/SuperButton';
import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';
import React from 'react';

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.title = "Accueil"
        this.state = { mc: null }
    }

    async componentDidMount(){
        let qMC = await axios.get('https://api.mcsrvstat.us/2/194.9.172.246')
        this.setState({ mc: qMC.data })
    }

    render(){
        return (
            <>
                <Head title={this.title} />
                <Layout props={this.props} mc={this.state.mc} isHome={true} title={this.title}>
                    <div className="flex justify-center">
                        <Link href="/launcher">
                            <SuperButton id="join" text="Rejoindre" />
                        </Link>
                    </div>
                </Layout>
            </>
        );
    }
}
