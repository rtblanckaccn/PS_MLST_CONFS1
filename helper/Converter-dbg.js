/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("i2d.ps.milestone.confirm.s1helper.Converter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

i2d.ps.milestone.confirm.helper.Converter = {
		
};

i2d.ps.milestone.confirm.s1.helper.Converter.ConvertDateHelper = function(oVal)
{

	
	 var monthNames = [ "","January", "February", "March", "April", "May", "June",
                       "July", "August","September" , "October", "November", "December" ];
	 
	 
      
       var month = oVal.substring(0,2);
       if(month.substring(0,1)=="0")
              month =oVal.substring(1,2);
      
       if(month.substring(0,1)=="0")
              month =oVal.substring(1,2);
       var monthString = monthNames[month];
       var year = oVal.substring(2,6);
    	   


       var finalDate = monthString + " " + year;
       return finalDate;
	 	//return "January 2014";
 
		
};