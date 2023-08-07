import connectDb from "@/middleware/mongoose";
import User from "@/models/user";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    const existingUsernames = await User.find({}, { _id: 0, username: 1 })
    function isUsernameUnique(username, existingUsernames) {
        return !existingUsernames.some(user => user.username === username);
    }
    function generateUsername(name) {
        const sanitizedName = name.toLowerCase().replace(/\s/g, '');
        // Generate a random number between 0 and 999
        const randomNumber = Math.floor(Math.random() * 1000);
        let username = sanitizedName + randomNumber;

        // Check if the generated username is already in use
        let counter = 1;
        while (!isUsernameUnique(username, existingUsernames)) {
            username = username + counter
            counter++;
        }
        return username;
    }

    if (req.method == 'POST') {
        try {
            let u = new User({
                name: req.body.name,
                username: await generateUsername(req.body.name),
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
            })
            await u.save()
            res.status(200).json({ success: "success" })

        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyValue && error.keyPattern.email) {
                res.status(400).json({ error: 'Email address already in use' });
            }
            else if (error.code === 11000 && error.keyPattern && error.keyValue && error.keyPattern.username) {
                res.status(400).json({ error: 'Usename address already in use' });
            } else {
                // Other errors
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    else {
        res.status(405).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)