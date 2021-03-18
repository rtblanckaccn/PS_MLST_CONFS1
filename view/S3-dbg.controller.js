/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
//EXC_ALL_JSHINT_008
//EXC_ALL_JSHINT_038
//EXC_ALL_JSHINT_003
//EXC_ALL_JSHINT_004
//EXC_ALL_JSHINT_002
//EXC_ALL_JSHINT_023
//EXC_ALL_JSHINT_001
//EXC_ALL_JSHINT_039
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");

/* eslint-disable sap-no-global-define */ 

sap.ca.scfld.md.controller.BaseDetailController.extend("i2d.ps.milestone.confirm.s1.view.S3", {

 onInit: function(){ 
  // subscribe for refresh events
  this.pressed = 0; 
  //title="{i18n>DETAIL_TITLE}"
  this.errorcheck = false;
  sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);

  var view = this.getView(); 
  var that = this;
  this.jamDisable = null;
  this.oRouter.attachRouteMatched(function(oEvent) {                                              
   if (oEvent.getParameter("name") === "detail") {        

    var context = new sap.ui.model.Context(view.getModel(), '/' + oEvent.getParameter("arguments").contextPath);
    view.setBindingContext(context);
    this.mlsts = context.sPath.match(/'([^']+)'/)[1];

    /* eslint-disable sap-no-global-define */ 
    window.mlstblank=this.mlsts;
    /* eslint-enable sap-no-global-define */ 
    var oURLParsing = sap.ushell.Container.getService("URLParsing");
    var oList = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList();
    var flg =0;
     if(this.getView().byId("actualDate")){
                    this.getView().byId("actualDate").setValue("");
                   }
                   
    var oLeng=this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().AnaNav;
    this.oNpart = '';
    if(oLeng == true){ 

     /* eslint-disable sap-no-global-define */ 
     var url = oURLParsing.getHash("#"+window.location.href);
     /* eslint-enable sap-no-global-define */ 
     if(url.indexOf("?") === -1){
      var oParts = url.split("#");
      var oPart1 = oParts[0]+"#discuss&"; 
     }else{
      var oParts = url.split("?");
      var oPart1 = oParts[0]+"?discuss&";
     }
     if(url.search("&/detail") !== -1){
      var agsplit = oParts[1].split("(");

      this.oNpart = oPart1 + agsplit[0]+ "('" + this.mlsts + "')";
     }
     else{
      this.oNpart = oPart1 + oParts[1]+ "&/detail/MilestoneDetailSet" +"('" + this.mlsts + "')";
     }


    }
    else{
     /* eslint-disable sap-no-global-define */ 
     this.oNpart= oURLParsing.getHash("#"+window.location.href);
     /* eslint-enable sap-no-global-define */ 
    }


    for(var i=0;i< this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getBinding("items").getLength();i++){
     if(oList.getBinding("items").aKeys[i] !== undefined){
      /* eslint-disable sap-no-global-define */ 
      if(window.mlstblank === oList.getBinding("items").aKeys[i].match(/'([^']+)'/)[1]){
       flg = 1;
      }
      flg=1;
     }
    }
    if(flg === 0 && oURLParsing.getHash("#"+window.location.href).search("&/detail") != -1){
     var path = oURLParsing.getHash("#"+window.location.href).split("&/detail");
     location.replace(path[0]);
     /* eslint-enable sap-no-global-define */ 
     //  this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().selectFirstItem();
    }
    // Make sure the master is here

    this.oApplicationImplementation.bookmarkFlag = false;
    if(typeof context.oModel.getData(context.sPath)=="undefined")
     this.oApplicationImplementation.bookmarkFlag = true;

    this.setHeaderFooterOptions(this.getHeaderFooterOptionsforDetail());
    if(that._oControlStore.oShareSheet !== undefined){
     if(that._oControlStore.oShareSheet.getAggregation("buttons"))
     {
      for( i=0;i<that._oControlStore.oShareSheet.getAggregation("buttons").length;i++)
      {
       if(that._oControlStore.oShareSheet.getAggregation("buttons")[i].getProperty("icon") == "sap-icon://add-favorite")
        that._oControlStore.oShareSheet.getAggregation("buttons")[i].setVisible(false);
      }
     }
    }

   }
  }, this);

        var obj1 = 0;
  var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
  var oI18nModel = oApplicationImplementation.AppI18nModel;
  if (!sap.ui.Device.phone) {
   var compltn_percent = this.getView().byId("CompletionPercent");
   compltn_percent.setWidth("33%");

   var invoice_percent = this.getView().byId("InvoicePercent");
   invoice_percent.setWidth("33%");

   var act_mlstn_date = this.getView().byId("actualDate");
   act_mlstn_date.setWidth("33%");
  }else{
   var compltn_percent = this.getView().byId("CompletionPercent");
   compltn_percent.setWidth("100%");

   var invoice_percent = this.getView().byId("InvoicePercent");
   invoice_percent.setWidth("100%");

   var act_mlstn_date = this.getView().byId("actualDate");
   act_mlstn_date.setWidth("100%");
  }
  //completed percent
  // this.getView().byId("basic").bindProperty("text",
  //   "ScheduledBasicDate", function(obj) { 
  //  if(obj != null){
  //   var basDate = new Date(obj);
  //   //basic date handle

  //   var locale = sap.ui.getCore().getConfiguration().getLocale();

  //   var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({style: 'short'},locale);   
  //   //{pattern : "dd.MM.yyyy" }
  //   // timezoneOffset is in hours convert to milliseconds  
  //   var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;  
  //   // format date and time to strings offsetting to GMT  
  //   var MlstDt=new Date(basDate.getUTCFullYear(),basDate.getUTCMonth(),basDate.getUTCDate(),12 , 
  //     00, 00 ,00);
  //   var dateStr = dateFormat.format(new Date(MlstDt.getTime() + TZOffsetMs)); //05-12-2012   
  //  }else{
  //   dateStr = "";
  //  }
  //  return dateStr;

  // });


  this.getView().byId("CompletionPercent").bindProperty("displayValue",
    "CompletionRateInPercent", function(obj) {

   if(obj != null ){
    obj = obj.replace(/(\.[0-9]*?)0+$/, "");


    if (obj)
     return parseFloat(obj)+"%";
    else
     return obj1;}
   else{
    var obj2 = 0 ;
    return parseFloat(obj2) +"%";
   }
  });
  this.getView().byId("CompletionPercent").bindProperty("percentValue",
    "CompletionRateInPercent", function(obj) {
   if(obj != null ){
    obj = obj.replace(/(\.[0-9]*?)0+$/, "");


    if (obj)
     return parseFloat(obj);
    else
     return obj1;}
   else{
    var obj2 = 0;
    return parseFloat(obj2);
   }
  });

  //invioce percent
  this.getView().byId("InvoicePercent").bindProperty("displayValue",
    "ProjCostToBeInvoicedpercent", function(obj) {

   if(obj != null ){
    obj = obj.replace(/(\[0-9]*?)0+$/, "");


    if (obj)
     return parseFloat(obj)+"%";
    else
     return obj1;}
   else{
    var obj2 = 0 ;
    return parseFloat(obj2) +"%";
   }
  });
  this.getView().byId("InvoicePercent").bindProperty("percentValue",
    "ProjCostToBeInvoicedpercent", function(obj) {
   if(obj != null ){
    obj = obj.replace(/(\[0-9]*?)0+$/, "");


    if (obj)
     return parseFloat(obj);
    else
     return obj1;}
   else{
    var obj2 = 0;
    return parseFloat(obj2);
   }
  });


  this.getView().byId("detail_list").bindProperty("title",
    "MilestoneDescription", function(value) {

   return value;

  });
  this.getView().byId("DetailATTR1").bindProperty("text",
    "ProjectMilestone", function(value) {
   if(value != null && value != true)
    return value.replace(/^0+/, '');

  });


  this.getView().byId("detail_list").bindProperty("number",
    "MilestoneDays", function(value) {
   if (value < 0)
    return -(value);
   else
    return value;
  });
  this.getView().byId("detail_list").bindProperty("numberUnit",
    "MilestoneDays", function(value) {
   if (value == 1 || value == -1)
    return oI18nModel.getProperty("DAY_NEW");
   else
    return oI18nModel.getProperty("DAYS_NEW");
  });

  this.getView().byId("milestoneType_detail").bindProperty(
    "text", "MilestoneDays", function(value) {
     if (value == 0)
      return "";
     else{
      if (value < 0)
       return oI18nModel.getProperty("OVERDUE_NEW");
      else
       return oI18nModel.getProperty("DUE_NEW");
     }
    });
  this.getView().byId("milestoneType_detail").bindProperty(
    "state", "MilestoneDays", function(value) {
     if (value < 0)
      return "Warning";
    });
  this.getView().byId("change1").bindProperty(
    "text", "MilestoneTypeFlag", function(value) {
     if (value =="A")
      return oI18nModel.getProperty("ACTIVITY");
     else
      return oI18nModel.getProperty("WBS_ELEMENT");
    });
  this.getView().byId("change2").bindProperty(
    "text", "MilestoneTypeFlag", function(value) {
     if (value =="A")
      return oI18nModel.getProperty("DETAIL_ACTIVITY_DESC");
     else
      return oI18nModel.getProperty("WBS_DESC");
    });


  //sap.ca.ui.utils.busydialog.releaseBusyDialog();

 },
 onBeforeRendering: function() {

  if(this.getView().byId("actualDate")){
   this.getView().byId("actualDate").setValue("");
  }
 },

 navToSubview : function() {

  this.oRouter.navTo("subDetail", {                                                                
   contextPath : this.getView().getBindingContext().sPath.substr(1)
  });
 },
 navToEmpty : function() {                                                                               
  this.oRouter.navTo("noData");                                                                    
 },       
 WBSCheck: function(WBSElement,NetworkActivity,ProjectNetwork,MilestoneTypeFlag){

  if(MilestoneTypeFlag=="A"){
   return NetworkActivity+" "+ProjectNetwork;
  }
  else{
   return WBSElement;
  }

 },

 WBS_ACT: function(wbs,net,act){

  if(wbs == ""){
   return net+' '+act;
  }else{
   return wbs;
  }
 },
 WBS_DESC: function(wbs,act){


  return wbs+act;

 },

 Alertconfirm: function(){

  var that = this;  

  var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
  var oI18nModel = oApplicationImplementation.AppI18nModel;
  if(sap.ui.getCore().byId("pop_confirm") !== undefined)
         sap.ui.getCore().byId("pop_confirm").destroy();
  var confirmPopup = new sap.m.Dialog({
   //title: this.oBundle.getText("Confirm_Sys_Status_TITLE"),//"Confirm System Status Change",
   title:  oI18nModel.getProperty("MSG_HEAD"),
   content: new sap.m.Text({
    text: oI18nModel.getProperty("CONF_MSG") 
   }).addStyleClass("fioriMessageContentPadding"), 
   beginButton: new sap.m.Button("pop_confirm",{
    text: oI18nModel.getProperty("DETAIL_CONFIRM"),

    press:function(){ 
     that.pressed = 1;
     if(that.getView().byId("actualDate").getValue() == ""){
      var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
      var oI18nModel = oApplicationImplementation.AppI18nModel;
      var ErrorMessage = oI18nModel.getProperty('Enter_Date');
      sap.m.MessageBox.alert(ErrorMessage);
      confirmPopup.close();
     }else{
      that.confirm();      
      //     sap.ui.getCore().getEventBus().publish("nav", "back");
      confirmPopup.close();
      var kpiid = that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().kpiid;
      var variantid = that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().variantid;
      var tiletype = that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().tiletype;
      //Fixing back navigation for due/overdue milestones
      //if(kpiid != undefined){
       if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
        var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
        var isNavigation=that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().crossNavigation;
        if(isNavigation){
         /* eslint-disable sap-no-global-define */ 
         window.history.go(-1);  
         /* eslint-enable sap-no-global-define */ 
        }
       }
       else{
        jQuery.sap.log.info("Cannot Navigate to Facet Filter - Application Running Standalone");
      // }
      }}
    }
   }),
   endButton: new sap.m.Button({
    text: oI18nModel.getProperty("Cancel_Btn"),
    press:function(){
     //     sap.ui.getCore().getEventBus().publish("nav", "back");
     confirmPopup.close();
    }

   })

  });


  this.dateid = "actualDate";


