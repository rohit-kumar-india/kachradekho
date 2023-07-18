import connectDb from "@/middleware/mongoose";
import Image from "@/models/image";

const handler = async (req, res) => {
    const { imageId } = req.query;
    try {
        const image = await Image.find({_id:imageId});
        console.log(image)
        res.status(200).json({image});
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default connectDb(handler)