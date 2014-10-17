#pragma strict

static var lvlGrid : int[,] = new int[10,10];
static public var activeLineID  = "-1";
static var activeSquareID = "";
static var level : int = 0;

var objSquareMap : GameObject[,] = new GameObject[10,10];

function Start () {
	
	switch (level) {
		case 0:
			break;
		case 1:
			CreateEmptyGrid(6);
			lvlGrid[0,0] = 1;
			lvlGrid[0,5] = 1;
			lvlGrid[1,0] = 2;
			lvlGrid[1,5] = 2;
			lvlGrid[2,0] = 3;
			lvlGrid[2,5] = 3;
			lvlGrid[3,0] = 4;
			lvlGrid[3,5] = 4;
			lvlGrid[4,0] = 5;
			lvlGrid[4,5] = 5;
			lvlGrid[5,0] = 6;
			lvlGrid[5,5] = 6;
			break;
		case 2:
			CreateEmptyGrid(14);
			lvlGrid[0,0] = 1;
			lvlGrid[0,13] = 1;
			lvlGrid[1,0] = 2;
			lvlGrid[1,13] = 2;
			lvlGrid[2,0] = 3;
			lvlGrid[2,13] = 3;
			lvlGrid[3,0] = 4;
			lvlGrid[3,13] = 4;
			lvlGrid[4,0] = 5;
			lvlGrid[4,13] = 5;
			lvlGrid[5,0] = 6;
			lvlGrid[5,13] = 6;
			lvlGrid[6,0] = 7;
			lvlGrid[6,13] = 7;
			lvlGrid[7,0] = 8;
			lvlGrid[7,13] = 8;
			break;
	}
	
	CreateLevel();
	
	//CubeWall(60.0,20.0,8);
}

// Creates an empty level grid and sets the static lvlGrid to it

function CreateEmptyGrid (size : int){
	
	var arry : int[,] = new int[size,size];

	for (var w = 0; w < size; w++)
	{
    	for (var h = 0; h < size; h++)
    	{
        	arry[w,h] = 0;
    	}
    }
    
    lvlGrid = arry;
}

// Populating the level with squares

function CreateLevel (){
	
	var lengthX : int = lvlGrid.GetLength(0);
	var lengthY : int = lvlGrid.GetLength(1);
	objSquareMap = new GameObject[lengthX, lengthY];
	for (var w = 0; w < lengthX; w++)
	{
    	for (var h = 0; h < lengthY; h++)
    	{
        	var obj : GameObject = Instantiate(Resources.Load("Prefabs/objSquare"));
        	obj.transform.position.x = -(lengthX/2) + w * 1.1;
        	obj.transform.position.z = -(lengthY/2) + h * 1.1;
        	obj.transform.position.y = Random.Range(5,8);
        	obj.GetComponent(scriptHouse).objPos = [w,h];
        	obj.GetComponent(scriptHouse).color = lvlGrid[w,h];
        	
        	if (lvlGrid[w,h] != 0) {
        		obj.GetComponent(scriptHouse).endPoint = true;
        	}
        	objSquareMap[w,h] = obj;
    	}
    }
}

function CubeWall (width : float, height : float, anchorPointZ : float) {
	
	
	for (var i = 0; i < width; i++) {
		for (var n = 0; n < height; n++) {
			var posX = -(width*0.125) + i*0.25 * 1.1;
			var posY = n*0.25 * 1.1+ 1;
			var obj : GameObject = Instantiate(Resources.Load("Prefabs/objBgCube"));
			obj.transform.position.z = anchorPointZ;
			obj.transform.position.x = posX;
			obj.transform.position.y = posY;
		}
	}
}

function LinesRequired (grid : int[,]) {
	var count = 0;
	for (var i = 0; i < grid.GetLength(0); i++) {
		for (var n = 0; n < grid.GetLength(1); n++) {
			if (grid[i,n] > 0) {
				count++;
			}
		}
	}
	return count;
}


function CheckForWinning () {
	var levelWon = false;
	var linesNeeded = LinesRequired(lvlGrid) / 2;
	var connectedLines = 0;
	var squaresNeeded = lvlGrid.GetLength(0) * lvlGrid.GetLength(1);
	var coloredSquares = 0;
	var objList : GameObject[] = GameObject.FindGameObjectsWithTag("Line");
	for (var i = 0; i < objList.length; i++) {
		var objConnected = objList[i].GetComponent(scriptLine).connected;
		if (objConnected == true) {connectedLines++;}
	}
	for (var w = 0; w < objSquareMap.GetLength(0); w++) {
		for (var h = 0; h < objSquareMap.GetLength(1); h++) {
			if (objSquareMap[w,h].GetComponent(scriptHouse).squareColored == true) {
				coloredSquares++;
			}
		}
	}
	
	if (linesNeeded == connectedLines && squaresNeeded == coloredSquares) {
		levelWon = true;
	}
	return levelWon;
}

function Update () {
	var levelWon = CheckForWinning();
	if (levelWon == true) {
		Application.LoadLevel(1);
	}
}