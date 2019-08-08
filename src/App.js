import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import DashboardLayout from './containers/DashboardLayout';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';


function App() {
  return (
    <div className="App">
        <Router>
            <DashboardLayout>
                <BaseRouter/>
            </DashboardLayout>
        </Router>

    </div>
  );
}

export default App;
