const Discord = require("discord.js");

const Piece = require("./Piece.js");
const Square = require("./Square.js");

module.exports = class Board {
    constructor() {
        this.grid = [];
        for (let r = 0; r < 8; r ++) {
            this.grid.push([]);
            for (let c = 0; c < 8; c++) {
                this.grid[r].push(new Square(r, c));
            };
        }

        this.setInitialPosition();
    }

    movePiece(atRow, atCol, toRow, toCol) {
        if (!this.grid[atRow][atCol].piece) return false;

        this.grid[toRow][toCol].piece = this.grid[atRow][atCol].piece;
        this.grid[atRow][atCol].piece.square = this.grid[toRow][toCol];
        this.grid[atRow][atCol].piece = undefined;
    }

    show(message) {

        let showSquares = async() => {
            for (let r = 0; r < 8; r += 1) {
                for (let c = 0; c < 8; c += 1) {
                    this.grid[r][c].show();
                }
            }
        };

        showSquares().then(() => {
            const buffer = canvas.toBuffer("image/png");
            const attachment = new Discord.MessageAttachment(buffer, "image.png");
            message.channel.send("", attachment)
        });;
    }

    setInitialPosition() {
        this.grid[0][0].piece = new Piece("rook", "black", this.grid[0][0]);
        this.grid[0][1].piece = new Piece("knight", "black", this.grid[0][1]);
        this.grid[0][2].piece = new Piece("bishop", "black", this.grid[0][2]);
        this.grid[0][3].piece = new Piece("queen", "black", this.grid[0][3]);
        this.grid[0][4].piece = new Piece("king", "black", this.grid[0][4]);
        this.grid[0][5].piece = new Piece("bishop", "black", this.grid[0][5]);
        this.grid[0][6].piece = new Piece("knight", "black", this.grid[0][6]);
        this.grid[0][7].piece = new Piece("rook", "black", this.grid[0][7]);

        this.grid[7][0].piece = new Piece("rook", "white", this.grid[7][0]);
        this.grid[7][1].piece = new Piece("knight", "white", this.grid[7][1]);
        this.grid[7][2].piece = new Piece("bishop", "white", this.grid[7][2]);
        this.grid[7][3].piece = new Piece("queen", "white", this.grid[7][3]);
        this.grid[7][4].piece = new Piece("king", "white", this.grid[7][4]);
        this.grid[7][5].piece = new Piece("bishop", "white", this.grid[7][5]);
        this.grid[7][6].piece = new Piece("knight", "white", this.grid[7][6]);
        this.grid[7][7].piece = new Piece("rook", "white", this.grid[7][7]);

        for (let c = 0; c < 8; c += 1) {
            this.grid[1][c].piece = new Piece("pawn", "black", this.grid[1][c]);
            this.grid[6][c].piece = new Piece("pawn", "white", this.grid[6][c]);
        }
    }
}