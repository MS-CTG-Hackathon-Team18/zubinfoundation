import { NextResponse } from 'next/server';
import { sendSignUpOtp } from "@/app/api/auth/actions";

export async function POST(request) {
  const { phone, userName } = await request.json();
  try {
    const result = await sendSignUpOtp(phone, userName);
    if (result.success === true) {
      return NextResponse.json({ success: true, message: 'OTP sent successfully' });
    } else {
      return NextResponse.json({ success: false, error: result.error });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
