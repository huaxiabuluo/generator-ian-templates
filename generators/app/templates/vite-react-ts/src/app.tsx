import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { RoutePath } from '@/interfaces';
import Dashboard from '@/pages/Dashboard';
import styles from './app.module.less';

const { Content, Footer } = Layout;

const Mine = React.lazy(() => import(/* webpackChunkName: "mine" */ '@/pages/Mine'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notfound" */ '@/components/NotFound'));

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

export default function AppProvider() {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}
