#pragma strict

function Start () {
	
}

function Update () {
	var m = Input.mousePosition;
	var w = Screen.width;
	var h = Screen.height;
	var spd = 80;
	
	if (m[0] < 0) {m[0] = 0;}
	if (m[0] > w) {m[0] = w;}
	if (m[1] < 0) {m[1] = 0;}
	if (m[1] > h) {m[1] = h;} 
	
	var rotX = transform.rotation.x;
	if (rotX > 180) {rotX -= 360;}
	var rotZ = transform.rotation.z;
	if (rotZ > 180) {rotX -= 360;}
	var finalRotX = 0 - ((m[1] - h/2)/10000);
	var finalRotZ = 0 + ((m[0] - w/2)/10000);

	if (finalRotX > rotX) {transform.rotation.x += (finalRotX - rotX) / spd;}
	else if (finalRotX < rotX) {transform.rotation.x -= (rotX - finalRotX) / spd;}
	if (finalRotZ > rotZ) {transform.rotation.z += (finalRotZ - rotZ) / spd;}
	else if (finalRotZ < rotZ) {transform.rotation.z -= (rotZ - finalRotZ) / spd;}

}