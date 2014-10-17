#pragma strict

var lvl : int = 0;
function Start () {
	gameObject.guiText.text = lvl.ToString();
}

function Update () {
	
}

function OnMouseDown () {
	scriptGame.level = lvl;
	Application.LoadLevel(2);
}