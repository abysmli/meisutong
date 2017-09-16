// JavaScript Document
// JavaScript Document
	var selectindex = 0;  //Ô¤ÉèÏîÄ¿
	var subclass = new Array();
	subclass[0] = "";
	subclass[1] = "";
	
	subclass[2] = "";
	
	subclass[3] = "";
	
	subclass[4] = "";
	
	subclass[5] = "";
	
	subclass[6] = "";

	function preset()
	{
		document.getElementById("itemlist").getElementsByTagName("li")[selectindex].getElementsByTagName("a")[0].getElementsByTagName("span")[0].className="style1";
		innersubclass();
		
	}
	function focusthis(obj)
	{
		clearselect();
		obj.className = "style1";
		innersubclass(obj);
		//obj.parentElement.blur();
		document.getElementById("itemlist").onmouseout="";
		document.getElementById("subclass").onmouseout="";
		if (document.all)
			{obj.parentElement.parentElement.nextSibling.childNodes[0].childNodes[0].className="style2";}
		else
			{obj.parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.className="style2";}
	}
	function innersubclass(obj)
	{
		if (obj==null)
		{
			document.getElementById("subclass").innerHTML = subclass[selectindex];
		}else
		{
			var lilength,spanobj;
			if(document.all)
				{lilength=obj.parentElement.parentElement.parentElement.getElementsByTagName("li").length}
			else
				{lilength=obj.parentNode.parentNode.parentNode.childNodes.length-7}

			for(i=0; i<lilength;i++)
			{
				if(document.all)
					{ spanobj = document.getElementById("itemlist").getElementsByTagName("li")[i].getElementsByTagName("a")[0].getElementsByTagName("span")[0] }
				else
					{ spanobj = document.getElementById("itemlist").childNodes[2*i+1].firstChild.firstChild}
			
				if(obj == spanobj)
				{
					document.getElementById("subclass").innerHTML = subclass[i];
				}
							
			}
				
		}
	}
	function recover()
	{
		clearselect();	
		preset();
		innersubclass();
	}
	function clearselect()
	{
		for (i=0; i<document.getElementById("itemlist").getElementsByTagName("li").length; i++)
		{
			document.getElementById("itemlist").getElementsByTagName("li")[i].getElementsByTagName("a")[0].getElementsByTagName("span")[0].className="style0";
		}	
	}	