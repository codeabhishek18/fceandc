import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import enrollmentService from "@/services/enrollment.service";
const enrollmentInstance = new enrollmentService(); 

export async function PUT(req, {params}) 
{
    try
    {
        await dbConnect();

        const { enrollmentId } = params;
        const { access } = await req.json();
        await enrollmentInstance.updateAccess(enrollmentId, access)
        return NextResponse.json({message : access ==='true' ? 'Access Granted' : 'Acccess Revoked'});
    }    
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

