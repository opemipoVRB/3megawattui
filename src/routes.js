import React from 'react';
import { Route } from 'react-router-dom';
import PlantGrid from './containers/PlantGridView';
import PlantDetail from './containers/PlantDetailView';

const BaseRouter = () =>(
    <div>
        <Route exact path='/' component={PlantGrid} />
        <Route exact path='/:plantID' component={PlantDetail} />

    </div>
)


export default BaseRouter;