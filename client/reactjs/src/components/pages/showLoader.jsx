import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons'

function ShowLoader(props) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <React.Fragment >
            <div className="loader">
                 <Spin indicator={antIcon} size="large" className="spiner"/>
            </div>
        </React.Fragment>
    );
}

export default ShowLoader;