import connectDb from "@/middleware/mongoose";
import Project from "@/models/project";

const handler = async (req, res) => {
    try {
        //for creating the project
        if (req.method === 'POST') {
            const { productName, caption, images, user } = req.body;
            const project = new Project(req.body);
            //let project = new Project({ productName, caption, images, user, likes: 0 });
            await project.save();
            const projectId = project._id
            res.status(200).json(projectId);
        }

        // for getting the project data
        else if (req.method === 'GET') {
            const { limit, page, projectId } = req.query;

            if (limit && page) {
                const limitValue = parseInt(limit, 10) || 5;
                const pageValue = parseInt(page, 10) || 1;

                const skip = (pageValue - 1) * limitValue;
                const projects = await Project.find().sort({ createdAt: -1 }).skip(skip).limit(limitValue);
                res.status(200).json(projects);
            }

            //fetch single project with id
            else if (projectId) {
                const project = await Project.findOne({ "_id": projectId })
                res.status(200).json(project)
            }
        }

        // for updating likes
        else if (req.method === 'PUT') {
            const { like, commentId } = req.body;
            // console.log(req.body)
            if (like) {
                const project = await Project.findByIdAndUpdate(req.body.projectId, { likes: like }, { new: true });
                if (!project) {
                    res.status(404).json({ message: 'project not found' });
                }
                res.status(200).json({ success: "success" });
            }
            else if (commentId) {
                const project = await Project.findById(req.body.projectId);

                // Check if the project exists
                if (!project) {
                    return res.status(404).json({ message: "Project not found" });
                }

                // Add the new commentId to the comments array
                project.comments.push(commentId);

                // Save the updated project
                await project.save();

                return res.status(200).json({ success: "success" });
            }
        }

        //for deleting the project
        else if (req.method === "DELETE") {
            const result = await Project.findByIdAndDelete(req.query.projectId)
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(200).json({ success: true })
        }

        else {
            res.status(405).json({ error: "This method is not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }

}

export default connectDb(handler)