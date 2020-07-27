import React, {useState} from 'react';
import {Button, Col, Form, Input, Result, Row, Typography} from "antd";


function SignUp(props) {
    const [userinf, setUserInf] = useState({});
    const [isShow, setShow] = useState(false);
    const [status, setStatus] = useState('');
    const [title , setTitle] = useState('');
    const [subtitle , setSubtitle] = useState('');
    const onFinish = values => {
        setUserInf(values);
        fetch(`${process.env.REACT_APP_LOCALENTRY}/signup`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }).then((res) => {
            res.json().then((rs) => {
                console.log(rs);
                setStatus(rs.status);
                setTitle(rs.msg);
                setShow(true);
                if(rs.status == 'success'){
                    setSubtitle('moi ban kiem tra email va click vao link de xac thuc!')
                }
            })
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Typography>
                    <Typography.Title level={2}>
                        SignUp
                    </Typography.Title>
                </Typography>
            </div>
            <Row>
                <Col span={12} offset={6}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input placeholder={"sample:xyz@gmail.com"} type={'email'}/>
                        </Form.Item>

                        <Form.Item style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
                {(!isShow) ? null :
                    <div style={{textAlign: "center" , width:"100%"}}><Result
                        status={status}
                        title={title}
                        subTitle={subtitle}

                    /></div>}
            </Row>
        </div>
    );
}

export default SignUp;