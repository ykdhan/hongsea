const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign
require("dotenv").config({ path: "../config.env" })

const app = express()
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
            unique: true,
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

app.route('/chat:symbol').get((req, res) => {
	Chat.find({ symbol: req.params.symbol })
		.then((coins) => {
			res.json(coins)
		})
		.catch((err) => res.status(400).json("Error: " + err));
})

app.route('/chat/create').post((req, res) => {
	const symbol = req.params.symbol
	const text = req.body.text
	Chat.create({ symbol, text })
})

app.listen(port, () => {
    console.log(`Server ON - port ${port}`);
});
