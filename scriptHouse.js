#pragma strict

public var objPos = [-100, -100];
var color = 0; // number of the color. 0 means free.
public var endPoint = false;
public var name = "";

private var hover = false;
var squareColored = false;
var connectedLineID = "-1";
private var linesList : GameObject[];

public var colorsList : Color[];
colorsList = [
					Color.white, 
					Color.green, 
					Color.blue, 
					Color.cyan, 
					Color.red, 
					Color.yellow, 
					Color.magenta, 
					Color.black, 
					Color.gray
				];

gameObject.renderer.material.color = colorsList[color];

function Start () {

gameObject.name = gameObject.GetInstanceID().ToString();
gameObject.renderer.material.color = colorsList[3];

}

// Checking the position of the square in the route

function CheckLineRoute (go : scriptLine)
{
    var routeX = go.lineRouteX;
    var routeY = go.lineRouteY;

	var arrayPos = -1;
	var lng = routeX.length;
	for (var i = 0; i < lng; i++)
		{
		    if (routeX[i] == objPos[0] && routeY[i] == objPos[1])
		    {
		        arrayPos = i;
		    }
		}
	return arrayPos;
}

function AddToRoute (go : scriptLine) {
    if (!endPoint) {color = go.color;};
	go.lineRouteX[go.lineRouteX.length] = objPos[0];
	go.lineRouteY[go.lineRouteY.length] = objPos[1];
	squareColored = true;
	connectedLineID = scriptGame.activeLineID;
}

function CanAddToRoute (go : scriptLine) {

	var routeX = go.lineRouteX;
	var routeY = go.lineRouteY;
	var lineColor = go.color;
	var lineEnd = routeX.length - 1;
	var canAdd = false;
	var sameColor = false;
	if (color == lineColor && endPoint == true)
	{
		sameColor = true;
	};
	
	if (lineEnd > -1)
	{
	    if ((routeX[lineEnd] == objPos[0] && (routeY[lineEnd] == objPos[1] - 1 || routeY[lineEnd] == objPos[1] + 1)) 
	    || routeY[lineEnd] == objPos[1] && (routeX[lineEnd] == objPos[0] - 1 || routeX[lineEnd] == objPos[0] + 1))
	    {
	        if (!endPoint || sameColor == true)
	        {
	            canAdd = true;
	        }
	    }
	}
	return canAdd;
}

function OnMouseEnter() {

	// jumping while on hover
	var n = rigidbody.velocity.y;
	if (n <= 0.3 && n >= -0.3) {
		rigidbody.velocity.y = 3;
	}
	// Checking the status of the square for adding
	if (scriptGame.activeLineID != "-1") {

		var go : scriptLine = GameObject.Find(scriptGame.activeLineID).GetComponent(scriptLine);
	    var canAdd = CanAddToRoute(go);
	    var posRoute = CheckLineRoute(go);
	    var inSameRoute = false;
	    
	    // checking if already in route
	    if (connectedLineID != "-1") {
	    	if (connectedLineID == scriptGame.activeLineID) {
	    		inSameRoute = true;
	    	}
	    	// cutting a different color route
	    	else if (canAdd) {
	    		var other : scriptLine = GameObject.Find(connectedLineID).GetComponent(scriptLine);
			    var posOtherRoute = CheckLineRoute(other);
			    other.CutRoute(posOtherRoute - 1);
	    	}
	    }
		// cutting the route if entered a square in the same color
		if (inSameRoute == true || (endPoint == true && posRoute == 0)){
	    	go.CutRoute(posRoute);
		}
		// adding the square to the route
	    else if (canAdd) {
	    	AddToRoute(go);
	    }
	}
}



//function Line

function OnMouseDown(){
	
	var lineScript : scriptLine;
	
	if (endPoint == true)
	{
	    linesList = GameObject.FindGameObjectsWithTag("Line");
	    for (var i = 0; i < linesList.Length; i++)
	    {
	        var go : scriptLine = linesList[i].GetComponent(scriptLine);
	        var goColor = go.color;
	        if (color == goColor)
	        {
	            
	            Destroy(linesList[i]);
	        };
	    };
	    var tempObj : GameObject = Resources.Load("Prefabs/objLine");
	    var line : GameObject = Instantiate(tempObj.gameObject);
	    lineScript = line.GetComponent(scriptLine);
	    scriptGame.activeLineID = lineScript.gameObject.GetInstanceID().ToString();
	    connectedLineID = lineScript.gameObject.GetInstanceID().ToString();
	    
	    lineScript.startPoint = objPos;
	    lineScript.color = color;
	    AddToRoute(lineScript);
	    
	    for (var w = 0; w < scriptGame.lvlGrid.GetLength(0); w++)
	    {
	        for (var h = 0; h < scriptGame.lvlGrid.GetLength(1); h++)
	        {
	            var arr = [w,h];
	            if ((arr != objPos) && (scriptGame.lvlGrid[w,h] == color))
	            {
	                lineScript.finishPoint = arr;
	            }
	        }
	    };
	    
	}
	else if (endPoint == false && connectedLineID != "-1")
	{
	    lineScript = GameObject.Find(connectedLineID).GetComponent(scriptLine);
	    var routePos = CheckLineRoute(lineScript);
	    lineScript.CutRoute(routePos);
	    scriptGame.activeLineID = connectedLineID;
	}
	
}

function OnMouseUp(){
	scriptGame.activeLineID = "-1";
}

function Update () {

	// Checking if the square is assigned to a line
	linesList = GameObject.FindGameObjectsWithTag("Line");
	var lineExists = false;
	for (var i = 0; i < linesList.Length; i++)
	{
		var objectName = linesList[i].gameObject.GetInstanceID().ToString();
		if (objectName == connectedLineID)
		{
			lineExists = true;
		}
	}

	if (lineExists == false)
	{
	    connectedLineID = "-1";
	}
	else
	{
	    var go : scriptLine = GameObject.Find(connectedLineID).GetComponent(scriptLine);
	    var pos : int = CheckLineRoute(go);

	    if (pos == -1)
	    {
	    	connectedLineID = "-1";
	    }
	};

	if (connectedLineID == "-1")
	{
	    if (!endPoint) {color = 0;}
	    squareColored = false;
	};
	
	// drawing the square
	var opc : float = 1;
	if (!squareColored) {
		opc = 0.3;
	}
	else if (endPoint == true){
		opc = 1;
	}
	else {
		opc = 0.6;
	};
	gameObject.renderer.material.color = colorsList[color]; // color from the list
	gameObject.renderer.material.color.a = opc;
	//------- end of drawing square
}


