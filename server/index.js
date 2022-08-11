const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const request = require('request')
const uuidv4 = require("uuid/v4")
const sign = require('jsonwebtoken').sign
require("dotenv").config({ path: "../config.env" })

const app = express()
const port = process.env.NODE_PORT
const accessKey = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secretKey = process.env.UPBIT_OPEN_API_SECRET_KEY
const serverUrl = process.env.UPBIT_OPEN_API_SERVER_URL

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const payload = {
    accessKey: accessKey,
    nonce: uuidv4(),
}
const token = sign(payload, secretKey)
const market_all = {
    method: "GET",
    url: serverUrl + "/v1/market/all",
    headers: {Authorization: `Bearer ${token}`},
}

request(market_all, (error, response, body) => {
    if (error) throw new Error(error)
    updateDB(JSON.parse(body))
})

const uri = 'mongodb://localhost/krypt'

mongoose.connect(uri, {
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Krypt MongoDB connected!");
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

const Coin = mongoose.model("Coin", coinSchema)

function updateDB(data) {
    Coin.deleteMany({}, () => {
        for (let i = 0; i < data.length; i++) {
            const symbol = data[i].market
            if (symbol.includes('KRW-'))
                Coin.create({
                    symbol: symbol.substring(4),
                    name: data[i].korean_name,
                })
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

app.listen(port, () => {
    console.log(`Server ON - port ${port}`);
});
