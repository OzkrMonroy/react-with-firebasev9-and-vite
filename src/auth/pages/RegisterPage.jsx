import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const formValidations = {
  email: [(value) => value.includes("@"), "El email debe de contener una @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe de poseer más de 6 caracteres",
  ],
  name: [(value) => value.length > 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const {
    name,
    email,
    password,
    nameValid,
    emailValid,
    passwordValid,
    formChanged,
    onInputChange,
  } = useForm(
    {
      name: "Test vite",
      email: "test20@test.com",
      password: "1234567",
    },
    formValidations
  );

  console.log({
    nameValid,
    emailValid,
    passwordValid,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setformChanged(true);
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container sx={{ mb: 5 }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Full name"
              placeholder="Pedro Pastor"
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formChanged}
              helperText={nameValid}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Email"
              placeholder="example@email.com"
              name="email"
              value={email}
              error={!!emailValid && formChanged}
              helperText={emailValid}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              error={!!passwordValid && formChanged}
              helperText={passwordValid}
              onChange={onInputChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Create account
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Typography sx={{ mr: 1 }}>Have already an account?</Typography>
          <Link component={RouterLink} color="inherit" to={"/auth/login"}>
            Login
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
