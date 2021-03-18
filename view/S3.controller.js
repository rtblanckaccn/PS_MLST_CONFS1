/*
 * Copyright (C) 2009-2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.require("sap.m.MessageBox");jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");sap.ca.scfld.md.controller.BaseDetailController.extend("i2d.ps.milestone.confirm.s1.view.S3",{onInit:function(){this.pressed=0;this.errorcheck=false;sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);var v=this.getView();var t=this;this.jamDisable=null;this.oRouter.attachRouteMatched(function(e){if(e.getParameter("name")==="detail"){var f=new sap.ui.model.Context(v.getModel(),'/'+e.getParameter("arguments").contextPath);v.setBindingContext(f);this.mlsts=f.sPath.match(/'([^']+)'/)[1];window.mlstblank=this.mlsts;var u=sap.ushell.Container.getService("URLParsing");var l=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList();var g=0;if(this.getView().byId("actualDate")){this.getView().byId("actualDate").setValue("");}var L=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().AnaNav;this.oNpart='';if(L==true){var h=u.getHash("#"+window.location.href);if(h.indexOf("?")===-1){var p=h.split("#");var P=p[0]+"#discuss&";}else{var p=h.split("?");var P=p[0]+"?discuss&";}if(h.search("&/detail")!==-1){var j=p[1].split("(");this.oNpart=P+j[0]+"('"+this.mlsts+"')";}else{this.oNpart=P+p[1]+"&/detail/MilestoneDetailSet"+"('"+this.mlsts+"')";}}else{this.oNpart=u.getHash("#"+window.location.href);}for(var i=0;i<this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getBinding("items").getLength();i++){if(l.getBinding("items").aKeys[i]!==undefined){if(window.mlstblank===l.getBinding("items").aKeys[i].match(/'([^']+)'/)[1]){g=1;}g=1;}}if(g===0&&u.getHash("#"+window.location.href).search("&/detail")!=-1){var k=u.getHash("#"+window.location.href).split("&/detail");location.replace(k[0]);}this.oApplicationImplementation.bookmarkFlag=false;if(typeof f.oModel.getData(f.sPath)=="undefined")this.oApplicationImplementation.bookmarkFlag=true;this.setHeaderFooterOptions(this.getHeaderFooterOptionsforDetail());if(t._oControlStore.oShareSheet!==undefined){if(t._oControlStore.oShareSheet.getAggregation("buttons")){for(i=0;i<t._oControlStore.oShareSheet.getAggregation("buttons").length;i++){if(t._oControlStore.oShareSheet.getAggregation("buttons")[i].getProperty("icon")=="sap-icon://add-favorite")t._oControlStore.oShareSheet.getAggregation("buttons")[i].setVisible(false);}}}}},this);var o=0;var a=sap.ca.scfld.md.app.Application.getImpl();var I=a.AppI18nModel;if(!sap.ui.Device.phone){var c=this.getView().byId("CompletionPercent");c.setWidth("33%");var b=this.getView().byId("InvoicePercent");b.setWidth("33%");var d=this.getView().byId("actualDate");d.setWidth("33%");}else{var c=this.getView().byId("CompletionPercent");c.setWidth("100%");var b=this.getView().byId("InvoicePercent");b.setWidth("100%");var d=this.getView().byId("actualDate");d.setWidth("100%");}this.getView().byId("CompletionPercent").bindProperty("displayValue","CompletionRateInPercent",function(e){if(e!=null){e=e.replace(/(\.[0-9]*?)0+$/,"");if(e)return parseFloat(e)+"%";else return o;}else{var f=0;return parseFloat(f)+"%";}});this.getView().byId("CompletionPercent").bindProperty("percentValue","CompletionRateInPercent",function(e){if(e!=null){e=e.replace(/(\.[0-9]*?)0+$/,"");if(e)return parseFloat(e);else return o;}else{var f=0;return parseFloat(f);}});this.getView().byId("InvoicePercent").bindProperty("displayValue","ProjCostToBeInvoicedpercent",function(e){if(e!=null){e=e.replace(/(\[0-9]*?)0+$/,"");if(e)return parseFloat(e)+"%";else return o;}else{var f=0;return parseFloat(f)+"%";}});this.getView().byId("InvoicePercent").bindProperty("percentValue","ProjCostToBeInvoicedpercent",function(e){if(e!=null){e=e.replace(/(\[0-9]*?)0+$/,"");if(e)return parseFloat(e);else return o;}else{var f=0;return parseFloat(f);}});this.getView().byId("detail_list").bindProperty("title","MilestoneDescription",function(e){return e;});this.getView().byId("DetailATTR1").bindProperty("text","ProjectMilestone",function(e){if(e!=null&&e!=true)return e.replace(/^0+/,'');});this.getView().byId("detail_list").bindProperty("number","MilestoneDays",function(e){if(e<0)return-(e);else return e;});this.getView().byId("detail_list").bindProperty("numberUnit","MilestoneDays",function(e){if(e==1||e==-1)return I.getProperty("DAY_NEW");else return I.getProperty("DAYS_NEW");});this.getView().byId("milestoneType_detail").bindProperty("text","MilestoneDays",function(e){if(e==0)return"";else{if(e<0)return I.getProperty("OVERDUE_NEW");else return I.getProperty("DUE_NEW");}});this.getView().byId("milestoneType_detail").bindProperty("state","MilestoneDays",function(e){if(e<0)return"Warning";});this.getView().byId("change1").bindProperty("text","MilestoneTypeFlag",function(e){if(e=="A")return I.getProperty("ACTIVITY");else return I.getProperty("WBS_ELEMENT");});this.getView().byId("change2").bindProperty("text","MilestoneTypeFlag",function(e){if(e=="A")return I.getProperty("DETAIL_ACTIVITY_DESC");else return I.getProperty("WBS_DESC");});},onBeforeRendering:function(){if(this.getView().byId("actualDate")){this.getView().byId("actualDate").setValue("");}},navToSubview:function(){this.oRouter.navTo("subDetail",{contextPath:this.getView().getBindingContext().sPath.substr(1)});},navToEmpty:function(){this.oRouter.navTo("noData");},WBSCheck:function(W,N,P,M){if(M=="A"){return N+" "+P;}else{return W;}},WBS_ACT:function(w,n,a){if(w==""){return n+' '+a;}else{return w;}},WBS_DESC:function(w,a){return w+a;},Alertconfirm:function(){var t=this;var a=sap.ca.scfld.md.app.Application.getImpl();var i=a.AppI18nModel;if(sap.ui.getCore().byId("pop_confirm")!==undefined)sap.ui.getCore().byId("pop_confirm").destroy();var c=new sap.m.Dialog({title:i.getProperty("MSG_HEAD"),content:new sap.m.Text({text:i.getProperty("CONF_MSG")}).addStyleClass("fioriMessageContentPadding"),beginButton:new sap.m.Button("pop_confirm",{text:i.getProperty("DETAIL_CONFIRM"),press:function(){t.pressed=1;if(t.getView().byId("actualDate").getValue()==""){var a=sap.ca.scfld.md.app.Application.getImpl();var i=a.AppI18nModel;var E=i.getProperty('Enter_Date');sap.m.MessageBox.alert(E);c.close();}else{t.confirm();c.close();var k=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().kpiid;var v=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().variantid;var b=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().tiletype;if(sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService){var C=sap.ushell.Container.getService("CrossApplicationNavigation");var d=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().crossNavigation;if(d){window.history.go(-1);}}else{jQuery.sap.log.info("Cannot Navigate to Facet Filter - Application Running Standalone");}}}}),endButton:new sap.m.Button({text:i.getProperty("Cancel_Btn"),press:function(){c.close();}})});this.dateid="actualDate";t.ActualDateChange();if(this.errorcheck==false){c.open();}this.errorcheck=false;},confirm:function(){var t=this;var V=this.getView().getBindingContext().getModel().getData(this.getView().getBindingContext().sPath);var n;var p="MilestoneDetailSet(ProjectMilestone='"+V.ProjectMilestone+"')";var m=sap.ca.scfld.md.app.Application.getImpl().getConnectionManager().getModel();var a="MilestoneDetailSet('"+this.mlsts+"')";n=m.oData[a];var s=jQuery.proxy(function(d,r){jQuery.sap.require("sap.m.MessageToast");var A=sap.ca.scfld.md.app.Application.getImpl();var i=A.AppI18nModel;sap.m.MessageToast.show(i.getProperty("SUCCESS_MSG"));var b=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController();b.Ref=1;b.getList().getBinding('items').refresh();if(b.getList().getItems().length==1){b.showEmptyView();}},this);var e=jQuery.proxy(function(h,c,r,u){if(h.response!=undefined){var b=h.response.body;var d=JSON.parse(b);var E=d.error.innererror.errordetails[0].message;if(E!="Exception raised without specific error")sap.m.MessageBox.alert(E);else{jQuery.sap.require("sap.m.MessageToast");var A=sap.ca.scfld.md.app.Application.getImpl();var i=A.AppI18nModel;sap.m.MessageToast.show(i.getProperty("SUCCESS_MSG"));var f=t.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController();f.Ref=1;f.getList().getBinding('items').refresh();}if(h.response.body=="CSRF token validation failed"){}else{t.onRequestFailed(h);}}},this);var P="MilestoneDetailSet(ProjectMilestone='"+V.ProjectMilestone+"')";n.ActualMlstDate=this.ActualDateChange();var v=this.getView().getBindingContext();m.update(P,n,null,s,e);this.getView().setBindingContext(v);},ActualDateChangeView:function(e){var t=this.byId("actualDate");var d=e.getSource();var v=e.getParameter("value");var V=e.getParameter("valid");this._iEvent++;if(V){d.setValueState(sap.ui.core.ValueState.None);}else{d.setValueState(sap.ui.core.ValueState.Error);t.setValue('');}},ActualDateChange:function(e){this.dateid="actualDate";if(this.getView().byId(this.dateid).getValue()!=""&&this.getView().byId(this.dateid).getValue()!==null){var v=new Date(this.getView().byId(this.dateid).getDateValue());if(isNaN(v.getDay())!==true&&v!=undefined&&v!==null){v.setDate(v.getDate());var l=sap.ui.getCore().getConfiguration().getLocale();var d=sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd/MM/yyyy"});var T=new Date(0).getTimezoneOffset()*60*1000;var M=new Date(v.getFullYear(),v.getMonth(),v.getDate(),12,00,00,00);var a=d.format(new Date(M.getTime()+T));var p=new Date(d.parse(a).getTime()-T);var f=p;var b=sap.ui.core.format.DateFormat.getDateInstance({style:'short'},l);f=b.format(f);return p;}else{var A=sap.ca.scfld.md.app.Application.getImpl();var i=A.AppI18nModel;this.ErrorMessage=i.getProperty('Enter_Date_New');var t=this;t.getView().byId(t.dateid).setValue();jQuery.sap.require("sap.m.MessageToast");sap.m.MessageToast.show(t.ErrorMessage);this.errorcheck=true;}}},getHeaderFooterOptionsforDetail:function(){var a=sap.ca.scfld.md.app.Application.getImpl();var i=a.AppI18nModel;var b=this.getView().getModel('i18n').getResourceBundle();var j='';var J='';var o='';var c='';var d='';var e='';var f='';var g='';if(this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem()!=null){o="Confirm Project Milestone "+this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[0].getProperty("text");c=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("title");d=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("number");e=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("numberUnit");f=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[0].getProperty("text");g=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[1].getProperty("text");}else if(this.oApplicationImplementation.bookmarkFlag==true){c=this.oApplicationImplementation.oJamtitle;d=this.oApplicationImplementation.oJamnumber;e=this.oApplicationImplementation.oJamnumberunit;f=this.oApplicationImplementation.oJamattr1;g=this.oApplicationImplementation.oJamattr2;}var h=new sap.m.ObjectHeader({title:c,number:d,numberUnit:e,attributes:[new sap.m.ObjectAttribute({text:f}),new sap.m.ObjectAttribute({text:g})]});var k='(Confirm Project Milestone '+f+' , '+d+' '+e+')';J=f;return{oJamOptions:{oShareSettings:{sId:"jamshare",bDisabled:false,oDataServiceUrl:"/sap/opu/odata/sap/SM_INTEGRATION_SRV/",object:{sId:"jamshare",id:this.oNpart,display:h,share:" "}},oDiscussSettings:{sId:"jamdiscuss",bDisabled:false,oDataServiceUrl:"/sap/opu/odata/sap/SM_INTEGRATION_SRV/",object:{id:'Mlt_cnf',type:'/sap/opu/odata/sap/PS_MILESTONE_CONFIRM/$metadata',name:o,ui_url:this.oNpart}}},sI18NMasterTitle:"DETAIL_TITLE",buttonList:[{sId:"FooterConf",sI18nBtnTxt:b.getText('DETAIL_CONFIRM'),onBtnPressed:jQuery.proxy(function(l){this.Alertconfirm();},this)}]};},Usageformat:function(p,t,s,f){var a=sap.ca.scfld.md.app.Application.getImpl();var I=a.AppI18nModel;var b="";var c="";var d="";var e="";var g=[];if(p!==""){b=I.getProperty("PROGRESS_ANALYSIS");g.push(b);}if(t!==""){c=I.getProperty("SALES_DOC");g.push(c);}if(s!==""){d=I.getProperty("TREND_ANALYSIS");g.push(d);}if(f!==""){e=I.getProperty("MIL_FUNC");g.push(e);}var o='';if(g.length==1){this.byId("usage").addStyleClass("use");}else{this.byId("usage").removeStyleClass("use");}for(var i=0;i<g.length;i++){if(g[i]!='')if(o=='')o=g[i];else o=o+"\r\n\r"+g[i];}return"\r\n"+o;}});
