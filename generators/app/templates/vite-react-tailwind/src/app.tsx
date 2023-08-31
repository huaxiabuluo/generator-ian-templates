import React, { Suspense } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { RoutePath } from '@/interfaces';
import Dashboard from '@/pages/Dashboard';
import rootStore, { StoreProvider } from '@/stores';

const { Content, Footer } = Layout;

const Mine = React.lazy(() => import('@/pages/Mine'));
const NotFound = React.lazy(() => import('@/components/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Layout className="min-h-screen">
        <Content className="mt-16 p-6 bg-cover bg-no-repeat bg-center bg-[url('@images/example.jpg')] text-white">
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
      <StoreProvider value={rootStore}>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <App />
        </ConfigProvider>
      </StoreProvider>
    </Suspense>
  );
}
