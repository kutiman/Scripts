#pragma strict

static var lvlAmount = 7;
function Start () {
	for (var i = 1; i <= lvlAmount; i++) {
	
		var gWidth = 8;
		var btn : GameObject = Instantiate(Resources.Load("Prefabs/Texts/btnLevel"));
		btn.GetComponent(scriptBtnLevel).lvl = i;
		btn.transform.position.x = 0.2 + ((i - 1) % gWidth) * 0.1;
		btn.transform.position.y = 0.6 - (Mathf.Floor((i-1) / gWidth))*0.2 ;
	}
}

function Update () {
	
}