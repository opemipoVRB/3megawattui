import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PlantGrid from './containers/PlantGridView';
import PlantDetail from './containers/PlantDetailView';
import UpdateServerView from "./containers/UpdateServerView";
import ReportServerView from "./containers/ReportView";



const BaseRouter = (props) =>(
<div>
    <Switch>
        <Route exact path='/' component={PlantGrid} />
        <Route exact path='/upload/' component={UpdateServerView} />
        <Route path='/generate-report' component={ReportServerView} />
        <Route path='/:plantID' component={PlantDetail} />
    </Switch>

</div>
)


export default BaseRouter;