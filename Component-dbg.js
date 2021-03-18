/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
// define a root UIComponent which exposes the main view
jQuery.sap.declare("i2d.ps.milestone.confirm.s1.Component");
//jQuery.sap.require("i2d.ps.milestone.confirm.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
// new Component
sap.ca.scfld.md.ComponentBase.extend("i2d.ps.milestone.confirm.s1.Component", {
	metadata:sap.ca.scfld.md.ComponentBase.createMetaData("MD", { 
		"manifest" : "json",    
//		"name": "Master Detail Sample",
//		"version" : "1.0.0",
//		"library" : "i2d.ps.milestone.confirm",
//		"includes" : ["css/custom.css"],  
//		"dependencies" : { 
//			"libs" : [ 
//				"sap.m",
//				"sap.me"
//			],  
//			"components" : [ 
//			], 
//			 
//		},
//		"config":{            
//			"resourceBundle": "i18n/i18n.properties",
//			"titleResource": "DETAIL_TITLE",
//            "icon":"sap-icon://Fiori2/F0295",
//            "favIcon" : "./resources/sap/ca/ui/themes/base/img/favicon/F0295_Confirm_Project_Milestone.ico",
//            "homeScreenIconPhone" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/57_iPhone_Desktop_Launch.png",
//            "homeScreenIconPhone@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/114_iPhone-Retina_Web_Clip.png",
//            "homeScreenIconTablet" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/72_iPad_Desktop_Launch.png",
//            "homeScreenIconTablet@2" : "./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/144_iPad_Retina_Web_Clip.png"
//     },
				 viewPath:"i2d.ps.milestone.confirm.s1.view",
                 fullScreenPageRoutes : {
                     "navRoute" : {
                           "pattern" : "navRoute/{contextPath}",
                           "view" : "S3"
                     }
              },

	            
      }),
	
	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
      createContent : function() {
          var oViewData = {component: this};
          return sap.ui.view({
                 viewName : "i2d.ps.milestone.confirm.s1.Main",
                 type : sap.ui.core.mvc.ViewType.XML,
                 viewData : oViewData
          });
   }
                         
});


