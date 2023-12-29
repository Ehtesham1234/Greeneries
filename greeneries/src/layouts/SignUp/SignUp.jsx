import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { signUpAsync } from "../../features/Auth/authSlice"; // Replace with your actual signup action
// import "./SignUp.css"; // Create a separate CSS file for styling
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function SignUp({ handleClose, setIsSignUp, open }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Validate the fields here as needed, similar to the SignIn component
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

  //   const handleSignUpSuccess = () => {
  //     toast.success("Sign up successful!");
  //     navigate("/"); // Redirect to the login page or another appropriate page
  //   };

  //   const handleSignUpError = (errorMessage) => {
  //     toast.error(errorMessage);
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     if (!validateForm()) {
  //       return;
  //     }

  //     try {
  //       // Dispatch the signup action with the provided data
  //       const action = await dispatch(signUpAsync({ username, email, password }));

  //       if (action.payload) {
  //         handleSignUpSuccess();
  //       } else {
  //         handleSignUpError("Sign up request failed");
  //       }
  //     } catch (error) {
  //       // Handle signup errors
  //       handleSignUpError("Sign up request failed");
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
              Sign Up
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Link href="#" variant="body2" onClick={() => setIsSignUp(false)}>
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
}
