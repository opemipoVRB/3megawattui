import React from 'react';
import Plants from '../components/Plant';
import axios from 'axios';

import CustomForm from '../components/Form';

class PlantGrid extends React.Component{

    state = {
        plants: []
    }

    componentDidMount(){
// This guy seems to be used in update server too
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
            <div>
                <h2>Create a plant </h2>
                 <CustomForm
                     requestType="post"
                     plantID={null}
                     btnText="Create"
                 />
                <br/>
                <Plants data={this.state.plants}/>
            </div>

        )
    }
}


export default PlantGrid;