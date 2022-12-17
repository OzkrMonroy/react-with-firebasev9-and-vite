import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container sx={{ mb: 5 }}>
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
          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth>
              <Google />
              <Typography sx={{ ml: 2 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <Link component={RouterLink} color="inherit" to={"/auth/register"}>
            Create an account
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
