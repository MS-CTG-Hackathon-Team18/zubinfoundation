"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ZubiNest
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

const theme = createTheme({
  typography: {
    fontFamily: "font-sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#404040",
      secondary: "#fcd34d",
      third: "#fde68a",
    },
  },
});

export default function SignUp() {
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill("")); // State to manage OTP input
  const [codeSent, setCodeSent] = useState(false); // State to manage if code is sent
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  })

  const handleSendVerificationCode = async () => {
    setShowOTP(true);
    setCodeSent(true);
    // Add your logic to send the verification code here
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error sending OTP:', error);
    }

  };

  const handleResendCode = async () => {
    // Logic to resend the verification code
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, userName: userName }),
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerification = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password: password }),
      });

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "primary.secondary", color: "primary.main" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setUserName(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setUserName(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                  }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              {showOTP && (
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div className="text-gray-500">
                      <h4>One-time Password:</h4>
                    </div>
                    <InputOTP
                      maxLength={6}
                      value={password}
                      onChange={(value) => setPassword(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to be updated on upcoming events & promotions from Zubin Foundation."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 1,
                bgcolor: "primary.secondary",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "primary.third", // Same background color on hover
                  boxShadow: "none", // Remove any shadow effects
                },
              }}
              onClick={handleSendVerificationCode}
              disabled={codeSent}
            >
              Send Verification Code
            </Button>
            {showOTP && (
              <>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 1 }}
                  onClick={handleResendCode}
                >
                  Resend
                </Button>
              </>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleVerification}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
