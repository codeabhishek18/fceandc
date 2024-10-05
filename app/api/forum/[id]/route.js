
import dbConnect from "@/dbConfig/dbConnect";
import forumService from "@/services/forum.service";
import { NextResponse } from "next/server";
const forumInstance = new forumService();

export async function DELETE(req, {params})
{
    try
    {
        await dbConnect();
        const {id} = params;
        await forumInstance.deleteById(id);
        return NextResponse.json({message : 'Discussion deleted'})
    }
    catch(error)
    {
        return error
    }
}