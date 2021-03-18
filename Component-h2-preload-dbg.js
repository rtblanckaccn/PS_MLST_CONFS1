//@ui5-bundle i2d/ps/milestone/confirm/s1/Component-h2-preload.js
sap.ui.require.preload({
	"i2d/ps/milestone/confirm/s1/manifest.json":'{"_version":"1.6.0","sap.app":{"_version":"1.1.0","id":"i2d.ps.milestone.confirm.s1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"7.0.1"},"title":"{{DETAIL_TITLE}}","ach":"PS-FIO","dataSources":{"PS_MILESTONE_CONFIRM":{"uri":"/sap/opu/odata/sap/PS_MILESTONE_CONFIRM/","type":"OData","settings":{"odataVersion":"2.0","localUri":"/i2d.ps.milestone.confirm/model/metadata.xml"}}},"resources":"resources.json"},"sap.ui":{"_version":"1.1.0","technology":"UI5","icons":{"icon":"sap-icon://Fiori2/F0295","favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/F0295_Confirm_Project_Milestone.ico","phone":"./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/57_iPhone_Desktop_Launch.png","phone@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/114_iPhone-Retina_Web_Clip.png","tablet":"./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/72_iPad_Desktop_Launch.png","tablet@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0295_Confirm_Project_Milestone/144_iPad_Retina_Web_Clip.png"},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_bluecrystal"]},"sap.ui5":{"_version":"1.1.0","resources":{"css":[{"uri":"css/custom.css"}]},"dependencies":{"minUI5Version":"1.65.5","libs":{"sap.m":{"lazy":false},"sap.me":{"lazy":false},"sap.ca.scfld.md":{"lazy":false},"sap.ui.layout":{"lazy":false},"sap.ushell":{"lazy":false}}},"contentDensities":{"compact":true,"cozy":false},"config":{"sapFiori2Adaptation":{"style":true,"collapse":true,"title":true,"back":true,"hierarchy":true,"lateAdaptation":true}}},"sap.fiori":{"_version":"1.1.0","registrationIds":["F0295"],"archeType":"transactional"},"sap.copilot":{"_version":"1.0.0","contextAnalysis":{"allowAddingObjectsFromAppScreenToCollection":false}},"sap.platform.abap":{"_version":"1.1.0","uri":"/sap/bc/ui5_ui5/sap/ps_mlst_confs1"}}',
/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
	"i2d/ps/milestone/confirm/s1/Component.js":function(){jQuery.sap.declare("i2d.ps.milestone.confirm.s1.Component");jQuery.sap.require("sap.ca.scfld.md.ComponentBase");sap.ca.scfld.md.ComponentBase.extend("i2d.ps.milestone.confirm.s1.Component",{metadata:sap.ca.scfld.md.ComponentBase.createMetaData("MD",{"manifest":"json",viewPath:"i2d.ps.milestone.confirm.s1.view",fullScreenPageRoutes:{"navRoute":{"pattern":"navRoute/{contextPath}","view":"S3"}},}),createContent:function(){var v={component:this};return sap.ui.view({viewName:"i2d.ps.milestone.confirm.s1.Main",type:sap.ui.core.mvc.ViewType.XML,viewData:v});}});
}
},"i2d/ps/milestone/confirm/s1/Component-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"i2d/ps/milestone/confirm/s1/Component.js":["sap/ca/scfld/md/ComponentBase.js"],
"i2d/ps/milestone/confirm/s1/Configuration.js":["sap/ca/scfld/md/ConfigurationBase.js","sap/ca/scfld/md/app/Application.js"],
"i2d/ps/milestone/confirm/s1/Main.view.xml":["i2d/ps/milestone/confirm/s1/Main.controller.js","sap/m/NavContainer.js","sap/ui/core/mvc/XMLView.js"],
"i2d/ps/milestone/confirm/s1/test-resources/testsuite.qunit.js":["i2d/ps/milestone/confirm/s1/SimpleTest.js","i2d/ps/milestone/confirm/s1/helper/Converter.js"],
"i2d/ps/milestone/confirm/s1/view/S2.controller.js":["sap/ca/scfld/md/controller/ScfldMasterController.js","sap/m/MessageBox.js","sap/m/MessageToast.js"],
"i2d/ps/milestone/confirm/s1/view/S2.view.xml":["i2d/ps/milestone/confirm/s1/view/S2.controller.js","sap/m/List.js","sap/m/ObjectAttribute.js","sap/m/ObjectListItem.js","sap/m/ObjectStatus.js","sap/m/Page.js","sap/ui/core/mvc/XMLView.js"],
"i2d/ps/milestone/confirm/s1/view/S3.controller.js":["sap/ca/scfld/md/controller/BaseDetailController.js","sap/m/MessageBox.js"],
"i2d/ps/milestone/confirm/s1/view/S3.view.xml":["i2d/ps/milestone/confirm/s1/view/S3.controller.js","sap/m/DatePicker.js","sap/m/Label.js","sap/m/ObjectAttribute.js","sap/m/ObjectHeader.js","sap/m/ObjectStatus.js","sap/m/Page.js","sap/m/ProgressIndicator.js","sap/m/Text.js","sap/ui/core/ExtensionPoint.js","sap/ui/core/mvc/XMLView.js","sap/ui/layout/form/SimpleForm.js"]
}});
