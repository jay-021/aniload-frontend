import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Auth/axios";
import { Toaster, toast } from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = data;
    try {
      const response = await axios.post(`/admin/signup`, payload);
      toast.success(response.data.message);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/admin-login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Box sx={{ width: "500px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link to="/login" color="primary">
                    Log In
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

export default SignUp;
