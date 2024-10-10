"use client";

import TimeRangePicker from "@/components/TimeRangePicker";
import UploadFile from "@/components/UploadFile";
import { Button } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";

const DataReport = () => {
  const [data, setData] = useState<any[]>([]);
  console.log("🚀 ~ DataReport ~ data:", data)
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
    return false;
  };
  const handleRemoveFile = () => {
    setData([]);
  };

  const handleCalculateTotal = () => {
    if (!startTime || !endTime || data.length === 0) {
      alert("Vui lòng chọn khung thời gian và tải file!");
      return;
    }

    const start = new Date(`1970-01-01T${startTime}`).getTime();
    const end = new Date(`1970-01-01T${endTime}`).getTime();

    const total = data.reduce((acc, row: any) => {
      const timeString = row["__EMPTY_1"];
      const transactionTime = new Date(`1970-01-01T${timeString}`).getTime();

      const amountStr = row["__EMPTY_7"];
      if (!amountStr) {
        return acc;
      }

      if (transactionTime >= start && transactionTime <= end) {
        return acc + amountStr;
      }
      return acc;
    }, 0);

    setTotalAmount(total);
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="mt-20 p-8 border rounded-xl shadow-2xl">
        <h1 className="font-semibold text-2xl py-4">Data Report</h1>

        <div className="px-5 pb-3 border-b-2">

          <label className="font-semibold" htmlFor="1">File báo cáo</label>
          <div id="1" className="py-2">
            <UploadFile handleFileUpload={handleFileUpload} onRemove={handleRemoveFile} />
          </div>

          <label className="font-semibold" htmlFor="2">Khung thời gian</label>
          <div id="2" className="py-2">
            <TimeRangePicker setStartTime={setStartTime} setEndTime={setEndTime} />
          </div>

        </div>
        <div className={`flex ${totalAmount !== null ? 'justify-between' : 'justify-end'} items-center mt-5`}>
          {
            totalAmount !== null && (
              <div className="">
                <h3><span className="text-lg font-medium">Tổng tiền:</span> {totalAmount.toLocaleString()} VNĐ</h3>
              </div>
            )
          }
          <Button type="primary" onClick={handleCalculateTotal}>
            Tính toán
          </Button>
        </div>
      </div >
    </div>
  );
};

export default DataReport;
