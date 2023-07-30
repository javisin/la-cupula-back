import React, { ReactNode } from 'react';
import './index.scss';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Index({ children }: { children: ReactNode }) {
  const tabRoutes = ['/home', '/profile'];
  const navigate = useNavigate();
  const location = useLocation();

  const selectedTab = tabRoutes.findIndex((route) => location.pathname.includes(route));
  const onClickTab = (tab: number) => {
    navigate(tabRoutes[tab]);
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      {children}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: 'primary.main',
        }}
      >
        <BottomNavigation
          sx={{ backgroundColor: 'primary.main' }}
          showLabels
          value={selectedTab}
          onChange={(_, newValue) => onClickTab(newValue)}
        >
          <BottomNavigationAction
            sx={{ color: 'gray' }}
            label="Reservas"
            icon={<EventIcon style={{ color: 'gray' }} />}
          />
          <BottomNavigationAction
            sx={{ color: 'gray' }}
            label="Perfil"
            icon={<PersonIcon style={{ color: 'gray' }} />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}