'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { PageRoute } from '@/utils/constant';
import { getAppAbsPath } from '@/actions/path';
import { AbsoluteLink, ActionContentContainer, AppBar, AppToolbar, MenuTab, MenuTabs } from './styles';

export default function PageHeader() {
  const [langAnchorEle, setLangAnchorEle] = useState<null | HTMLElement>(null);
  const changeLang = useCallback(async (lang: string) => {
    setLangAnchorEle(null);
    const res = await getAppAbsPath(3, 7);
    console.log('=====res', res);
  }, []);
  const headerRoutes = useMemo(() => Object.values(PageRoute).filter((route) => route !== PageRoute.Root), []);
  const pathname = usePathname();
  const currentRoute = pathname.split('/')[1] as PageRoute | undefined;

  return (
    <AppBar position="sticky">
      <AppToolbar>
        <Link href={`/${PageRoute.Root}`} style={{ height: '38px' }}>
          <Box
            component="img"
            loading="lazy"
            height={38}
            width={115}
            alt="Explorer"
            src="/images/studio-logo-light.png"
            mr={2}
          />
        </Link>
        <ActionContentContainer>
          <MenuTabs value={currentRoute || false}>
            {headerRoutes.map((route) => (
              <MenuTab
                key={route}
                value={route}
                label={
                  <Box component="span">
                    {route}
                    <AbsoluteLink href={`/${route}`} />
                  </Box>
                }
              />
            ))}
          </MenuTabs>
        </ActionContentContainer>
        <Box sx={{ flexGrow: 0 }}>
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" aria-haspopup="menu" onClick={(e) => setLangAnchorEle(e.currentTarget)}>
              <LanguageIcon />
            </IconButton>
          </Stack>
        </Box>
      </AppToolbar>
      <Menu
        anchorEl={langAnchorEle}
        open={!!langAnchorEle}
        onClose={() => setLangAnchorEle(null)}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={() => changeLang('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLang('zh')}>中文</MenuItem>
      </Menu>
    </AppBar>
  );
}
