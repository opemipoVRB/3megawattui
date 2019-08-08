import React from "react";
import { Form, DatePicker, Button, Select } from 'antd';
import  axios from "axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

class UpdateServerForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
          'plant-picker': fieldsValue['plant-picker'],
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      // console.log('Received values of form: ', values);
      const plant = values['plant-picker'];
      const date_from = values['range-picker'][0];
      const date_to = values['range-picker'][1];
      console.log('Date From: ', plant);
      console.log('Date From: ', date_from);
      console.log('Date to: ', date_to);
      const instruction = {
          'plant': plant,
          'date_from': date_from,
          'date_to': date_to
      }


      axios.post('http://127.0.0.1:8000/monitor/api/datapoint/upload/', instruction)
          .then(res => {
           console.log(res);
           console.log(res.data);
       })
          .catch(error => console.error(error));



    });
  };

  state = {
        plants: []
    }

  componentDidMount(){

        axios.get(
            'http://127.0.0.1:8000/monitor/api/plants/'
        )
            .then(res=>{this.setState({plants: res.data})})


    }


  render() {

      const plants =  this.state.plants

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

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
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
            <Form.Item label="Date Range">
              {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
            </Form.Item>
            <Form.Item  wrapperCol={{
                xs: { span: 16, offset: 0 },
                sm: { span: 16, offset: 5 },
              }}>
              <Button type="primary" htmlType="submit">
                Update Server
              </Button>
            </Form.Item>
          </Form>
        </div>
    );
  }
}

const WrappedServerForm = Form.create({ name: 'time_related_controls' })(UpdateServerForm);

export default WrappedServerForm;





