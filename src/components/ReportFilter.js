import React from "react";
import { Form, DatePicker, Button, Select } from 'antd';
import  axios from "axios";
import {Bar, Line} from 'react-chartjs-2';
const { MonthPicker} = DatePicker;



const { Option } = Select;


class ReportFilterForm extends React.Component {
    state = {
        lineData: {
        labels: "",
        datasets: [

                                  {
                                      label: 'Observed',
                                      data: [],
                                      backgroundColor: [
                                        'rgba(255, 206, 86, 0.5)'
                                    ]
                          },
                                   {
                                      label: 'Expected',
                                      data: [],
                                      backgroundColor: [
                                        'rgba(75, 192, 192, 0.5)'
                                    ]
                          },]
},

        plants: [],
        plant: '',
        data_set: [],
        energy_observed:[],
        energy_expected:[],
        irradiation_observed:[],
        irradiation_expected:[],


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

        return axios.get(`http://127.0.0.1:8000/monitor/api/report/${plant}`)
              .then(res=>{
                  // this.setState({
                  //     raw_data: res.data
                  // }, function(){

                  // });
                  console.log("What 11", res.data);

                  this.data = res.data.map((item, key) => {
                      this.setState({
                          labels: date,
                          lineData:{
                               ...this.state.lineData,
                              datasets: [

                                  {
                                      label: 'Observed',
                                      data: [...this.state.lineData.datasets[0].data, item.energy_observed],
                                      backgroundColor: [
                                        'rgba(255, 206, 86, 0.5)'
                                    ]
                          },
                                   {
                                      label: 'Expected',
                                      data: [...this.state.lineData.datasets[1].data, item.energy_expected],
                                      backgroundColor: [
                                        'rgba(75, 192, 192, 0.5)'
                                    ]
                          },



                              ]
                          },
                          energy_observed: [...this.state.energy_observed, item.energy_observed],
                          energy_expected: [...this.state.energy_expected, item.energy_expected],
                          irradiation_observed: [...this.state.irradiation_observed, item.irradiation_observed],
                          irradiation_expected: [...this.state.irradiation_expected, item.irradiation_expected]
                      }, function(){
                          console.log(this.state.lineData.datasets)
                      })
                  });


                  console.log("energy_expected", this.state.energy_expected);
                  console.log("energy_observed", this.state.energy_observed);

            //
            //       this.setState({data_set: this.data}, function(){
            //           console.log("Our Data Set ", this.data);
            //           console.log("Our Data Set ", this.state.data_set);
            //           console.log("The Plant ", this.state.plants);
            //
            // });
            //





              })
              .catch(error => console.error(error));


                  //
                  // console.log("energy_expected", this.state.energy_expected)



      if (metrics==='Energy') {

      }


      else if (metrics==='Irradiation'){

          const  data =
              [
                  {'irradiation_observed': 351, 'irradiation_expected': 271},
                  {'irradiation_observed': 331, 'irradiation_expected': 181},
                  {'irradiation_observed': 221, 'irradiation_expected': 281},
                  {'irradiation_observed': 151, 'irradiation_expected': 181},
              ];

            this.setState({data_set: data}, function(){
                console.log("Our Data Set ", data);
                console.log("Our Data Set ", this.state.data_set);
                console.log("The Plant ", this.state.plants);

            });



      }






    });
  };



  componentDidMount(){

        axios.get(
            'http://127.0.0.1:8000/monitor/api/plants/'
        )
            .then(res=>{this.setState({plants: res.data})})


    }


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
                    <Button type="primary" htmlType="submit">
                        Generate Report
                    </Button>
                </Form.Item>
          </Form>
            <div>
                <Bar
                    data={this.state.lineData}
                    width={1000}
                    height={250}
                    options={{
                        maintainAspectRatio: true
                    }}
/>
            </div>
        </div>
    );
  }
}

const WrappedReportFilterForm = Form.create({ name: 'time_related_controls' })(ReportFilterForm);

export default WrappedReportFilterForm;





