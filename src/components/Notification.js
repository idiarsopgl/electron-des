import React, { forwardRef } from 'react';
import { Snackbar, Alert, AlertTitle, Typography } from '@mui/material';

const Notification = forwardRef((props, ref) => {
  const {
    open,
    onClose,
    message,
    title,
    severity = 'info',
    autoHideDuration = 6000,
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    action,
    ...other
  } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(event, reason);
  };

  return (
    <Snackbar
      ref={ref}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      sx={{ mt: 6 }}
      {...other}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%', alignItems: 'center' }}
        action={action}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        <Typography variant="body2" component="div">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
});

export default Notification;
