const http = require("http")
const express = require("express")
const cors = require("cors")
const app = express()
const httpServer = http.createServer(app)

const io = require("socket.io")(httpServer)
const mongoose = require("mongoose")
const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign
require("dotenv").config({ path: "../.env" })


const port = process.env.NODE_PORT
const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}
const token = sign(payload, secret_key)
const market_all = {
    method: "GET",
    url: server_url + "/v1/market/all",
    headers: {Authorization: `Bearer ${token}`},
}

request(market_all, (error, response, body) => {
    if (error) throw new Error(error)
	mongoose.connection.db.dropDatabase()
    updateDB(JSON.parse(body))
})

const uri = 'mongodb://localhost/hongsea'

mongoose.connect(uri, {
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Hongsea MongoDB connected!");
});

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomString = () => {
	return Math.random().toString(36).substring(2, randomInteger(6, 10));
}

const Schema = mongoose.Schema;
const coinSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true,
            unique: true,
            createdAt: Number,
            updatedAt: Number
        },
        name: {
            type: String,
            required: true,
            createdAt: Number,
            updatedAt: Number
        },
    },
    { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const chatSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true,
            createdAt: Number,
            updatedAt: Number
        },
        text: {
            type: String,
            required: true,
            createdAt: Number,
            updatedAt: Number
        },
        likes: {
            type: Number,
			default: 0,
            createdAt: Number,
            updatedAt: Number
        },
    },
    { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const Coin = mongoose.model("Coin", coinSchema)
const Chat = mongoose.model("Chat", chatSchema)

function updateDB(data) {
	Chat.deleteMany({}, () => {})
    Coin.deleteMany({}, () => {
        const added = []
        for (let i = 0; i < data.length; i++) {
            const market = data[i].market
            const symbol = market.split('-')[1]
            const name = data[i].korean_name
            if (!added.includes(symbol)) {
                added.push(symbol)
                Coin.create({ symbol, name })
            }
        }
    })
}

app.route('/coins').get((req, res) => {
    Coin.find().sort({ name: 1 })
        .then((coins) => {
            res.json(coins)
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

app.route('/chat').get((req, res) => {
	Chat.find({ symbol: req.query.symbol })
		.then((coins) => {
			res.json(coins)
		})
		.catch((err) => res.status(400).json("Error: " + err));
})

app.route('/chat/create').post((req, res) => {
	const symbol = req.body.symbol
	const text = req.body.text
	Chat.create({ symbol, text })
})

app.listen(port, () => {
    console.log(`Server ON - port ${port}`)
})

io.on('connection' , function(socket) {
    console.log('Connect from Client: ' + socket)

    socket.on('chat', function(data){
        console.log('message from Client: '+data.message)

        const rtnMessage = {
            message: data.message
        }

        socket.broadcast.emit('chat', rtnMessage)
    })
})

httpServer.listen(process.env.SOCKET_PORT, function() {
    console.log('SOCKET IO listening port 5051')
})
