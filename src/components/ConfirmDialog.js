import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Box,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  content = 'Apakah Anda yakin ingin melanjutkan?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  confirmColor = 'primary',
  cancelColor = 'inherit',
  loading = false,
  maxWidth = 'sm',
  fullWidth = true,
  hideCancelButton = false,
  disableConfirmButton = false,
  disableCancelButton = false,
  showIcon = true,
  dialogProps = {},
  contentProps = {},
  titleProps = {},
  actionsProps = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      {...dialogProps}
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          ...(titleProps.sx || {}),
        }}
        {...titleProps}
      >
        {showIcon && (
          <WarningIcon color="warning" fontSize="large" />
        )}
        <Typography variant="h6" component="span">
          {title}
        </Typography>
      </DialogTitle>
      
      <DialogContent {...contentProps}>
        {typeof content === 'string' ? (
          <DialogContentText id="confirm-dialog-description">
            {content}
          </DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      
      <DialogActions
        sx={{
          p: 2,
          gap: 1,
          ...(actionsProps.sx || {}),
        }}
        {...actionsProps}
      >
        {!hideCancelButton && (
          <Button
            onClick={onClose}
            color={cancelColor}
            disabled={loading || disableCancelButton}
            variant="outlined"
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={loading || disableConfirmButton}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
        >
          {loading ? 'Memproses...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
