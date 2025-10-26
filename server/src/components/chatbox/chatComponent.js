import MessageDetail from '../model/ChatText.js';

const chatComponent = (io) => {
    let rooms = [];

    const generateRoomID = () => Math.floor(Math.random() * 90000) + 10000;

    io.on('connection', (socket) => {
        console.log(`⚡: User connected - ${socket.id}`);

        socket.on('getRooms', () => {
            io.emit('roomsList', rooms);
        });

        socket.on('create', (data) => {
            const newRoom = {
                roomID: generateRoomID(),
                title: data.title,
                selectedName: data.selectedName,
            };

            rooms.push(newRoom);

            socket.join(newRoom.roomID);
            socket.data = { ...newRoom };

            socket.emit('roomDetails', newRoom);
            io.emit('roomsList', rooms);
        });

        socket.on('join', (room) => {
            socket.join(room.roomID);
            socket.data = { ...room };
            socket.emit('roomDetails', room);
        });

        socket.on('message', async (data) => {
            const message = new MessageDetail({
                room_id: data.roomDetails.roomID,
                username: data.username,
                title: data.roomDetails.title,
                sender: data.roomDetails.selectedName,
                content: data.text,
            });

            await message.save();

            io.to(data.roomDetails.roomID).emit('messageResponse', data);
        });

        socket.on('typing', (data) => {
            socket.to(socket.data?.roomID).emit('typingResponse', data);
        });

        socket.on('disconnect', () => {
            const { roomID, title } = socket.data || {};
            if (roomID && title) {
                rooms = rooms.filter(
                    (room) => room.roomID !== roomID || room.title !== title
                );
                io.emit('roomsList', rooms);
            }

            console.log(`❌: User disconnected - ${socket.id}`);
        });
    });
};

export default chatComponent;