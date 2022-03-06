window.onload=function(){
	i=2;
	n=3;
	img=document.querySelector("#imgB");
	setInterval("f1()",1000);
}
function f1(){
	if (i>=n){i=1;}
	img.src="images/banner"+i+".jpg";
	i++;
}