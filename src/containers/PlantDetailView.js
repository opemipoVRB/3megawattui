import React from 'react';
import axios from 'axios';
import {Card, Button } from 'antd';
import CustomForm from "../components/Form";


class PlantDetail extends React.Component{

    state = {
        plant: {}
    }

    componentDidMount(){
        const plantID = this.props.match.params.plantID;
        axios.get(`http://127.0.0.1:8000/monitor/api/plant/${plantID}`)
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
    handleDelete = (event) => {
        const plantID = this.props.match.params.plantID;
        axios.delete(`http://127.0.0.1:8000/monitor/api/delete/plant/${plantID}`);
        this.props.history.push('/')
        this.forceUpdate();


    }
    render()
    {
        return(
            <div>
                <h2>Update plant </h2>

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

                <CustomForm
                 requestType="put"
                 plantID={this.props.match.params.plantID}
                 btnText="Update"

                 />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
           </Card>
            </div>

        )
    }
}


export default PlantDetail;

