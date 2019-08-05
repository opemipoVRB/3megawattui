import React from 'react';
import axios from 'axios';
import {Card} from 'antd';


class PlantDetail extends React.Component{

    state = {
        plant: {}
    }

    componentDidMount(){
        const plantID = this.props.match.params.plantID;
        axios.get(`http://127.0.0.1:8000/monitor/api/plants/${plantID}`)
            .then(
                res=>{
                this.setState(
                    {
                    plant: res.data
                }
                )
            }
            )
    }
    render()
    {
        return(
           <Card
               hoverable
               title =
                   {
                       this.state.plant.name
                   }
           >

               <p>
                   {this.state.plant.content}
               </p>
           </Card>

        )
    }
}


export default PlantDetail;