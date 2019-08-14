import React from "react";
import { Form, DatePicker, Button, Select } from 'antd';
import  axios from "axios";
import {Bar, Line} from "react-chartjs-2";
const { MonthPicker} = DatePicker;
require('dotenv').config();



const BaseURL= 'http://127.0.0.1:8000/';

const plants_endpoint = 'monitor/api/plants/';
const plant_report_endpoint = 'monitor/api/report/';
const { Option } = Select;
const BAR_CHART ="1";
const LINE_CHART="2";



class ReportFilterForm extends React.Component {

    state = {
        chartData:{

        },
        lineData:{

        },
        plants: [],
        plant: '',
        data_set: [],
        observed:[],
        expected:[],
        data_dates:[],
        energy_observed:[],
        energy_expected:[],
        irradiation_observed:[],
        irradiation_expected:[],
        style:'',
        checkedBarChart: false,
        checkedLineChart: false,
        selectedChart: '',

    };



     Style(){

          if (this.state.data_set === null){
              this.setState({style: 'none'})

          }

          else{
              this.setState({style: 'block'})
          }



      }



      handleRadioChange =(e)=>{
         let value = e.target.value;
         this.setState({selectedChart: e.target.value});
         console.log(value);

      };



  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
          'plant-picker': fieldsValue['plant-picker'],
          'metrics-picker': fieldsValue['metrics-picker'],
          'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      };
      // console.log('Received values of form: ', values);
      const plant = values['plant-picker'];
      const metrics = values['metrics-picker'];
      const date = values['month-picker'];
      console.log('Plant: ', plant);
      console.log('Date : ', date);
      console.log('Metrics : ', metrics);
      this.setState({plant: plant});


      function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          return [year, month, day].join('-');
      }

        axios.get(BaseURL + plant_report_endpoint +`${plant}`)
              .then(res=>{
                  const observed = [];

                  const expected = [];
                  const dates = [];

                  if (metrics==='Energy') {

                      this.data = res.data.forEach((item) => {
                          dates.push(formatDate(item.datetime));
                          var _date_;
                          for (_date_ of dates){
                              if (_date_.includes(date)){
                                  expected.push(item.energy_expected);
                                  observed.push(item.energy_observed);
                          }

                          }

                  });

                  }
                  else if (metrics==='Irradiation'){
                      this.data = res.data.forEach((item) => {
                          dates.push(formatDate(item.datetime));

                          var _date_;
                          for (_date_ of dates){
                              if (_date_.includes(date)){
                                  expected.push(item.irradiation_expected);
                                  observed.push(item.irradiation_observed);
                          }

                          }



                  });
                  }

                  this.setState({expected:expected});
                  this.setState({observed: observed});
                  this.setState({data_dates: dates});
                  this.setState({
            chartData:{
                labels: dates,
              datasets: [
                    {
                        label: 'Observation',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        data: this.state.observed,
                        backgroundColor:
                            'rgba(255, 206, 86, 0.5)'

                    },
                    {
                        label: 'Expectation',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        data: this.state.expected,
                        backgroundColor:
                            'rgba(150, 90, 86, 0.5)'
                    },
                ]

            }
        })

                  this.setState({
            lineData:{
                labels: dates,
              datasets: [
                    {
                        label: 'Observation',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(7,192,192,0.4)',
                        borderColor: 'rgba(225,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.state.observed,

                    },
                    {
                        label: 'Expectation',
                       fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(7,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.state.expected,

                    },
                ]

            }
        })
              })
              .catch(error => console.error(error));



    });

  };






  componentDidMount(){

        axios.get(
            BaseURL+plants_endpoint
        )
            .then(res=>{this.setState({plants: res.data})})


    }
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendsPosition: 'right',

    };





  render() {

      const plants =  this.state.plants;
      const metrics = [
          {
              label: 'Energy',
          },{
              label: 'Irradiation',
          }
      ];




      const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
  labelCol: {
    xs: { span: 32 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 32 },
    sm: { span: 16 },
  },
};
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };




    const {observed, selectedChart} = this.state;
    console.log(selectedChart)

    return (
        <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="Select Plant" hasFeedback validateStatus="error">
                  {getFieldDecorator('plant-picker', )(
                  <Select placeholder="Select a plant">
                      {plants.map(
                          // Iterating over every entry of the plant dictionary and converting each
                          // one of them into an `option` JSX element
                          ({id, name}) => <Option key={id} value={id}>{name}</Option>
                      )}

                  </Select>
                  )
                      }
              </Form.Item>
                <Form.Item label="Select Metrics" hasFeedback validateStatus="error">
                    {getFieldDecorator('metrics-picker', )(
                        <Select placeholder="Select a metric">
                            {metrics.map(
                                // Iterating over every entry of the plant dictionary and converting each
                                // one of them into an `option` JSX element
                                ({label}) => <Option key={label} value={label}>{label}</Option>
                      )}
                  </Select>
                  )
                      }
              </Form.Item>
                 <Form.Item label="MonthPicker">
          {getFieldDecorator('month-picker', config)(<MonthPicker />)}
          </Form.Item>
                <Form.Item  wrapperCol={{
                    xs: { span: 16, offset: 0 },
                    sm: { span: 16, offset: 5 },
                }}>
                    <Button type="primary"  htmlType="submit">
                        Generate Report
                    </Button>
                </Form.Item>
          </Form>
            <div id="controls">
              <input type="radio"
                     checked={selectedChart === BAR_CHART}
                     value={BAR_CHART}
                     onChange={this.handleRadioChange}
              />
                <input
                    type="radio"
                    checked={selectedChart === LINE_CHART}
                    value={LINE_CHART}
                    onChange={this.handleRadioChange}
                />

            </div>
            {selectedChart===BAR_CHART &&
                <div id="bar">
                {(observed.length> 0) ? <Bar
                    data={this.state.chartData}
                options={{
                title: {
                    display: this.props.displayTitle,
                    text: 'Bar Chart Report',
                    fontSize: 25


                },
                    legend:{
                     display: this.props.displayLegend,
                        position: this.props.legendsPosition,
                    },
                    maintainAspectRatio:true
                }}
                />: <h1> No Record Found</h1>}

            </div>
            }
            {selectedChart===LINE_CHART &&
                <div id="line">
                {(observed.length> 0) ?<Line
                    data={this.state.lineData}
                options={{
                title: {
                    display: this.props.displayTitle,
                    text: 'Line Graph Report',
                    fontSize: 25


                },
                    legend:{
                     display: this.props.displayLegend,
                        position: this.props.legendsPosition,
                    },
                    maintainAspectRatio:true
                }}
                />: <h1>No Record Found</h1>}
            </div>
            }


        </div>
    );
  }
}

const WrappedReportFilterForm = Form.create({ name: 'time_related_controls' })(ReportFilterForm);

export default WrappedReportFilterForm;



