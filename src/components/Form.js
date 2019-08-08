import React from 'react';
import { Form, Input, Button } from 'antd';
import  axios from "axios";


class CustomForm extends React.Component   {

  handleFormSubmit = (event, requestType, plantID) => {
      //  prevents page from reloading
      event.preventDefault();

      const name = event.target.elements.name.value;

      if (requestType === 'post') {
          return axios.post('http://127.0.0.1:8000/monitor/api/create/plant/', {
              name: name,
          })

              .then(res => console.log(res))
              .catch(error => console.error(error));
      }
      else if(requestType === 'put'){
              return axios.put(`http://127.0.0.1:8000/monitor/api/update/plant/${plantID}`, {
                  name: name,
              })
                  .then(res => console.log(res))
                  .catch(error => console.error(error));
      }

  };

  render() {

    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.plantID
        )
        }
        >
          <Form.Item>
            <Input name="name" placeholder="Enter plant name.." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;