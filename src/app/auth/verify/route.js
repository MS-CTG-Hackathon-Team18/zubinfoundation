import { NextResponse } from 'next/server';
import { verifyOtp } from "@/app/auth/actions";

export async function POST(request) {
  const { phone, password } = await request.json();
  try {
    const result = await verifyOtp(phone, password);
    if (result.success === true) {
      return NextResponse.json({ success: true, message: 'Verified successfully' });
    } else {
      return NextResponse.json({ success: false, error: result.error });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
