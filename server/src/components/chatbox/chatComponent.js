const MessageDetail = require('../model/ChatText');

const chatComponent = (io) => {

    let rooms = new Array();

    const generateRoomID = () => {
        return Math.floor(100 * Math.random() * 900);
    }

    io.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);

        socket.on('getRooms', () => {
            io.emit('roomsList', rooms);
        })

        socket.on('create', (data) => {
            const newRoomID = generateRoomID();
            const newRoom = { roomID: newRoomID, title: data.title };
            rooms.push(newRoom);
            newRoom.selectedName = data.selectedName
            socket.join(newRoomID);
            socket.roomID = newRoomID;
            socket.title = data.title;
            socket.selectedName = data.selectedName;
            console.log(`User ${data.selectedName} created with status ${socket.title} in room ${socket.roomID}`);
            socket.emit('roomDetails', newRoom);
        });

        socket.on('join', (room) => {
            socket.join(room.roomID);
            socket.roomID = room.roomID;
            socket.title = room.title;
            socket.selectedName = room.selectedName;
            console.log(`User ${socket.selectedName} joined with status ${socket.title} in room ${socket.roomID}`);
            socket.emit('roomDetails', room);
        })

        socket.on('message', async (data) => {
            const messgae = new MessageDetail({
                room_id: data.roomDetails.roomID,
                username: data.username,
                title: data.roomDetails.title,
                sender: data.roomDetails.selectedName,
                content: data.text
            });
            await messgae.save();
            io.emit('messageResponse', data);
        });

        socket.on('typing', (data) => {
            socket.broadcast.to(socket.roomID).emit('typingResponse', data);
        });

        socket.on('disconnect', () => {
            let selectedRoom = { roomID: socket.roomID, title: socket.title };
            rooms = rooms.filter((element) => element.roomID !== selectedRoom.roomID || element.title !== selectedRoom.title);
            // console.log(`${socket.roomID} and ${socket.title}`);
            console.log(rooms);
            // console.log(`${socket.username} has disconnected!`)
        });
    });
    
}

module.exports = chatComponent;