//  if(sap.ui.Device.system.phone){
//  if (this.getView().byId(this.dateid).getValue() != "") {


//  var vdate2 = new Date(this.getView().byId(this.dateid).getDateValue());
//  if(isNaN(vdate2.getDay()) != true)
//  {
//  confirmPopup.open();

//  } 
//  }
//  }else{
  that.ActualDateChange();
  if(this.errorcheck == false){

   confirmPopup.open();
  }
  this.errorcheck = false;
  //}


 },


 confirm: function(){
  //this.vatr =  sap.ca.scfld.md. ;
  var that = this;
  var ViewData = this.getView().getBindingContext().getModel().getData(this.getView().getBindingContext().sPath);
  var newdata;
//  var successCallbackUpdateDetail1 = jQuery.proxy(function (oData, oResponse) {   
//  newdata = oData;
//  }, this);

//  var fnErrorCallBack1 = jQuery.proxy(function (iHttpStatus, sContentType, sResponse, oUserData) {

//  if(iHttpStatus.response != undefined){
//  var v1=iHttpStatus.response.body; 
//  var v2=JSON.parse(v1);                                
//  var ErrMsg = v2.error.innererror.errordetails[0].message;
//  if(ErrMsg!="Exception raised without specific error")
//  sap.m.MessageBox.alert(ErrMsg);
//  if(iHttpStatus.response.body== "CSRF token validation failed"){
//  //handle CSRF
//  } else {
//  that.onRequestFailed(iHttpStatus);
//  }
//  }
//  }, this);
  var sPath = "MilestoneDetailSet(ProjectMilestone='"+ViewData.ProjectMilestone+"')";   

  var model2 = sap.ca.scfld.md.app.Application.getImpl().getConnectionManager().getModel();
  // model1.read(sPath, null, null, false, successCallbackUpdateDetail1,fnErrorCallBack1 );
//  var count = 0;
//  var i;
//  var miles = this.mlsts;

//  for (i in model1.oData) {
//  if (model1.oData.hasOwnProperty(i)) {
//  count++;
//  }
//  }
//  for(i=0;i<count;i++){
//  if(oUrlnew.search(miles) != -1){

  var miles = "MilestoneDetailSet('" +this.mlsts+ "')";
  newdata = model2.oData[miles];
  //}}
  var successCallbackUpdateDetail = jQuery.proxy(function (oData, oResponse) {
   jQuery.sap.require("sap.m.MessageToast");
   var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
   var oI18nModel = oApplicationImplementation.AppI18nModel; 

   sap.m.MessageToast.show(oI18nModel.getProperty("SUCCESS_MSG"));

   var masterpage =  that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController();
   masterpage.Ref =1;
   masterpage.getList().getBinding('items').refresh();
 if ( masterpage.getList().getItems().length ==1){
  masterpage.showEmptyView();
 }

  }, this);

  var fnErrorCallBack = jQuery.proxy(function (iHttpStatus, sContentType, sResponse, oUserData) {

   if(iHttpStatus.response != undefined){
    var v1=iHttpStatus.response.body;
    var v2=JSON.parse(v1);

    var ErrMsg = v2.error.innererror.errordetails[0].message;
    if(ErrMsg!="Exception raised without specific error")
     sap.m.MessageBox.alert(ErrMsg);
    else{
     jQuery.sap.require("sap.m.MessageToast");
     var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
     var oI18nModel = oApplicationImplementation.AppI18nModel; 

     sap.m.MessageToast.show(oI18nModel.getProperty("SUCCESS_MSG"));

     var masterpage =  that.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController();
     masterpage.Ref =1;
     masterpage.getList().getBinding('items').refresh();

    }
    if(iHttpStatus.response.body== "CSRF token validation failed"){
     //handle CSRF
    } else {
     that.onRequestFailed(iHttpStatus);
    }
   }
  }, this);

  var sPath1 = "MilestoneDetailSet(ProjectMilestone='"+ViewData.ProjectMilestone+"')";   
  //date =  new Date(DateTimeFormatter.formatFullDate(sap.ui.getCore().byId("__input0").getValue()));
  newdata.ActualMlstDate = this.ActualDateChange();
  var oViewContext = this.getView().getBindingContext();

  model2.update(sPath1, newdata, null, successCallbackUpdateDetail,fnErrorCallBack);
  //this.getView().setBindingContext(oViewContext);
  this.getView().setBindingContext(oViewContext);
 },
 ActualDateChangeView : function(oEvent) {

  var oText = this.byId("actualDate");
   var oDP = oEvent.getSource();
   var sValue = oEvent.getParameter("value");

   var bValid = oEvent.getParameter("valid");
   this._iEvent++;

   if (bValid) {
    oDP.setValueState(sap.ui.core.ValueState.None);

   } else {
    oDP.setValueState(sap.ui.core.ValueState.Error);
       oText.setValue('');
   }




  /*this.dateid = "actualDate";
  if (this.getView().byId(this.dateid).getValue() != "" &&  this.getView().byId(this.dateid).getValue() !== null) {


   var vdate2 = new Date(this.getView().byId(this.dateid).getDateValue());
   if(isNaN(vdate2.getDay()) !== true && vdate2 != undefined && vdate2!== null)
   {
    vdate2.setDate(vdate2.getDate()); 

    var locale = sap.ui.getCore().getConfiguration().getLocale();
       
    var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd/MM/yyyy" });   

    // timezoneOffset is in hours convert to milliseconds  
    var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;  
    // format date and time to strings offsetting to GMT  
    var MlstDt=new Date(vdate2.getFullYear(),vdate2.getMonth(),vdate2.getDate(), 12, 00, 00,00);

    var dateStr = dateFormat.format(new Date(MlstDt.getTime() + TZOffsetMs)); //05-12-2012
    var parsedDate = new Date(dateFormat.parse(dateStr).getTime() - TZOffsetMs); //1354665600000     

    //to display in UI
    var formattedDate = parsedDate;
    var dateFormat2 = sap.ui.core.format.DateFormat.getDateInstance({style: 'short'},locale);
    formattedDate = dateFormat2.format(formattedDate);
    this.byId("actualDate").setValue(formattedDate);

    return parsedDate;

   } 
   else {
    var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
    var oI18nModel = oApplicationImplementation.AppI18nModel;
    this.ErrorMessage = oI18nModel.getProperty('Enter_Date_New');
    var that = this;
    that.getView().byId(that.dateid).setValue();
    jQuery.sap.require("sap.m.MessageToast");
    sap.m.MessageToast.show(that.ErrorMessage);
    this.errorcheck = true;
    // this.InputError.open();

   } 
  }
*/

 },




  ActualDateChange : function(oEvent) {

 //
  this.dateid = "actualDate";
  if (this.getView().byId(this.dateid).getValue() != "" &&  this.getView().byId(this.dateid).getValue() !== null) {


   var vdate2 = new Date(this.getView().byId(this.dateid).getDateValue());
   if(isNaN(vdate2.getDay()) !== true && vdate2 != undefined && vdate2!== null)
   {
    vdate2.setDate(vdate2.getDate()); 

    var locale = sap.ui.getCore().getConfiguration().getLocale();
       
    var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd/MM/yyyy" });   

    // timezoneOffset is in hours convert to milliseconds  
    var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;  
    // format date and time to strings offsetting to GMT  
    var hours  = new Date().getHours();
    var mins   = new Date().getMinutes(); 
    var sec    = new Date().getSeconds();
    var milsec = new Date().getMilliseconds();
   // var MlstDt=new Date(vdate2.getFullYear(),vdate2.getMonth(),vdate2.getDate(), 12, 00, 00,00);
       var MlstDt=new Date(vdate2.getFullYear(),vdate2.getMonth(),vdate2.getDate(), hours, mins, sec, milsec);

      //var dateStr = dateFormat.format(new Date(MlstDt.getTime() + TZOffsetMs)); //05-12-2012
      //var parsedDate = new Date(dateFormat.parse(dateStr).getTime() - TZOffsetMs); //1354665600000     
    var dateStr = dateFormat.format(new Date(MlstDt.getTime()));
    var parsedDate = new Date(dateFormat.parse(dateStr).getTime() - TZOffsetMs);
    //to display in UI
    var formattedDate = parsedDate;
    var dateFormat2 = sap.ui.core.format.DateFormat.getDateInstance({style: 'short'},locale);
    formattedDate = dateFormat2.format(formattedDate);
   // this.byId("actualDate").setValue(formattedDate);

   //return parsedDate;
   return MlstDt;
   } 
   else {
    var  oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
    var oI18nModel = oApplicationImplementation.AppI18nModel;
    this.ErrorMessage = oI18nModel.getProperty('Enter_Date_New');
    var that = this;
    that.getView().byId(that.dateid).setValue();
    jQuery.sap.require("sap.m.MessageToast");
    sap.m.MessageToast.show(that.ErrorMessage);
    this.errorcheck = true;
    // this.InputError.open();

   } 
  }


 },
 getHeaderFooterOptionsforDetail : function() {

  var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
  var oI18nModel = oApplicationImplementation.AppI18nModel;

  var i18n = this.getView().getModel('i18n').getResourceBundle();
  var oJamPath = '';
  var oJamMilestone = '';
  var oJamContext = '';
  var oJamtitle = '';
  var oJamnumber = '';
  var oJamnumberunit = '';
  var oJamattr1 = '';
  var oJamattr2 = '';
  if(this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem()!=null){
   oJamContext = "Confirm Project Milestone " + this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[0].getProperty("text");
   oJamtitle = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("title");
   oJamnumber = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("number");
   oJamnumberunit = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getProperty("numberUnit");
   oJamattr1 = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[0].getProperty("text");
   oJamattr2 = this.oApplicationImplementation.oSplitContainer._aMasterPages[0].getController().getList().getSelectedItem().getAttributes()[1].getProperty("text");
  }
  else if(this.oApplicationImplementation.bookmarkFlag==true){

   oJamtitle = this.oApplicationImplementation.oJamtitle;
   oJamnumber = this.oApplicationImplementation.oJamnumber;
   oJamnumberunit=this.oApplicationImplementation.oJamnumberunit;
   oJamattr1 = this.oApplicationImplementation.oJamattr1;
   oJamattr2 = this.oApplicationImplementation.oJamattr2;


  }

  var oJamObjectHeader = new sap.m.ObjectHeader({
   title : oJamtitle,
   number : oJamnumber,
   numberUnit :oJamnumberunit,
   attributes : [
                 new sap.m.ObjectAttribute({
                  text : oJamattr1
                 }),
                 new sap.m.ObjectAttribute({
                  text : oJamattr2
                 })]
  });
  var oJamShare = '(Confirm Project Milestone ' + oJamattr1 + ' , ' + oJamnumber + ' ' + oJamnumberunit + ')';
  oJamMilestone = oJamattr1; 

  

  //jQuery.sap.require("i2d.ps.milestone.confirm.s1.utils.Conversions");
  // var url = i2d.ps.milestone.confirm.s1.utils.Conversions.urlFormatter();

  //str.split("?");  
  // this.mlsts


  return {
   oJamOptions : {
    oShareSettings : {
     sId : "jamshare",
     bDisabled : false,
     oDataServiceUrl : "/sap/opu/odata/sap/SM_INTEGRATION_SRV/", 
     object: {
      sId : "jamshare",

      id : this.oNpart,
      display : oJamObjectHeader,
      share : " "
     }
    },
    oDiscussSettings : {
     sId : "jamdiscuss", 
     bDisabled : false,
     oDataServiceUrl : "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
     object: {
      id: 'Mlt_cnf',
      type: '/sap/opu/odata/sap/PS_MILESTONE_CONFIRM/$metadata',
      name: oJamContext,
      ui_url: this.oNpart
     } 
    }

   },

   sI18NMasterTitle : "DETAIL_TITLE",
   buttonList:[{
    sId: "FooterConf",
    sI18nBtnTxt: i18n.getText('DETAIL_CONFIRM'),
    onBtnPressed: jQuery.proxy(function(event){
     this.Alertconfirm();  
    },this)
   }]

  };


 },
 Usageformat: function(prog, tren, sales, func){
  var oApplicationImplementation = sap.ca.scfld.md.app.Application.getImpl();
  var oI18nModel = oApplicationImplementation.AppI18nModel;

  var indi1= "";
  var indi2="";
  var indi3="";
  var indi4="";
  var arr = [];
  if(prog !== ""){
   indi1 = oI18nModel.getProperty("PROGRESS_ANALYSIS");
   arr.push(indi1);
  } 
  if(tren !== ""){
   indi2 = oI18nModel.getProperty("SALES_DOC");
   arr.push(indi2);
  }
  if(sales !== ""){
   indi3 = oI18nModel.getProperty("TREND_ANALYSIS");
   arr.push(indi3);
  }
  if(func !== ""){
   indi4 = oI18nModel.getProperty("MIL_FUNC");
   arr.push(indi4);
  }
  //var arr = [indi1, indi2, indi3,indi4];
  var objst = '';  
  if(arr.length ==1){
   this.byId("usage").addStyleClass("use");
  }else{
   this.byId("usage").removeStyleClass("use");
  }
  for (var i=0; i<arr.length; i++)      
  { 
   if(arr[i] != '')  
    if(objst == '')
     objst = arr[i];
    else
     objst = objst + "\r\n\r" + arr[i];    
  }
  return "\r\n"+objst;
 }
});

/* eslint-enable sap-no-global-define */