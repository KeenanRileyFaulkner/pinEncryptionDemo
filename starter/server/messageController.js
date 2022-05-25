const bcrypt = require('bcryptjs');
let chats = [];

module.exports = {
    createMessage: (req, res) => {
        const { pin, message } = req.body;

        for(let i = 0; i < chats.length; ++i) {
            let existing = bcrypt.compareSync(pin, chats[i].pinHash);
            if(existing) {
                chats[i].messages.push(message);
                let messagesToReturn = {...chats[i]};
                delete messagesToReturn.pinHash
                res.status(200).send(messagesToReturn);
                return;
            }
        }

        let salt = bcrypt.genSaltSync(5);
        let pinHash = bcrypt.hashSync(pin, salt);

        const newChat = {
            pinHash,
            messages: [message]
        }

        chats.push(newChat);
        let messagesToReturn = {...newChat};
        delete messagesToReturn.pinHash;
        res.status(200).send(messagesToReturn);
    }
}