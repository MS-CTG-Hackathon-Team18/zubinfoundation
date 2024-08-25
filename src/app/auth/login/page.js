"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Container from "@mui/material/Container";

// Define the theme
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

export default function SignInSide() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill("")); // State to manage OTP input
  const [codeSent, setCodeSent] = useState(false); // State to manage if code is sent

  const handleSendVerificationCode = async () => {
    setShowOTP(true);
    setCodeSent(true);
    // Add your logic to send the verification code here
    try {
      const response = await fetch('/api/auth/signin', {
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
    console.log("Verification code sent.");
  };

  const handleResendCode = async () => {
    // Logic to resend the verification code
    try {
      const response = await fetch('/api/auth/signin', {
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
    console.log("Verification code sent.");
    console.log("Verification code resent.");
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

      if (data.success) router.push('/')
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={7}
          sx={{
            backgroundImage: 'url("../../../zubin_foundation.png")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
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
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 18,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="phoneNumber"
//                   label="Phone Number"
//                   name="phoneNumber"
//                   autoComplete="phone"
//                 />
//               </Grid>
//               {showOTP && (
//                 <Grid item xs={12}>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginTop: "10px",
//                     }}
//                   >
//                     <div className="text-gray-500">
//                       <h4>One-time Password:</h4>
//                     </div>
//                     <InputOTP maxLength={6}>
//                       <InputOTPGroup>
//                         <InputOTPSlot index={0} />
//                         <InputOTPSlot index={1} />
//                         <InputOTPSlot index={2} />
//                       </InputOTPGroup>
//                       <InputOTPSeparator />
//                       <InputOTPGroup>
//                         <InputOTPSlot index={3} />
//                         <InputOTPSlot index={4} />
//                         <InputOTPSlot index={5} />
//                       </InputOTPGroup>
//                     </InputOTP>
//                   </div>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to be updated on upcoming events & promotions from Zubin Foundation."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="button"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 1 }}
//               onClick={handleSendVerificationCode}
//               disabled={codeSent}
//             >
//               Send Verification Code
//             </Button>
//             {showOTP && (
//               <>
//                 <Button
//                   type="button"
//                   fullWidth
//                   variant="outlined"
//                   sx={{ mb: 1 }}
//                   onClick={handleResendCode}
//                 >
//                   Resend
//                 </Button>
//               </>
//             )}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 1, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/auth/login" variant="body2">
//                   "Don't have an account? Sign Up"
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Box sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
