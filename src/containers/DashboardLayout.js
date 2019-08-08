import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Link} from "react-router-dom";
// import {Route} from "../routes";
const { Header, Sider, Content, Footer } = Layout;

class DashboardLayout extends React.Component{
    state = {
    collapsed: false,
  };
    toggle = () => {
    this.setState({
        collapsed: !this.state.collapsed,
    });
    };


    render(){
    return(
         <Layout>
             <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                 <div className="logo" />
                 <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                     <Menu.Item key="1">
                         <Link  to="/">
                        <Icon type="appstore" />
                         <span>Plant Dashboard</span>
                         </Link>
                     </Menu.Item>
                     <Menu.Item key="2">
                            <Link  to="/upload">
                         <Icon type="upload" />
                         <span>Update Server</span>
                            </Link>
                     </Menu.Item>
                     <Menu.Item key="3">
                            <Link  to="/generate-report">
                         <Icon type="line-chart" />
                         <span>Generate Report</span>
                            </Link>
                     </Menu.Item>
                 </Menu>
             </Sider>
             <Layout>
                 <Header style={{ background: '#fff', padding: 0 }}>
                     <Icon
                         className="trigger"
                         type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                         onClick={this.toggle}
                     />
                 </Header>
                 <Content
                     style={{
                         margin: '24px 16px',
                         padding: 24,
                         background: '#fff',
                         minHeight: 280,
                     }}
                 >
                   <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                       {this.props.children}

                   </div>

                 </Content>

                                  <Footer style={{ textAlign: 'center' }}>3megawatt Design ©2019 Created by Durodola Opemipo</Footer>
             </Layout>
         </Layout>
    );
}
}
export default DashboardLayout;

