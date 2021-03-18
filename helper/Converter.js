/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("i2d.ps.milestone.confirm.s1helper.Converter");jQuery.sap.require("sap.ui.core.format.DateFormat");i2d.ps.milestone.confirm.helper.Converter={};
i2d.ps.milestone.confirm.s1.helper.Converter.ConvertDateHelper=function(v){var m=["","January","February","March","April","May","June","July","August","September","October","November","December"];var a=v.substring(0,2);if(a.substring(0,1)=="0")a=v.substring(1,2);if(a.substring(0,1)=="0")a=v.substring(1,2);var b=m[a];var y=v.substring(2,6);var f=b+" "+y;return f;};
