'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function AuthTest() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendOtp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'whatsapp' },
    });

    setLoading(false);
  };

  async function verifyOtp() {
    setLoading(true);
    const {
      data: { session },
      error: verificationError
    } = await supabase.auth.verifyOtp({
      phone,
      token: password,
      type: "sms",
    })

    if (verificationError) return verificationError;

    const {
      data,
      error: sessionError
    } = await supabase.auth.setSession(session)

    setLoading(false);
  };

  return (
    <div className="flex w-full max-w-2xl items-center space-x-2">
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
        onClick={() => sendOtp()}
      >Send OTP</Button>
      <Input
        type="text"
        placeholder="Input OTP"
        label="OTP"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        onClick={() => verifyOtp()}
        disabled={loading}
      >Verfy OTP</Button>
    </div>
  )
}
