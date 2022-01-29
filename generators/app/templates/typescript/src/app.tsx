import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import NotFound from '~/components/NotFound';
import { RoutePath } from '~/interfaces';
import Dashboard from '~/pages/Dashboard';
// import Mine from '~/pages/Mine';
// import LabWrapper from '~/components/LabWrapper';
import styles from './app.module.less';

const { Content, Footer } = Layout;

const Mine = React.lazy(() => import(/* webpackChunkName: "mine" */ '~/pages/Mine'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notfound" */ '~/components/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Layout className={styles.layout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/:labId"
            element={
              <Content className={styles.content}>
                <Outlet />
              </Content>
            }
          >
            <Route path={RoutePath.Mine} element={<Mine />} />
            <Route index element={<Navigate to={RoutePath.Mine} replace={true} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
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

export const HotApp = hot(AppProvider);
