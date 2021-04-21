var ratings = {};
var chessBoards = {};

function computeElo() {
	var meanElo = 0;
	var n = Object.keys(ratings).length;
	if (n == 0) {
		meanElo = '';
	} else {
		for (key in ratings) {
			meanElo += ratings[key] / n;
		}
	}
	document.getElementById('ratingValue').innerHTML = meanElo;
}

function setup(boardId) {
	delete ratings[boardId];
	computeElo();
	document.getElementById('answer_' + boardId).innerHTML = '';
	var onDrop = function(from, to) {
		if (to != 'offboard') {
			if (boardId in ratings) {
				return 'snapback';
			}
			
			var game = new Chess(chessBoards[boardId].fen() + ' ' + (boards[boardId].whiteToMove ? 'w' : 'b') + ' - - 0 1');
			var move = game.move({
				from : from,
				to : to,
				promotion : 'q' // always promote to queen
			});

			// illegal move
			if (move === null) {
				return 'snapback';
			}

			document.getElementById('answer_' + boardId).innerHTML = 'Your move: ' + from + ' - ' + to;

			var key = from + to;
			var rating = 1000;
			if (key in boards[boardId].moves) {
				rating = boards[boardId].moves[from + to];
			}

			ratings[boardId] = rating;
			computeElo();
		}
	};
	var cfg = {
		draggable : true,
		dropOffBoard : 'snapback', // this is the default
		position : boards[boardId].position,
		onDrop : onDrop
	};

	var cb = new ChessBoard(boardId, cfg);
	if (!boards[boardId].whiteToMove) {
		cb.flip();
	}
	chessBoards[boardId] = cb;
	return cb;
}

