import { Row, Col, Button } from 'antd';

export default function NotFound() {
  return (
    <Row className="m-auto w-[60%] min-h-[500px] p-6">
      <Col span={12}>
        <div className="h-full bg-contain bg-center bg-no-repeat bg-[url('https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg')]" />
      </Col>
      <Col span={10} offset={2} className="flex flex-col justify-center">
        <h1 className="mb-6 text-7xl text-[#434e59] font-semibold">404</h1>
        <div className="mb-6 text-xl">抱歉，你访问的页面不存在</div>
        <Button className="w-28" type="primary" onClick={() => {}}>
          返回首页
        </Button>
      </Col>
    </Row>
  );
}
