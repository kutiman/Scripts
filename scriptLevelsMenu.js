#pragma strict

var lvlAmount = 2;
function Start () {
	for (var i = 1; i <= lvlAmount; i++) {
		var btn : GameObject = Instantiate(Resources.Load("Prefabs/Texts/btnLevel"));
		btn.GetComponent(scriptBtnLevel).lvl = i;
		btn.transform.position.x = 0.2 + (i - 1)*0.1;
		btn.transform.position.y = 0.6 - (Mathf.Floor((i-1) / 4))*0.2 ;
	}
}

function Update () {
	
}