import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  InputAdornment, 
  IconButton, 
  Divider,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
  maxWidth: 480,
  width: '100%',
  margin: '0 auto',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '10px 16px',
  borderRadius: 8,
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  '&.google': {
    backgroundColor: '#fff',
    color: '#757575',
    border: '1px solid #e0e0e0',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  '&.facebook': {
    backgroundColor: '#1877f2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#166fe5',
    },
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi proses login
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Simpan ke localStorage jika remember me dicentang
        if (formData.remember) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect ke dashboard admin React SPA
        navigate('/admin-dashboard');
      } else {
        setError('Email dan password harus diisi');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue to your dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="remember" 
                  checked={formData.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button 
              color="primary" 
              size="small"
              onClick={() => {}}
              sx={{ textTransform: 'none' }}
            >
              Forgot password?
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              py: 1.5, 
              borderRadius: 2, 
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              mt: 1,
              mb: 3
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR CONTINUE WITH
          </Typography>
        </Divider>

        <Box display="flex" gap={2} mb={3}>
          <SocialButton 
            fullWidth 
            variant="contained"
            className="google"
            startIcon={<Google />}
          >
            Google
          </SocialButton>
          <SocialButton 
            fullWidth 
            variant="contained"
            className="facebook"
            startIcon={<Facebook />}
          >
            Facebook
          </SocialButton>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Button 
              color="primary" 
              size="small"
              onClick={() => {}}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginPage;
