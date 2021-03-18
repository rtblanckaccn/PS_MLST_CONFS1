/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */


jQuery.sap.declare("i2d.ps.milestone.confirm.s1.utils.Conversions");



i2d.ps.milestone.confirm.utils.Conversions = {
  projectNameFormatter : function(oProject){
   var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
   var oResourceBundle = oApplicationImplementation.getResourceBundle();
   return oResourceBundle.getText("Project") + " " + oProject;
  },


};