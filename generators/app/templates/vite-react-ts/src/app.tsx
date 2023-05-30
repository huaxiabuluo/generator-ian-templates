import React, { Suspense, useEffect } from 'react';
import { Layout, ConfigProvider, theme, Spin } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RoutePath } from '@/interfaces';
import Dashboard from '@/pages/Dashboard';
import { useStore } from '@/stores';
import styles from './app.module.less';

const { Content, Footer } = Layout;

const Mine = React.lazy(() => import('@/pages/Mine'));
const NotFound = React.lazy(() => import('@/components/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:labId" element={<Outlet />}>
              <Route path={RoutePath.Mine} element={<Mine />} />
              <Route index element={<Navigate to={RoutePath.Mine} replace={true} />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>footer</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default observer(function AppProvider() {
  const { pageLoading, setPageLoading } = useStore().common;

  useEffect(() => {
    setTimeout(() => setPageLoading(false), 1000);
  }, []);

  return (
    <Suspense fallback={null}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Spin spinning={pageLoading}>
          <App />
        </Spin>
      </ConfigProvider>
    </Suspense>
  );
});
