import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import OrphanangeCreate from './pages/CreateOrphanage'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/orphanage/create" component={OrphanangeCreate} />
            </Switch>
        </BrowserRouter>
    );
}