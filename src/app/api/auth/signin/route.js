import { NextResponse } from 'next/server';
import { sendSignInOtp } from "@/app/auth/actions";

export async function POST(request) {
  const { phone } = await request.json();
  try {
    const result = await sendSignInOtp(phone);
    if (result.success === true) {
      return NextResponse.json({ success: true, message: 'OTP sent successfully' });
    } else {
      return NextResponse.json({ success: false, error: result.error });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
