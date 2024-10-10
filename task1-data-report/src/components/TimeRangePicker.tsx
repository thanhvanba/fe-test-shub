import React from 'react';
import { TimePicker } from 'antd';

interface TimeRangePickerProps {
    setStartTime: (value: string) => void;
    setEndTime: (value: string) => void;
}

const TimeRangePicket: React.FC<TimeRangePickerProps> = ({ setStartTime, setEndTime }) =>
    <TimePicker.RangePicker
        onChange={(dates, dateStrings) => {
            setStartTime(dateStrings[0])
            setEndTime(dateStrings[1])
        }}
        format="HH:mm:ss"
        className="w-full py-1 text-black focus:outline-none rounded-md border-2 focus:border-blue-600"
        placeholder={['Chọn thời gian bắt đầu', 'Chọn thời gian kết thúc']}
    />;


export default TimeRangePicket;