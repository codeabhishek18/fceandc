import dbConnect from "@/dbConfig/dbConnect";
import { sendEmail } from "@/services/email.service";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const userInstance = new userService();

export async function POST(req)
{
    try
    {
        
        await dbConnect();
        const { email } = await req.json();
        const isValidEmail = await userInstance.findByEmail(email);
        if(!isValidEmail)
            return NextResponse.json({message: 'Email not found'});
        const otp = Math.floor(100000 + Math.random() * 900000);
        await userInstance.updateOTP(isValidEmail._id, otp);
        await sendEmail(isValidEmail.email, 'Password Reset OTP', `Use the OTP below to reset your password. ${otp}`)
        return NextResponse.json({user: isValidEmail, message: 'E-mail sent'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}