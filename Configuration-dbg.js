/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("i2d.ps.milestone.confirm.s1.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("i2d.ps.milestone.confirm.s1.Configuration", {

 oServiceParams: {
        serviceList: [
            {
                name: "PS_MILESTONE_CONFIRM",
                masterCollection: "MilestoneDetailSet",
                serviceUrl: i2d.ps.milestone.confirm.s1.Component.getMetadata().getManifestEntry("sap.app").dataSources["PS_MILESTONE_CONFIRM"].uri,
                isDefault: true,
                mockedDataSource: i2d.ps.milestone.confirm.s1.Component.getMetadata().getManifestEntry("sap.app").dataSources["PS_MILESTONE_CONFIRM"].settings.localUri
            }
    ]
},
    
   
   

    getServiceParams: function () {
        return this.oServiceParams;
    },

    /**
     * @inherit
     */
    getServiceList: function () {
        return this.oServiceParams.serviceList;
    },


    getMasterKeyAttributes : function() {
        return ["Id"];
    },
    
    getExcludedQueryStringParameters : function() {
        return ["sap-client"];
    }

});