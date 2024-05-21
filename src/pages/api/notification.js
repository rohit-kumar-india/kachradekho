import connectDb from "@/middleware/mongoose";
import Notification from "@/models/notification";
import axios from 'axios';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

// WebSocket connection handler
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Handle WebSocket messages
    console.log('Received WebSocket message:', message);
  });
});

const handler = async (req, res) => {
  try {
    if (!res.socket.server.wss) {
      // Associate the WebSocket server with the HTTP server
      const server = res.socket.server;

      server.wss = wss;
      server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      });
    }

    if (req.method === 'POST') {
      const notifi = new Notification(req.body);
      await notifi.save();
      
      // Broadcast notification to connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'notification', data: notifi }));
        }
      });

      res.status(200).json({ success: true });
    } else if (req.method === 'GET') {
      const { limit, page, currUser } = req.query;
      const limitValue = parseInt(limit, 10) || 10;
      const pageValue = parseInt(page, 10) || 1;
      const skip = (pageValue - 1) * limitValue;

      const notifications = await Notification.find({ receiver: currUser })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitValue);
      
       //formulate notifications with senderImage and project image 
      const NotificationsData = await Promise.all(notifications.map(async(notifi) => {
        const senderImage =  await findUserProfileImage(notifi?.sender);
        const projectImage = await findProjectImage(notifi?.projectId)
        return { 
               notifi, 
               "senderImage": senderImage, 
               "projectImage": projectImage
              }; 
      }));

      res.status(200).json(NotificationsData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//find user profile image from username
async function findUserProfileImage(username) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user?username=${username}`);
    const imageId = response.data.profilePicture; 
    const image = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`);
    return await image.data.image[0].file;
  } catch (error) {
    console.error('Error finding user profile image in notification route:', error.message);
    throw error;
  }
}

//find project image from projectId
async function findProjectImage(projectId) {
  console.log(projectId);
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/project?projectId=${projectId}`);
    const imageId = response.data.images[0]; 
    const image = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`);
    return await image.data.image[0].file;
  } catch (error) {
    console.error('Error finding project image in notification route:', error.message);
    throw error;
  }
}

export default connectDb(handler);
