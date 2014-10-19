#pragma strict

var counter : int = 0;

function Start () {

}

function SnapCamera () {
	var gridLength : float = scriptGame.lvlGrid.GetLength(0);
	var finalPos : float[];
	if (counter > 120)
	{
		finalPos = [gridLength, -(gridLength/10) * (90/85)];
	
		if (transform.position.y - finalPos[0] > 0.01) {
			transform.position.y -= ((transform.position.y - finalPos[0]) / 60) + 0.01;
		}
		if (finalPos[1] - transform.position.z > 0.01) {
			transform.position.z -= ((transform.position.z - finalPos[1]) / 60) - 0.01;
		}
	}
	counter++;
}

function Update () {
	
}