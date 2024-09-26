import { Lecture } from "@/models/lecture.model";

class lectureService
{
    async addNewLecture(title, recording)
    {
        try
        {
            const lecture = await Lecture.create({title, recording})
            await lecture.save();
            return lecture
        }
        catch(error)
        {
            throw error
        }
    }
}

export default lectureService