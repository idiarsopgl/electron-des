import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  LinearProgress,
  Divider,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  ShoppingCart as OrdersIcon,
  AttachMoney as RevenueIcon,
  People as UsersIcon,
  TrendingUp as GrowthIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatCard = ({ title, value, icon: Icon, color, progress, change }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography color="textSecondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: `${color}.light`,
              color: `${color}.dark`,
              width: 56,
              height: 56,
              boxShadow: 2,
            }}
          >
            <Icon fontSize="large" />
          </Avatar>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Box width="100%" mr={1}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: `${color}.lighter`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: `${color}.main`,
                },
              }} 
            />
          </Box>
          <Typography variant="body2" color="textSecondary">
            {progress}%
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const RecentOrders = () => {
  // Sample data - replace with real data
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-06-15', amount: '$125.00', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-06-14', amount: '$89.99', status: 'processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-06-14', amount: '$235.50', status: 'pending' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '2023-06-13', amount: '$67.30', status: 'completed' },
    { id: '#ORD-005', customer: 'Michael Wilson', date: '2023-06-12', amount: '$154.99', status: 'completed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" component="h2">
            Recent Orders
          </Typography>
          <Button size="small" color="primary">
            View All
          </Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{order.amount}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={order.status} 
                      size="small" 
                      color={getStatusColor(order.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Welcome back! Here's what's happening with your store today.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Revenue" 
            value="$24,780" 
            icon={RevenueIcon} 
            color="success"
            progress={75}
            change="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Orders" 
            value="1,245" 
            icon={OrdersIcon} 
            color="primary"
            progress={60}
            change="+8%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Customers" 
            value="856" 
            icon={UsersIcon} 
            color="warning"
            progress={45}
            change="+15%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Growth" 
            value="+28.5%" 
            icon={GrowthIcon} 
            color="info"
            progress={85}
            change="+5%"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <Box height={300}>
                {/* Placeholder for chart */}
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  height="100%"
                  bgcolor="action.hover"
                  borderRadius={1}
                >
                  <Typography color="textSecondary">
                    Sales chart will be displayed here
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Products
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box key={item} mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2">Product {item}</Typography>
                      <Typography variant="body2" fontWeight={500}>25%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={75 - (item * 10)} 
                      sx={{ height: 8, borderRadius: 4 }} 
                      color={item % 2 === 0 ? 'primary' : 'secondary'}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box mt={3}>
        <RecentOrders />
      </Box>
    </Box>
  );
};

export default DashboardPage;
