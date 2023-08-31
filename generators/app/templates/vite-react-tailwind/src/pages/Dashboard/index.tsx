import { Button } from 'antd';
import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex items-center p-0 h-6 before:bgline after:bgline [&_.ant-btn>span]:!text-red-500">
      <span className="py-0 px-3">
        <Button>123</Button>
      </span>
    </div>
  );
}
