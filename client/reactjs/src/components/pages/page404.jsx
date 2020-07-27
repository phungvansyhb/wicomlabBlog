import React from 'react';
import {Typography} from "antd";

function Page404(props) {
    return (
        <div style={{textAlign:"center" , marginTop:"30px"}}>
            <Typography>
                <Typography.Title level={1}>
                    Page Not Found
                </Typography.Title>
                <Typography.Text  strong={true} type={"warning"}>
                     Error code 404
                </Typography.Text>

            </Typography>
        </div>
    );
}

export default Page404;