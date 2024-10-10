"use client";

import { Form, Input, Button, Select, message, DatePicker } from 'antd';
const { Option } = Select;
import './Form.css';

const TransactionForm: React.FC = () => {
  const onFinish = (values: any) => {
    message.success('Cập nhật giao dịch thành công!');
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Cập nhật giao dịch thất bại: ' + errorInfo.errorFields.map((field: any) => field.errors[0]).join(', '));
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-2xl rounded-lg mt-10 relative">
      <h2 className="text-3xl font-bold mb-6 text-start">Nhập giao dịch</h2>
      <Form
        name="transactionForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <div className='relative'>
          <label
            className='absolute z-50 top-1 left-3 transition-all text-slate-500 text-xs'
          >
            Thời gian
          </label>
          <Form.Item
            name="time"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn thời gian!',
              },
            ]}
          >
            <DatePicker
              showTime
              format={'DD/MM/YYYY HH:mm:ss'}
              placeholder=""
              className="w-full text-base font-medium h-12 border-gray-300 rounded-md peer pt-4"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="quantity"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số lượng!',
            },
            {
              validator: (_, value) => {
                if (value && (isNaN(value) || value <= 0)) {
                  return Promise.reject(new Error('Số lượng phải là số dương!'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className='relative'>
            <Input
              className="w-full text-base font-medium h-12 border-gray-300 rounded-md peer pt-4"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-slate-500 text-xs transition-all">
              Số lượng
            </label>
          </div>
        </Form.Item>

        <div className='relative'>
          <label className="absolute z-50 left-3 top-1 text-slate-500 text-xs transition-all">
            Trụ
          </label>
          <Form.Item
            name="station"
            rules={[{ required: true, message: 'Vui lòng chọn một trụ!' }]}
          >
            <Select
              className="w-full text-base font-medium h-12 border-gray-300 rounded-md peer"
              placeholder=""
            >
              <Option value="option1">Trụ 1</Option>
              <Option value="option2">Trụ 2</Option>
              <Option value="option3">Trụ 3</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="revenue"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập doanh thu!',
            },
            {
              validator: (_, value) => {
                if (value && (isNaN(value) || value <= 0)) {
                  return Promise.reject(new Error('Doanh thu phải là số dương!'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className='relative'>
            <Input
              className="w-full text-base font-medium h-12 border-gray-300 rounded-md peer pt-4"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-slate-500 text-xs transition-all">
              Doanh thu
            </label>
          </div>
        </Form.Item>

        <Form.Item
          name="unitPrice"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đơn giá!',
            },
            {
              validator: (_, value) => {
                if (value && (isNaN(value) || value <= 0)) {
                  return Promise.reject(new Error('Đơn giá phải là số dương!'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <div className='relative'>
            <Input
              className="w-full text-base font-medium h-12 border-gray-300 rounded-md peer pt-4"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-slate-500 text-xs transition-all">
              Đơn giá
            </label>
          </div>
        </Form.Item>
        <div className='absolute top-5 right-3'>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Cập nhật
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div >
  );
};

export default TransactionForm;
