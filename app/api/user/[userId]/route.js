import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
import { NextResponse } from "next/server";
const userInstance = new userService();

export async function PUT(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const { newPassword } = await req.json();
        await userInstance.resetPassword(userId, newPassword);
        return NextResponse.json({message: 'Password updated'})
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}

export async function GET(req, {params})
{ 
    try
    { 
        await dbConnect();
         
        const { userId } = params;
        const user = await userInstance.getUserById(userId);
        return NextResponse.json(user)
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}