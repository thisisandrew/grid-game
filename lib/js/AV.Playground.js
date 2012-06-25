/**
 * Playground / Grid / Cell
 */
 
var AV = {};
AV.Playground = function() {
	this.init = function() {
		canvas = document.getElementById("gameCanvas");
		stage = new Stage(canvas);
		
		var loadIndex = this.loading();
		
		var grid = new this.Grid();			//Set up a grid
		grid.build();
		
		stage.enableMouseOver(20);
		
		stage.removeChildAt(loadIndex);
		stage.update();
	};
	
	this.loading = function(){
		messageField = new Text("Loading...", "bold 24px Arial", "#000");
		messageField.maxWidth = 1000;
		messageField.textAlign = "center";
		messageField.x = canvas.width / 2;
		messageField.y = canvas.height / 2;
		var dObj = stage.addChild(messageField);
				
		stage.update(); 	//update the stage to show text
		
		return stage.getChildIndex(messageField);
	}
	
	/**
	 * Grid handles the collection of cells and allows building up rows
	 */
	this.Grid = function() {
		var rowlen = 10;
		var numrows = 6;
		var that = this;
		
		//Stores the entire grid of cells in an array
		this.matrix = [];
		
		this.build = function() {
			var i = 1;
			
			while(i <= numrows) {
				this.matrix[i] = this.buildRow(i);
				i++;
			}
		};
		
		this.buildRow = function(rowNum) {
			var row = [];
		
			var i = 1;
			while(i <= rowlen) {
				var cell = new this.Cell(i, rowNum);
				row[i] = cell;
			
				stage.addChild(cell.shape);
				i++;
			}
			
			return row;
		};
		
		/**
		 * Creating cells with an index and a row number to populate the matrix
		 * @property shape:Shape
		 * @method setColour(color)
		 * @method getNeighbours()
		 * @method highlightNeighbours()
		 */
		this.Cell = function(idx, rowNum){
			this.row = rowNum;
			this.column = idx;
			
			var cell = this;
			var neighbours = {
				1: { //Cells in ODD numbered rows
					'tr': 	{'r': -1, 	'c': 1},
					'r':	{'r': 0, 	'c': 1},
					'br':	{'r': 1, 	'c': 1},
					'bl':	{'r': 1, 	'c': 0},
					'l':	{'r': 0, 	'c': -1},
					'tl':	{'r': -1, 	'c': 0},
				},
				0: { //Cells in EVEN numbered rows
					'tr': 	{'r': -1, 	'c': 0},
					'r':	{'r': 0, 	'c': 1},
					'br':	{'r': 1, 	'c': 0},
					'bl':	{'r': 1, 	'c': -1},
					'l':	{'r': 0, 	'c': -1},
					'tl':	{'r': -1, 	'c': -1},
				}, 
			};
			
			var g = new Graphics();
			g.setStrokeStyle(1);
			g.beginStroke(Graphics.getRGB(50,50,50));
			g.beginFill(Graphics.getRGB(200,200,200));
			g.drawPolyStar (0, 0, this.sizes.radius, this.sizes.sides , 0 , this.sizes.orientation);
			
			//this.graphic = g;
			
			var shape = new Shape(g);
			shape.x = (idx * this.sizes.internalSizes.width) + (rowNum%2 * this.sizes.externalOffsets.x);
			shape.y = rowNum * this.sizes.externalOffsets.y;
			shape.mouseEnabled = true;
			shape.onMouseOver = function() {
				cell.setColor('#FF00FF');
				cell.hightlightNeighbours('#FFAAFF');
			};
			shape.onMouseOut = function() {
				cell.setColor('#CCCCCC');
				cell.hightlightNeighbours('#CCCCCC');
			};
			
			
			this.shape = shape;
			
			/* set the colour of the cell */
			this.setColor = function(color){
				this.shape.graphics.beginFill(color);
				this.shape.graphics.drawPolyStar (0, 0, this.sizes.radius, this.sizes.sides , 0 , this.sizes.orientation);
				
				stage.update();
			};
			
			/* get the neighbours of the cell */
			this.getNeighbours = function() {
				//neighbours include clockwise tr, r, br, bl, l, tl
				var naybours = [];
				var rowType = this.row % 2;
				
				for(idx in neighbours[rowType]) {
					var r = this.row + neighbours[rowType][idx].r;
					var c = this.column + neighbours[rowType][idx].c;
					
					if(typeof that.matrix[r] != 'undefined' && typeof that.matrix[r][c] != 'undefined') {
						naybours[idx] = that.matrix[r][c];
					}
				}
				
				return naybours;
			};
			
			/* Set color of a Cells neighbours */
			this.hightlightNeighbours = function(color){
				var naybours = this.getNeighbours();
			
				for(idx in naybours) {
					console.log(naybours[idx]);
					naybours[idx].setColor(color);
				}
			}
			
		};
		
		this.Cell.prototype.sizes = {
			sides: 6,
			radius: 30,
			internalSizes: { width: 52, heigth: 60}, //Distance from Shape center to left edge / top edge
			externalOffsets: { x: 26, y: 45}, //Distance from Shape center to adjacent shape's center
			orientation: 270, // Orientation angle from centre of first point of polygon
		};
	}
}