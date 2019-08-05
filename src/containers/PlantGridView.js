import React from 'react';
import Plants from '../components/Plant';
import axios from 'axios';



class PlantGrid extends React.Component{

    state = {
        plants: []
    }

    componentDidMount(){

        axios.get(
            'http://127.0.0.1:8000/monitor/api/plants/'
        )
            .then(
                res=>{
                this.setState(
                    {
                    plants: res.data
                }
                )
            }
            )
    }
    render()
    {
        return(
            <Plants data={this.state.plants}/>
        )
    }
}


export default PlantGrid;