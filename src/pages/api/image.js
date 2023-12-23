import connectDb from "@/middleware/mongoose";
import Image from "@/models/image";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            let image = new Image(req.body)
            await image.save();
            const imageId = image._id
            res.status(200).json({ imageId })
        } catch (error) {
            console.log(error)
        }
    }
    else if (req.method === 'GET') {
        try {
            const { imageId } = req.query
            const image = await Image.find({ _id: imageId })
            res.status(200).json({ success: "true", image: image })
        } catch (error) {
            console.log(error)
        }
    }
    else if (req.method === 'DELETE') {
        try {
            await Image.findByIdAndDelete(req.query.imageId)
            return res.status(200).json({ success: true })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else {
        res.status(405).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)