const Board = require("./Board.js");

global.fs = require("fs");
const _canvas = {createCanvas, loadImage} = require("canvas");
global.loadImage = _canvas.loadImage;

const {Client, Attachment, Channel} = require("discord.js");
global.client = new Client();
require("dotenv").config();
client.login(process.env.DISCORD_TOKEN);

var board;
var prefix = "!";

global.canvas = createCanvas(96*8, 96*8);
global.ctx = canvas.getContext("2d");

client.once("ready", () => {
    console.log("Vote Chess Bot is online!");

    board = new Board();

    // client.channels.fetch("808496211967475725")
    // .then(channel => {
    //     channel.send("", {files: ["images\\test.png"]})
    // });
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //if (message.channel.id != "809628144386441216") return;

    const args = message.content.slice(prefix.length).split(/ +/);

    let command = args[0];

    if (command == "board") {
        board.show(message);
    } else if (command == "reset") {
        board = new Board();
        board.show(message);
    } else {
        if (args.length == 2) {
            let fromCoords = args[0];
            let toCoords = args[1];

            let fromFile = fromCoords[0].toLowerCase();
            let fromRank = fromCoords[1];
            let toFile = toCoords[0].toLowerCase();
            let toRank = toCoords[1];

            let validCoords = true;

            let fromCol = ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(fromFile);
            let toCol = ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(toFile);

            let fromRow = ["8", "7", "6", "5", "4", "3", "2", "1"].indexOf(fromRank);
            let toRow = ["8", "7", "6", "5", "4", "3", "2", "1"].indexOf(toRank);

            if (fromCol < 0 || toCol < 0 || fromRow < 0 || toRow < 0) {
                message.channel.send("Those are invalid coordinates!");
                return;
            }

            if (!board.grid[fromRow][fromCol].piece) {
                message.channel.send("There is no piece at that square!");
                return;
            }

            board.movePiece(fromRow, fromCol, toRow, toCol);
            board.show(message);
        }
    }




});