#pragma strict

var pos = new Array();
var counter : int = 0;
var colorsList : Color[];
colorsList = [
					Color(0.1,0.1,0.1,0.5), 
					Color(0.3,0.3,0.3,0.5), 
					Color(1,1,1,0.5)
					
				];

function Start () {

}

function Update () {
	if (counter % 2 == 0) {
		var r : int = Random.Range(0, colorsList.length-1);
		gameObject.renderer.material.color = colorsList[r];
	}
	counter++;
	if (counter >= 100000) {counter = 0;}
}
