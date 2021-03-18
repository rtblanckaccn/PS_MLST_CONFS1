/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
//EXC_ALL_JSHINT_008
//EXC_ALL_JSLINT_051
//EXC_ALL_JSHINT_048

			/* eslint-disable sap-no-global-define */ 
jQuery.sap.require("sap.ca.scfld.md.controller.ScfldMasterController");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");

sap.ca.scfld.md.controller.ScfldMasterController.extend("i2d.ps.milestone.confirm.s1.view.S2", {

	onInit: function(){  
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		this.oApplicationImplementation = oApplicationImplementation;
		this.crossNavigation=false;
		this.AnaNav = false;
		this.Ref = 0;
		var oI18nModel = oApplicationImplementation.AppI18nModel;
		this.flag = 0; 
		this.sFilterPattern="";
		/* eslint-disable sap-no-global-define */ 
		window.mlstblank = undefined;
		/* eslint-enable sap-no-global-define */ 
		var oComponent = oApplicationImplementation.getComponent();
		var oComponentData = oComponent.getComponentData();
		var view = this.getView();
		view = this.getView();
		var list = this.getList();
		list.setShowNoData(false);
		this.page = view.byId("page"); 
		/* eslint-disable sap-no-global-define */ 
		window.index = 0;
		var oURLParsing = sap.ushell.Container.getService("URLParsing");
		var oUrlnew = oURLParsing.getHash("#"+window.location.href);
		/* eslint-enable sap-no-global-define */ 
		// if(oUrlnew.search("discuss"))

		//var oSpart = oSurl[1].split("&"); 

		this.initialLoad = 0;
		this.groupingFlag =false;
		this.fixCountIssue();

		var oMainList = null;
		var oFilter1 = null;
		var oBindingInfo = null;
		var oList = null;
		var oListItem = null;
		if(oUrlnew.search("discuss") != -1 && oUrlnew.search("MilestoneDetailSet") != -1){

			var oSurl = oUrlnew.split("?");
			var oMlsturl = oSurl[1].split("(");
			var oMlst = oMlsturl[1].split(")");

			this.flag = 1;
			this.crossNavigation=true;
			this.oApplicationImplementation.crossNavigation = true;

			this.oMilestone = oMlst[0].match(/'([^']+)'/)[1];

			oMainList = this.getView().byId("MAIN_LIST_ITEM");
			this.crossNavigation=true;
			oFilter1 = new sap.ui.model.Filter("ProjectMilestone",'EQ',this.oMilestone);
			oBindingInfo = {};
			oBindingInfo.path = "/MilestoneDetailSet";
			oBindingInfo.filters = oFilter1;
			oBindingInfo.template = oMainList;
			//this.getList().bindAggregation("items",oBindingInfo);
			oList=view.byId("list");
			oList.setShowNoData(true);
			oListItem = oList.getItems()[0];
			if(typeof oListItem!="undefined"){
				if(oList.isPhone==false){
					oList.fireSelect({
						listItem : oListItem
					});
				}
			}


			oList.isPhone = this.getView().getModel("device").oData.isPhone;
			oList.bindAggregation("items",oBindingInfo);

			oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
			this.getView().byId("MAIN_LIST_ITEM").bindProperty("title",
					"MilestoneDescription", function(value) {

				return value;

			});
			this.getView().byId("ATTR1").bindProperty("text",
					"ProjectMilestone", function(value) {
				if(value == "")
					return value;
				else
					return value.replace(/^0+/, '');

			});


			this.getView().byId("MAIN_LIST_ITEM").bindProperty("number",
					"MilestoneDays", function(value) {
				if(value == "")
				{
					return value;
				}else{ 
					if (value < 0)
						return -(value);
					else
						return value;
				}
			});

			this.getView().byId("milestoneType").bindProperty(
					"text", "MilestoneDays", function(value) {
						if (value == 0)
							return "";
						else{
							if (value < 0)
								return oI18nModel.getResourceBundle().getText("OVERDUE_NEW");
							else
								return oI18nModel.getResourceBundle().getText("DUE_NEW");
						}
					});
			this.getView().byId("milestoneType").bindProperty(
					"state", "MilestoneDays", function(value) {
						if(value == ""){
							return "Warning";
						}else{
							if (value == 0)
								return "Warning";
							else{
								if (value < 0)
									return "Warning";
							} }});
			this.getView().byId("MAIN_LIST_ITEM").bindProperty("numberUnit",
					"MilestoneDays", function(value) {
				if (value == null)  
					return "";
				else{
					if (value == 1 || value == -1)
						return oI18nModel.getResourceBundle().getText("DAY_NEW");
					else
						return oI18nModel.getResourceBundle().getText("DAYS_NEW");
				} });




		}

		else{
			if(typeof oComponentData.startupParameters!="undefined"){
				if(typeof oComponentData.startupParameters.key!="undefined" || typeof oComponentData.startupParameters.ProjectMilestone!="undefined"){
					this.flag = 1;
					this.crossNavigation=true;
					this.AnaNav = true;
					this.oApplicationImplementation.crossNavigation = true;
					if(oComponentData.startupParameters.key != undefined){
						this.oMilestone = oComponentData.startupParameters.key[0];
						this.kpiid = oComponentData.startupParameters.KPICODE[0];
						this.variantid = oComponentData.startupParameters.VARIANTID[0];
						this.tiletype = oComponentData.startupParameters.TILETYPE[0];
					}
					else{
						this.oMilestone = oComponentData.startupParameters.ProjectMilestone[0];
					}
					oMainList = this.getView().byId("MAIN_LIST_ITEM");
					this.crossNavigation=true;
					oFilter1 = new sap.ui.model.Filter("ProjectMilestone",'EQ',this.oMilestone);
					oBindingInfo = {};
					oBindingInfo.path = "/MilestoneDetailSet";
					oBindingInfo.filters = oFilter1;
					oBindingInfo.template = oMainList;
					//this.getList().bindAggregation("items",oBindingInfo);
					oList=view.byId("list");
					oList.setShowNoData(true);
					oListItem = oList.getItems()[0];
					if(typeof oListItem!="undefined"){
						if(oList.isPhone==false){
							oList.fireSelect({
								listItem : oListItem
							});
						}
					}


					oList.isPhone = this.getView().getModel("device").oData.isPhone;
					oList.bindAggregation("items",oBindingInfo);

					oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
					this.getView().byId("MAIN_LIST_ITEM").bindProperty("title",
							"MilestoneDescription", function(value) {

						return value;

					});
					this.getView().byId("ATTR1").bindProperty("text",
							"ProjectMilestone", function(value) {
						if(value == "")
							return value;
						else
							return value.replace(/^0+/, '');

					});


					this.getView().byId("MAIN_LIST_ITEM").bindProperty("number",
							"MilestoneDays", function(value) {
						if(value == "")
						{
							return value;
						}else{ 
							if (value < 0)
								return -(value);
							else
								return value;
						}
					});

					this.getView().byId("milestoneType").bindProperty(
							"text", "MilestoneDays", function(value) {
								if (value == 0)
									return "";
								else{
									if (value < 0)
										return oI18nModel.getResourceBundle().getText("OVERDUE_NEW");
									else
										return oI18nModel.getResourceBundle().getText("DUE_NEW");
								}
							});
					this.getView().byId("milestoneType").bindProperty(
							"state", "MilestoneDays", function(value) {
								if(value == ""){
									return "Warning";
								}else{
									if (value == 0)
										return "Warning";
									else{
										if (value < 0)
											return "Warning";
									} }});
					this.getView().byId("MAIN_LIST_ITEM").bindProperty("numberUnit",
							"MilestoneDays", function(value) {
						if (value == null)
							return "";
						else{
							if (value == 1 || value == 0 || value == -1)
								return oI18nModel.getResourceBundle().getText("DAY_NEW");
							else
								return oI18nModel.getResourceBundle().getText("DAYS_NEW");
						} });

				}
				else{

					var that = this;           
					//existing
					sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);
					jQuery.sap.require('sap.ushell.services.AppConfiguration');
					this.AnaNav = true;
					sap.ushell.services.AppConfiguration.getSettingsControl = function(){
						return new sap.ushell.ui.footerbar.SettingsButton();
					};


					//end


					oList=view.byId("list");  

					oList.setShowNoData(true);
					oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
					this.getView().byId("MAIN_LIST_ITEM").bindProperty("title",
							"MilestoneDescription", function(value) {

						return value;

					});
					this.getView().byId("ATTR1").bindProperty("text",
							"ProjectMilestone", function(value) {
						if(value == "")
							return value;
						else
							return value.replace(/^0+/, '');

					});


					this.getView().byId("MAIN_LIST_ITEM").bindProperty("number",
							"MilestoneDays", function(value) {
						if(value == "")
						{
							return value;
						}else{
							if (value < 0)
								return -(value);
							else
								return value;
						}
					});

					this.getView().byId("milestoneType").bindProperty(
							"text", "MilestoneDays", function(value) {
								if (value == 0)
									return "";
								else{
									if (value < 0)
										return oI18nModel.getResourceBundle().getText("OVERDUE_NEW");
									else
										return oI18nModel.getResourceBundle().getText("DUE_NEW");
								}
							});
					this.getView().byId("milestoneType").bindProperty(
							"state", "MilestoneDays", function(value) {
								if(value == ""){
									return "Warning";
								}else{
									if (value == 0)
										return "Warning";
									else{
										if (value < 0)
											return "Warning";
									} }});
					this.getView().byId("MAIN_LIST_ITEM").bindProperty("numberUnit",
							"MilestoneDays", function(value) {
						if (value == null)
							return "";
						else{
							if (value == 1 || value == -1)
								return oI18nModel.getResourceBundle().getText("DAY_NEW");
							else
								return oI18nModel.getResourceBundle().getText("DAYS_NEW");
						} });




				
				}
			}

			else{
				var that = this;           
				//existing
				sap.ca.scfld.md.controller.ScfldMasterController.prototype.onInit.call(this);
				jQuery.sap.require('sap.ushell.services.AppConfiguration');
				this.AnaNav = true;
				sap.ushell.services.AppConfiguration.getSettingsControl = function(){
					return new sap.ushell.ui.footerbar.SettingsButton();
				};


				//end


				oList=view.byId("list");  

				oList.setShowNoData(true);
				oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
				this.getView().byId("MAIN_LIST_ITEM").bindProperty("title",
						"MilestoneDescription", function(value) {

					return value;

				});
				this.getView().byId("ATTR1").bindProperty("text",
						"ProjectMilestone", function(value) {
					if(value == "")
						return value;
					else
						return value.replace(/^0+/, '');

				});


				this.getView().byId("MAIN_LIST_ITEM").bindProperty("number",
						"MilestoneDays", function(value) {
					if(value == "")
					{
						return value;
					}else{
						if (value < 0)
							return -(value);
						else
							return value;
					}
				});

				this.getView().byId("milestoneType").bindProperty(
						"text", "MilestoneDays", function(value) {
							if (value == 0)
								return "";
							else{
								if (value < 0)
									return oI18nModel.getResourceBundle().getText("OVERDUE_NEW");
								else
									return oI18nModel.getResourceBundle().getText("DUE_NEW");
							}
						});
				this.getView().byId("milestoneType").bindProperty(
						"state", "MilestoneDays", function(value) {
							if(value == ""){
								return "Warning";
							}else{
								if (value == 0)
									return "Warning";
								else{
									if (value < 0)
										return "Warning";
								} }});
				this.getView().byId("MAIN_LIST_ITEM").bindProperty("numberUnit",
						"MilestoneDays", function(value) {
					if (value == null)
						return "";
					else{
						if (value == 1 || value == -1)
							return oI18nModel.getResourceBundle().getText("DAY_NEW");
						else
							return oI18nModel.getResourceBundle().getText("DAYS_NEW");
					} });




			}

		}
//		else{}

		// else{}

	},


	fixCountIssue: function(){
		jQuery.sap.require('sap.ca.scfld.md.app.MasterHeaderFooterHelper');   
		sap.ca.scfld.md.app.MasterHeaderFooterHelper.prototype.setHeaderFooter = function(oController,oOptions,bAllDisabled,bKeepModifications){
			if(!oOptions){
				return;
			} 
			if((oController.crossNavigation!=undefined)&&(oController.crossNavigation==true))
				bAllDisabled = true;
			var oPage = this.oCommonHeaderFooterHelper.startBuild(oController,oOptions,{ bEditState : false, bIsSearching : false, bAllDisabled : bAllDisabled}, bKeepModifications);
			this.defineHeader(oController,oPage);
			this.defineFooter(oController,oPage);
			this.oApplicationImplementation.oCurController.MasterCtrl = oController;
			this.oApplicationImplementation.oCurController.FullCtrl = null;
			this.oCommonHeaderFooterHelper.endBuild(oController);

			var oList = oController.getList();
			var aItems = oList.getBinding("items");
			if(typeof aItems!="undefined"){
				var iCount = aItems.getLength();  
				if((iCount==1)&&(typeof oController.getList().getItems()[1]!="undefined")){
					var oListItem = oController.getList().getItems()[1];
					oController.getList().fireSelect({
						listItem : oListItem
					});
				}
			}
		};
	},





	applyBackendSearchPattern: function(sFilterPattern,oBinding){
		var oI18nModel = this._oApplicationImplementation.AppI18nModel;
		var oList = this.getList();
		oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
		oList.setShowNoData(true);

		var searchQuery = sFilterPattern;
		this.sFilterPattern = sFilterPattern;
		/* eslint-disable sap-no-global-define */ 
		window.index =1;
		/* eslint-enable sap-no-global-define */ 
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();

		var that = this; 
		if (searchQuery && searchQuery != "")
			var oFilter1 = new sap.ui.model.Filter('WBSElement','EQ', searchQuery);
		else
			oFilter1 = new sap.ui.model.Filter('','', searchQuery);
		var testfornoresults = jQuery.proxy(function(){
			var oList = this.byId('list');
			var oPage = this.byId('page');
			var oDetailPage = oApplicationImplementation.oSplitContainer.getCurrentDetailPage();
			var contentList=oDetailPage.getContent();
			var pageContent = contentList[0].getContent();
//			var count = this.byId('list').getBinding("items").getLength();
			var count = oList.getItems().length;
			if(count==0){
				//sap.ca.ui.utils.busydialog.releaseBusyDialog();   
				//sap.m.BusyDialog.close()
				oList.setShowNoData(true);
				oList.setNoDataText(oI18nModel.getResourceBundle().getText('EMPTY_SEARCH_RESULT'));
				//that.showEmptyView();


			}else{
				oList.setShowNoData(false);
				oList.setNoDataText("");
				for(var i = 0; i < pageContent.length; i++){
					pageContent[i].setVisible(true);
				}

			}
			oBinding.detachFilter(testfornoresults);

		},this);
		this.initialLoad = 1;
		oBinding.attachFilter(testfornoresults,this);
		oBinding.filter(oFilter1);

	},

	isBackendSearch: function(oEvent){
		return true;
	},

	_handleSelect : function(oEvent) {
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		var oI18nModel = oApplicationImplementation.AppI18nModel;
		var v1 = oEvent.getSource().getParent().getParent().getParent().getParent();
		if(v1.getParent().getAggregation("content")[0]._aDetailPages[0] !== undefined){
			if(v1.getParent().getAggregation("content")[0]._aDetailPages[0].byId("actualDate") != undefined)
				v1.getParent().getAggregation("content")[0]._aDetailPages[0].byId("actualDate").setValue("");
		}
		this.setListItem(oEvent.getParameter("listItem"));
		if (!sap.ui.Device.phone) {
			// note: this only applies when device is in
			// portrait mode
			oApplicationImplementation.oSplitContainer.hideMaster();
		}
	},

	onDataLoaded : function(){
		this.oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		this.oI18nModel =  this.oApplicationFacade.oApplicationImplementation.AppI18nModel;
		var oList = this.getList();
		oList.setShowNoData(true);
		oList.setNoDataText(this.oI18nModel.getResourceBundle().getText('LOADING'));
		var count = oList.getBinding("items").getLength();
		var oURLParsing = sap.ushell.Container.getService("URLParsing");
		if (count === 0 ){
			if(this.initialLoad == 0){
				oList.setNoDataText(this.oI18nModel.getResourceBundle().getText("EMPTY_SEARCH_RESULT"));
				if (!sap.ui.Device.phone) {
					this.showEmptyView();
				}	
				this.initialLoad = this.initialLoad+1;
				if(this.flag === 1 ){
					var that = this;
					var oDialog = new sap.m.Dialog({
						
							type:'Message',
									content: new sap.m.Text({
										text: that.oApplicationFacade.oApplicationImplementation.AppI18nModel.getResourceBundle().getText('WRONG_MLST')
									}),
								beginButton: new sap.m.Button({
									text: 'OK', 
										press: function(){
											window.history.go(-1); 
										}
								})	,
								afterClose: function(){
									oDialog.destroy();
								}
					});
					this.flag= 0;
					oDialog.open();
				}
			}else{
				oList.setNoDataText(this.oI18nModel.getResourceBundle().getText("EMPTY_SEARCH_RESULT")); 
					if (!sap.ui.Device.phone) {
					this.showEmptyView();
				}	
				if(this.flag === 1 ){
					var that = this;
					var oDialog = new sap.m.Dialog({
						
							type:'Message',
									content: new sap.m.Text({
										text: that.oApplicationFacade.oApplicationImplementation.AppI18nModel.getResourceBundle().getText('WRONG_MLST')
									}),
								beginButton: new sap.m.Button({
									text: 'OK', 
										press: function(){
											window.history.go(-1); 
										}
								})	,
								afterClose: function(){
									oDialog.destroy();
								}
					});
					this.flag= 0;
					oDialog.open();
				}
			}

		}else{
			/* eslint-disable sap-no-global-define */ 
			if(window.index == 1){
				/* eslint-enable sap-no-global-define */ 
				this.selectFirstItem();
			}else{
				/* eslint-disable sap-no-global-define */ 
				if(window.mlstblank !== undefined){
					/* eslint-enable sap-no-global-define */ 
					var flg = 0;
					/* eslint-disable sap-no-global-define */ 
					window.initialLoad =0;
					/* eslint-enable sap-no-global-define */ 
					for(var i=0;i<count;i++){
						/* eslint-disable sap-no-global-define */ 
						if(window.mlstblank ===	oList.getBinding("items").aKeys[i].match(/'([^']+)'/)[1]){
							/* eslint-enable sap-no-global-define */ 
							flg = 1;
						}
					}
					/* eslint-disable sap-no-global-define */ 
					
					if(flg === 0 && oURLParsing.getHash("#"+window.location.href).search("&/detail") != -1){
						var path = oURLParsing.getHash("#"+window.location.href).split("&/detail");

						//window.location.replace(path[0]);
						/* eslint-enable sap-no-global-define */ 
						this.selectFirstItem();

					}
				}}
			oList.setNoDataText("");
		}
	},





	//------grouping by button---------//
	getHeaderFooterOptions : function() {
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		var oList = this.getList();
		if(this.Ref === 1){
			this.selectFirstItem();
			this.Ref=0;
		}
//		if(oList.getBinding("items").getLength() != 0)
//	this.selectFirstItem();
		var oI18nModel = oApplicationImplementation.AppI18nModel;

		return {


			sI18NMasterTitle : oI18nModel.getProperty("MASTER_TITLE_NEW"),

			oGroupOptions: {
				sId: "groupId",
				bDisabled: false,

				aGroupItems: [{text: oI18nModel.getProperty("NO_GRP"),
					key: "no"},
					{text:oI18nModel.getProperty("PROJ"), key: "proj"}],
					onGroupSelected: jQuery.proxy(function(oEvent){
						this._openGroupByPopover(oEvent);
					},this)
			}

		};

	},
	_handleGroupingChanged : function(oEvt){

		var key=oEvt;
		if (key == "no") {
			this.bindList2('Project');

		}
		if (key == "proj") {
			this.bindList('Project');


		}



	},
	_openGroupByPopover : function(oEvt){
		this._handleGroupingChanged(oEvt);
	},

	//--------end of grouping----------//

