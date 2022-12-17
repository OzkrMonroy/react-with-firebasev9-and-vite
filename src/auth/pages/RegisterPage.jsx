import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container sx={{ mb: 5 }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Full name"
              name="name"
              placeholder="Pedro Pastor"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Email"
              name="email"
              placeholder="example@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
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
