import { Mentor } from "../models/mentor.model.js";

class mentorService
{
    async addNewMentor(name, email, phone, about, experience, linkedin)
    {
        try
        {
            const mentor = await Mentor.create({name, email, phone, about, experience, linkedin})
            return await mentor.save();   
        }
        catch(error)
        {

            throw error
        }
    }

    async getAllMentors()
    {
        try
        {
            const mentors = await Mentor.find({})
            return mentors
        }
        catch(error)
        {
            throw new Error(error.message)
        }
    }
}

export default mentorService