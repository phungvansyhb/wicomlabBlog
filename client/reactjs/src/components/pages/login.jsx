import React, {useEffect, useState} from 'react';
import {Grid , Row , Col , Form , Input , Checkbox , Button , Typography , message} from "antd";


function Login(props) {

    const[msg , setMsg ] = useState('');
    const [isshow , setshow] = useState(false);
    useEffect(()=>{
        if(props.location.state) {
            setshow(true);
            setMsg(props.location.state);
            console.log('update')
        }
    },[props.location.state])


    const onFinish = (value)=>{
        console.log(props);
        fetch('http://localhost:5000/api/v1/login' , {
            method: 'post',
            headers:{"Content-Type":"Application/json"},
            body:JSON.stringify(value),
        }).then((res)=>{
            res.json().then((rs)=>{
               if(rs.status){
                   localStorage.setItem('token',rs.token);
                   props.history.push({pathname:"/"});
               }else{
                   setMsg(rs.msg);
                   setshow(true);
               }

            })
        }).catch(err=>console.log(err))
    }
    const onFinishFailed = (err)=>{
        console.log(err)
    }
    const onClose = function(){
        setshow(false);
    }
    return (
        <div>
            <Row>
                <div style={{width:"100%" , textAlign:"center"}}>
                    <Typography >
                        <Typography.Title level={2}>
                            Login page
                        </Typography.Title>
                    </Typography>
                </div>
            </Row>
            <div style={{width:"100%" , textAlign:"center"}}>
                {(isshow)?message.info(msg , onClose):null}
            </div>
            <Row>
                <Col span={12} offset={6}>
                    <Form

                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>

        </div>
    );
}

export default Login;