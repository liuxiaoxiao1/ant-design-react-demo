import React from 'react'
// import { render as Render } from 'react-dom'
import { DatePicker } from 'antd';
const {MonthPicker} = DatePicker;
import {Pagination} from 'antd';
import { Button, notification } from 'antd';

import moment from 'moment';
import 'moment/locale/en-au';
moment.locale('en-au');


const openNotification = () => {
    const args = {
        message: 'Notification Title',
        description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
        duration: 0,
    };
    notification.open(args);
};


class DateTest extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                我是一个测试的人啊
                <DatePicker showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"/>

                <MonthPicker placeholder="Select month" />

                <Pagination defaultCurrent={1} total={500} />
                <Button type="primary" onClick={openNotification}>Open the notification box</Button>
            </div>
        );
    }
}

export default DateTest