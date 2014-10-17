#pragma strict
gameObject.name = gameObject.GetInstanceID().ToString();

var lineRouteX = new Array();
var lineRouteY = new Array();
//Debug.Log("Line number " + gameObject.name + " at length of "+ lineRouteX.length.ToString() + " was created");
var color = 0;
var startPoint = new Array();
var finishPoint = new Array();
var connected = false;
gameObject.name = gameObject.GetInstanceID().ToString();

function Start () {

}

function Update () {

	var end = lineRouteX.length - 1;
	if (lineRouteX[end] == finishPoint[0] && lineRouteY[end] == finishPoint[1])
	{
		if (scriptGame.activeLineID == gameObject.name) {
			scriptGame.activeLineID = "-1";
		}
		connected = true;
	}
	else {
		connected = false;
	}
}

function CutRoute (place : int){
	
	var tempArrayX = new Array();
	var tempArrayY = new Array();
	
	for (var i = 0; i <= place; i++)
	{
		tempArrayX[i] = lineRouteX[i];
		tempArrayY[i] = lineRouteY[i];
	}
	lineRouteX = tempArrayX;
	lineRouteY = tempArrayY;
}

function OnMouseUp () {
	if (lineRouteX.length <= 1) {
		Destroy(gameObject);
	}
}