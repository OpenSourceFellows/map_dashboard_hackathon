
import React from 'react';
import { Box, Typography } from '@mui/material';

export const AccountPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        color="text.secondary"
      >
        Page upcoming 🛠️
      </Typography>
    </Box>
  );
};
