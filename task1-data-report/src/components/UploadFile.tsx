// FileUpload.tsx
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

interface FileUploadProps {
    handleFileUpload: (file: any) => boolean;
    onRemove: () => void;
}

const UploadFile: React.FC<FileUploadProps> = ({ handleFileUpload, onRemove }) => {
    const props: UploadProps = {
        listType: 'picture',
        accept: '.xlsx',
        beforeUpload: handleFileUpload,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove: () => {
            onRemove();
        },
        maxCount: 1,
        multiple: false,
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload report file (.xlsx)</Button>
        </Upload>
    );
};

export default UploadFile;
