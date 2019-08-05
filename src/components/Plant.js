import React from 'react'
import { List, Card } from 'antd';
import { Link } from 'react-router-dom'
const {Meta} = Card;



const Plants = (props) => {

    return(


        <List grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
        }}
              dataSource={props.data} renderItem={item => (<List.Item>

                 <Link to= {item.id}>
                     <Card
                         hoverable
                         title={item.name}
                         style={{width: 200, height: 300}}
                         cover={<img alt="power plant0" src="http://www.nebraskansforsolar.org/wp-content/uploads/2015/09/Solar-Power-World-Magazine.jpg"  />}
                     >
                         <Meta
                            title = {item.id}
                            description="This is the description"
                         />
                     </Card>
                 </Link>
            </List.Item>
        )}
            />
    );
}



export default Plants;
