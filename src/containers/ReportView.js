import React from 'react';
import WrappedReportFilterForm from "../components/ReportFilter";

class ReportServerView extends React.Component{

    render()
    {
        return(
            <div className="chart">
                <WrappedReportFilterForm/>
            </div>

        )
    }
}


export default ReportServerView;

