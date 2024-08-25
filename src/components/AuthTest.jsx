'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AuthTest() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserName(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendSignInOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, isSignUp: false }),
      });

      const data = await response.json();

    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  }

  const sendSignUpOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, userName: userName }),
      });

      const data = await response.json();

    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  }

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password: password }),
      });

      const data = await response.json();

    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Input Phone Number"
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        type="submit"
        disabled={loading}
        onClick={sendSignInOtp}
      >Send Sign In OTP</Button>
      <Input
        type="text"
        placeholder="Input OTP"
        label="OTP"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        onClick={verifyOtp}
        disabled={loading}
      >Verfy OTP</Button>
      <Input
        type="text"
        placeholder="Input First Name"
        label="Phone"
        name="firstName"
        value={userName.firstName}
        onChange={(e) => setUserName(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))}
      />
      <Input
        type="text"
        placeholder="Input Last Name"
        label="Phone"
        name="lastName"
        value={userName.lastName}
        onChange={(e) => setUserName(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
        }))}
      />
      <Button
        type="submit"
        disabled={loading}
        onClick={sendSignUpOtp}
      >Send Sign Up OTP</Button>
    </div>
  )
}