var boards = {
	board01 : {
		whiteToMove : false,
		position : {
			a8 : 'bR',
			c8 : 'bB',
			g8 : 'bK',
			g7 : 'bP',
			a6 : 'wP',
			c6 : 'bN',
			e6 : 'bP',
			f6 : 'bR',
			h6 : 'bP',
			a5 : 'bQ',
			c5 : 'bP',
			b4 : 'bB',
			d4 : 'wP',
			c3 : 'wN',
			f3 : 'wN',
			a2 : 'wP',
			b2 : 'wP',
			d2 : 'wQ',
			e2 : 'wB',
			f2 : 'wP',
			g2 : 'wP',
			h2 : 'wP',
			a1 : 'wR',
			e1 : 'wK',
			h1 : 'wR'
		},
		moves : {
			f6f3 : 2600,
			c5d4 : 1900,
			c6d4 : 1900,
			b4c3 : 1400,
			c8a6 : 1500,
			c6g6 : 1400,
			e6e5 : 1200,
			c8d7 : 1600
		}
	},

	board02 : {
		whiteToMove : true,
		position : {
			c8 : 'bN',
			d8 : 'bQ',
			f8 : 'bN',
			g8 : 'bK',
			f7 : 'bP',
			h7 : 'bP',
			e6 : 'bP',
			g6 : 'bP',
			h6 : 'wQ',
			a5 : 'bP',
			b5 : 'bB',
			d5 : 'bP',
			e5 : 'wP',
			g5 : 'wN',
			h5 : 'wP',
			b4 : 'bP',
			d4 : 'wP',
			g4 : 'wP',
			b3 : 'wP',
			g3 : 'wN',
			a2 : 'wP',
			f2 : 'wP',
			g2 : 'wB',
			g1 : 'wK'
		},
		moves : {
			g2e4 : 2600,
			g5h7 : 1950,
			h5g6 : 1900,
			g2f1 : 1400,
			g2d5 : 1200,
			f2f4 : 1400
		}
	},

	board03 : {
		whiteToMove : true,
		position : {
			d7 : 'bR',
			g7 : 'bP',
			a6 : 'bP',
			b6 : 'bP',
			d6 : 'wB',
			e6 : 'bP',
			g6 : 'bP',
			b5 : 'bK',
			c5 : 'wP',
			b4 : 'bN',
			e4 : 'wK',
			g3 : 'wR',
			b2 : 'wP',
			f2 : 'wP'
		},
		moves : {
			c5c6 : 2500,
			g3g6 : 2000,
			e4e5 : 1900,
			g3g5 : 1700,
			e4d4 : 1200,
			d6e5 : 1200
		}
	},

	board04 : {
		whiteToMove : true,
		position : {
			e7 : 'bK',
			f7 : 'bB',
			h7 : 'bP',
			c6 : 'bP',
			g6 : 'bP',
			h6 : 'wP',
			b5 : 'bP',
			c5 : 'wP',
			e5 : 'wP',
			g5 : 'wP',
			b4 : 'wP',
			f4 : 'wK',
			b3 : 'wB'
		},
		moves : {
			e5e6 : 2500,
			b3f7 : 1600,
			b3c2 : 1700,
			b3d1 : 1800
		}
	},

	board05 : {
		whiteToMove : true,
		position : {
			a8 : 'bB',
			c8 : 'wR',
			f8 : 'bN',
			g8 : 'bK',
			f7 : 'bP',
			g7 : 'bP',
			h7 : 'bP',
			b6 : 'bP',
			f6 : 'bN',
			f5 : 'wN',
			b4 : 'bB',
			e4 : 'bP',
			b3 : 'wP',
			e3 : 'wB',
			f3 : 'wP',
			a2 : 'bQ',
			e2 : 'wB',
			f2 : 'wQ',
			g2 : 'wP',
			h2 : 'wP',
			g1 : 'wK'
		},
		moves : {
			e3c5 : 2500,
			f5h6 : 2100,
			e3h6 : 1900,
			f5g7 : 1500,
			f2g3 : 1750,
			c8f8 : 1200,
			f2h4 : 1200,
			e3b6 : 1750,
			e2c4 : 1400
		}
	},

	board06 : {
		whiteToMove : true,
		position : {
			d8 : 'bR',
			e8 : 'bR',
			g8 : 'bK',
			a7 : 'bP',
			b7 : 'bP',
			f7 : 'bP',
			g7 : 'bB',
			h7 : 'bP',
			c6 : 'bB',
			d6 : 'bP',
			f6 : 'bN',
			g6 : 'bP',
			a5 : 'bQ',
			e5 : 'bP',
			g5 : 'wB',
			c4 : 'wB',
			e4 : 'wP',
			c3 : 'wN',
			h3 : 'wP',
			a2 : 'wP',
			b2 : 'wP',
			c2 : 'wP',
			d2 : 'wQ',
			f2 : 'wP',
			g2 : 'wP',
			d1 : 'wR',
			e1 : 'wR',
			g1 : 'wK'
		},
		moves : {
			g5f6 : 2500,
			c3d5 : 1700,
			c4b5 : 1900,
			f2f4 : 1700,
			a2a3 : 1200,
			e1e3 : 1200
		}
	},

	board07 : {
		whiteToMove : false,
		position : {
			a8 : 'bR',
			c8 : 'bB',
			e8 : 'bQ',
			f8 : 'bR',
			g8 : 'bK',
			b7 : 'bP',
			c7 : 'bP',
			d7 : 'bN',
			f7 : 'bP',
			g7 : 'bB',
			a6 : 'bP',
			d6 : 'bP',
			f6 : 'bN',
			g6 : 'bP',
			h6 : 'bP',
			d5 : 'wP',
			e5 : 'bP',
			c4 : 'wP',
			e4 : 'wP',
			h4 : 'wB',
			c3 : 'wN',
			a2 : 'wP',
			b2 : 'wP',
			d2 : 'wN',
			e2 : 'wB',
			f2 : 'wP',
			g2 : 'wP',
			h2 : 'wP',
			a1 : 'wR',
			d1 : 'wQ',
			f1 : 'wR',
			g1 : 'wK'
		},
		moves : {
			f6h7 : 2500,
			f6e4 : 1800,
			g6g5 : 1700,
			a6a5 : 1700,
			g8h7 : 1500
		}
	},

	board08 : {
		whiteToMove : true,
		position : {
			c8 : 'wR',
			e8 : 'bR',
			f7 : 'bK',
			a6 : 'bP',
			b6 : 'wB',
			c6 : 'wP',
			e6 : 'bN',
			h6 : 'bP',
			g5 : 'bP',
			f3 : 'wP',
			h3 : 'wP',
			c2 : 'wP',
			g2 : 'wP',
			h1 : 'wK'
		},
		moves : {
			b6d8 : 2500,
			c8e8 : 1600
		}
	},

	board09 : {
		whiteToMove : true,
		position : {
			c8 : 'bR',
			f8 : 'bR',
			g8 : 'bK',
			b7 : 'bP',
			d7 : 'wR',
			f7 : 'bP',
			g7 : 'bP',
			a6 : 'bP',
			e6 : 'bP',
			h6 : 'bP',
			e4 : 'wB',
			d3 : 'wQ',
			e3 : 'wB',
			g3 : 'wP',
			a2 : 'bQ',
			c2 : 'wP',
			g2 : 'wK',
			h2 : 'wP'
		},
		moves : {
			e3d4 : 2500,
			e4g6 : 1800,
			e4h7 : 1800,
			e3h6 : 1700,
			d7b7 : 1400
		}
	},

	board10 : {
		whiteToMove : false,
		position : {
			a8 : 'bR',
			c8 : 'bB',
			d8 : 'bQ',
			f8 : 'bR',
			g8 : 'bK',
			a7 : 'bP',
			f7 : 'bP',
			g7 : 'bP',
			h7 : 'bP',
			b6 : 'bP',
			c6 : 'bN',
			d6 : 'bP',
			f6 : 'bN',
			c5 : 'bP',
			c4 : 'wP',
			d4 : 'wP',
			e4 : 'bP',
			f4 : 'wP',
			b3 : 'wN',
			c3 : 'wP',
			e3 : 'wP',
			a2 : 'wP',
			e2 : 'wB',
			g2 : 'wP',
			h2 : 'wP',
			a1 : 'wR',
			c1 : 'wB',
			d1 : 'wQ',
			f1 : 'wR',
			g1 : 'wK'
		},
		moves : {
			d8d7 : 2600,
			f6e8 : 2000,
			h7h5 : 1800,
			c5d4 : 1600,
			c8a6 : 1800,
			a7a5 : 1800,
			f8e8 : 1400,
			d6d5 : 1500
		}
	}
};

for (key in boards) {
	var html = '<div class="question">\n';
	html += '	<div id="' + key + '" class="chessBoard"></div>\n';
	html += '	<div class="infoLine">\n';
	html += '		<span class="whoToMove">' + (boards[key].whiteToMove ? 'White' : 'Black') + ' to move</span>\n'
	html += '		<span class="answer" id="answer_' + key + '"></span>\n'
	html += '	</div>\n';
	html += '	<div><button onClick="setup(\'' + key + '\');">Reset</button></div>\n';
	html += '</div>\n';
	document.getElementById('content').innerHTML += html;
}

for (key in boards) {
	setup(key);
}
