import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, onGoogleSignIn } from "../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: "test20@test.com",
    password: "1234567",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") return;

    console.log({ email, password });
    dispatch(checkingAuthentication(email, password));
  };

  const googleSignIn = () => {
    console.log("Google signin");
    dispatch(onGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container sx={{ mb: 5 }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="example@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={onInputChange}
              type="password"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={googleSignIn} fullWidth>
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