//	---------Grouping------------


	bindList2:function(sPath){
		var that=this;
		var view=this.getView();
		var oTemp=this.getView().byId("MAIN_LIST_ITEM");
		var oList=view.byId("list");
		var oFilter1 = new sap.ui.model.Filter('WBSElement',sap.ui.model.FilterOperator.Contains, this.sFilterPattern);
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		var oI18nModel = oApplicationImplementation.AppI18nModel;
		this.groupingFlag = false;
		oList.setShowNoData(true);
		oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
		if(this.sFilterPattern != ""){
			oList.bindAggregation("items",{

				path : "/MilestoneDetailSet",
				template : oTemp,
				filters : oFilter1,
				groupHeaderFactory : function(oGroup){

					return new sap.m.GroupHeaderListItem({title: oGroup.text, upperCase : false });

				}

			});
		}
		else{
			oList.bindAggregation("items",{

				path : "/MilestoneDetailSet",
				template : oTemp,
				groupHeaderFactory : function(oGroup){

					return new sap.m.GroupHeaderListItem({title: oGroup.text, upperCase : false });

				}

			});
		}

		this.registerMasterListBind(oList);
	},

	bindList:function(sPath){
		var that=this;
		var view=this.getView();
		var oFilter1 = new sap.ui.model.Filter('WBSElement',sap.ui.model.FilterOperator.Contains, this.sFilterPattern);
		var oTemp=this.getView().byId("MAIN_LIST_ITEM");
		var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
		var oI18nModel = oApplicationImplementation.AppI18nModel;
		this.groupingFlag = true;
		var oList=view.byId("list");
		oList.setShowNoData(true);
		oList.setNoDataText(oI18nModel.getResourceBundle().getText('LOADING'));
		var oSorter = new sap.ui.model.Sorter({
			path : sPath, 
			descending : false,

			group : that.groupByProject
		});
		if(this.sFilterPattern != ""){
			oList.bindAggregation("items",{ 

				path : "/MilestoneDetailSet",
				template : oTemp,
				filters : oFilter1,
				sorter : oSorter,
				groupHeaderFactory : function(oGroup){

					return new sap.m.GroupHeaderListItem({title: oGroup.text, upperCase : false });

				}

			});
		} 
		else{
			oList.bindAggregation("items",{ 

				path : "/MilestoneDetailSet",
				template : oTemp,
				sorter : oSorter,
				groupHeaderFactory : function(oGroup){

					return new sap.m.GroupHeaderListItem({title: oGroup.text, upperCase : false });

				}

			}); 
		}
		this.registerMasterListBind(oList);
	},


	groupByProject : function(oCtxt){
		return {
			key : oCtxt.getProperty('Project'),
			text : "Project  [" + oCtxt.getProperty('Project')+"]"
		};            
	}

//	---------Grouping------------



});


/* eslint-enable sap-no-global-define */