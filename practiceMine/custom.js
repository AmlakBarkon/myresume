var count = 5;
var minesAll = 6;
var permit = false;
var beginTime, endTime, timer;

$(document).ready(function() {
	var container = $(".field");
	var row = $("<div class='line'></div>");
	var item = $("<div class='item'></div>");
	var currentRow;
	var currentItem;

	for (var i = 0; i < count; i++) {
		currentRow = row.clone();
		container.append(currentRow);
		for (var j = 0; j < count; j++) {
			currentItem = item.clone();
		 currentRow.append(currentItem);
		}
	}

	$(".new-game button").on("click", function() {
		currentGame = new Game();
		currentGame.createMines();
		currentGame.createSums();
		permit = true;

});

	$(".item").on("mousedown", function(event) {
		var parI, parJ, parentLine, items;
		if (permit) {
			parentLine = $(this).parents(".line");
			parI = $(".line").index(parentLine);
			items = parentLine.find(".item");

			parJ = items.index(this);
			if (event.which == 1) {
				if (currentGame.cells[parI][parJ] == -1){
					currentGame.explosionEnd();
					$(".item").html("").css("background-color", "gray");

				}
				else {
					$(this).addClass("open");
					$(this).text(currentGame.cells[parI][parJ]);
				}
			} else if (event.which == 2) {
				if ($(this).hasClass("red")) {
					$(this).removeClass("red").html("");

				} else {
					$(this).html("&#9967;").addClass("red");

				}
			}
		}
	});

});

function Game() {
	this.cells = [];
	this.createMines = function() {
		var indI, indJ, cond;
		var indArr = [];
		var elem = [];
		for (var i = 0; i < count; i++) {
			this.cells[i] = [];
		}
		for (var i = 0; i < minesAll; i++) {
			do {
				indI = Math.floor(Math.random()*count);
				indJ = Math.floor(Math.random()*count);
				elem = [indI, indJ];
				cond = false;
				for (var j = 0; j < indArr.length; j++) {
					if (indArr[j][0] == elem[0]
						&& indArr[j][1] == elem[1]) {
						cond = true;
						break;
					}
				}
			} while (cond);
			this.cells[indI][indJ] = -1;
		}
	},
	this.createSums = function() {
		var counter, i1, i2, j1, j2;
		for (var i = 0; i < count; i++) {
			i1 = i - 1;
			i2= i + 1;
			for (var j = 0; j < count; j++) {
				if (this.cells[i][j] == -1) continue;
				j1 = j - 1;
				j2 = j + 1;
				counter = 0;
				counter = this.addCounter(i1, j1, counter);
			  counter = this.addCounter(i1, j, counter);
				counter = this.addCounter(i1, j2, counter);
				counter = this.addCounter(i, j1, counter);
				counter = this.addCounter(i, j2, counter);
				counter = this.addCounter(i2, j1, counter);
				counter = this.addCounter(i2, j, counter);
				counter = this.addCounter(i2, j2, counter);
				this.cells[i][j] = counter;
			}
		}
	},
	this.addCounter = function(parI, parJ, result) {
		if (yes(parI) && yes(parJ) && this.cells[parI][parJ] == -1)
			return ++result;
		else
			return result;
	},

	this.explosionEnd = function() {
		this.showMines();
		permit = false;
		$(".alert-danger").show(".explode", {pieces: 16}, 4000);
	},
	this.victoryEnd = function() {
		this.showSumsMines();
		permit = false;

	},
	this.showMines = function() {
		$(".item").html("").removeClass("red");
		for (var i = 0; i < count; i++) {
			for (var j = 0; j < count; j++) {
				if (this.cells[i][j] == -1)
					$(".line").eq(i).find(".item").eq(j)
					.html("&#128163;").addClass("bold");
			}
		}
	}
	this.showSumsMines = function() {
		for (var i = 0; i < count; i++) {
			for (var j = 0; j < count; j++) {
				if (this.cells[i][j] == -1)
					$(".line").eq(i).find(".item")
					.eq(j).removeClass("red")
					.addClass("grey");
			}
		}
	}
 }
function yes(x) {
	return x >= 0 && x < count;
}
