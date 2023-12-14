import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../Auth/axios';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
      const payload = data;
      try {
          const response = await axios.post(`/user/signin`, payload)
          toast.success(response.data.message)
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
              setTimeout(() => {
                  navigate("/")
              }, 2000);
          }
      } catch (error) {
          toast.error(error.response.data.message)
      }
  };
  return (
    <>
      <Toaster position="top-right" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0'
        }}
      >
        <Box sx={{ width: '500px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Log In
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  Create account?{' '}
                  <Link to="/signup" color="primary">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;


