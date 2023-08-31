import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores';

export default observer(function Mine() {
  const { common } = useStore();
  return <div>{common.user.name}</div>;
});
