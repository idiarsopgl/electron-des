import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const FormDialog = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Simpan',
  cancelLabel = 'Batal',
  maxWidth = 'md',
  fullWidth = true,
  loading = false,
  disableSubmit = false,
  disableCancel = false,
  showDivider = true,
  hideButtons = false,
  customActions,
  dialogProps = {},
  contentProps = {},
  titleProps = {},
  actionsProps = {},
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsSubmitting(false);
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(e);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!isSubmitting ? onClose : undefined}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      aria-labelledby="form-dialog-title"
      {...dialogProps}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...(titleProps.sx || {}),
          }}
          {...titleProps}
        >
          <Typography variant="h6" component="span">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        {showDivider && <Divider />}
        
        <DialogContent
          dividers
          sx={{
            position: 'relative',
            minHeight: 100,
            ...(contentProps.sx || {}),
          }}
          {...contentProps}
        >
          {isSubmitting && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {children}
        </DialogContent>
        
        {!hideButtons && (
          <DialogActions
            sx={{
              p: 2,
              ...(actionsProps.sx || {}),
            }}
            {...actionsProps}
          >
            {customActions || (
              <>
                {!disableCancel && (
                  <Button
                    onClick={onClose}
                    disabled={isSubmitting}
                    color="inherit"
                  >
                    {cancelLabel}
                  </Button>
                )}
                {!disableSubmit && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || loading}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : null
                    }
                  >
                    {isSubmitting ? 'Menyimpan...' : submitLabel}
                  </Button>
                )}
              </>
            )}
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};

export default FormDialog;
