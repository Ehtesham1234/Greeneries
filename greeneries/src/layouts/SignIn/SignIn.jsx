import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { loginAsync } from "../../features/Auth/authSlice";
// import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { IconButton, InputAdornment } from "@mui/material";
import Iconify from "./Iconify";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";

export default function SignIn({ open, handleClose, setIsSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const rememberedEmail = localStorage.getItem("email");
  //     const rememberedPassword = localStorage.getItem("password");
  //     if (rememberedEmail && rememberedPassword) {
  //       setEmail(rememberedEmail);
  //       setPassword(rememberedPassword);
  //       setRememberMe(true);
  //     }
  //   }, []);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    // else if (!passwordRegex.test(password)) {
    //   newErrors.password =
    //     "Password must have at least 8 characters with at least one digit, one lowercase, and one uppercase letter.";
    //   isValid = false;
    // }

    setErrors(newErrors);

    return isValid;
  };

  //   const handleLoginError = (errorMessage) => {
  //     toast.error(errorMessage);
  //   };

  //   const handleLoginSuccess = () => {
  //     toast.success("Login successful!");
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     if (!validateForm()) {
  //       return;
  //     }

  //     try {
  //       const action = await dispatch(loginAsync({ email, password }));
  //       if (action.payload.isSuccess) {
  //         // console.log(action, "action");
  //         handleLoginSuccess();
  //         // dispatch(setToken(action.payload.token));
  //         navigate("/");
  //       } else {
  //         handleLoginError(action.payload.message);
  //       }
  //     } catch (error) {
  //       handleLoginError("Login request failed");
  //     }
  //   };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      style={{ zIndex: 2000 }} // Increase the z-index
    >
      <Fade in={open}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              position: "relative", // Add this to contain the absolute positioning of the close button
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 }} // Position the close button
            >
              <CloseIcon />
            </IconButton>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              //  onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                size="small"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => setIsSignUp(true)}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
}
