
define([
	'core/BaseView',
	'Session',
	'moment',
	'bootbox',
	'text!templates/datasets/previewUploadedDataTemplate.html',
], function(BaseView, Session, 
		moment, bootbox,
		previewUploadedDataTemplate){ 
	
	var PreviewUploadedDataView = BaseView.extend({
		template:_.template(previewUploadedDataTemplate),
		firstLines:null,
		uploadedFilePath:null,
		dsSlug:null,
		currentDelimiter:",",
		skip:0,

		events : {
			"change input[type=radio][name=cvsformat]" : "delimiterChanged",
			"change input[type=text][name=cvsskiprow]" : "skipRowChanged",
		},
		

		
		initialize: function() {
			console.log('PreviewUploadedDataView.initialize');
			this.firstLines=this.options.firstLines;	
			this.uploadedFilePath= this.options.uploadedFilePath;		
			this.dsSlug=this.options.dsSlug;	
			this.currentDelimiter=this.options.currentDelimiter;
			this.skip=this.options.skip;
		},
		
		
		render: function(){
			console.log('PreviewUploadedDataView.render');
			this.$el.html(this.template({firstLines:this.firstLines, uploadedFilePath: this.uploadedFilePath,dsSlug:this.dsSlug, currentDelimiter:this.currentDelimiter,skip:this.skip}));
			
			return this;
		},
		
		delimiterChanged: function(e){
			var curDelimiter=e.target.value;		
			console.log("curDelimiter", curDelimiter);
//previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter'
				var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug+"/delimiter/"+curDelimiter+"/skip/"+this.skip;		
				Backbone.history.navigate(route, { trigger : true });
			return this;
		},		

		skipRowChanged: function(e){
			var curSkipRow=e.target.value;		
			console.log("curSkipRow", curDelimiter);
			this.skip=curSkipRow;
//previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter'
				var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug+"/delimiter/"+this.currentDelimiter+"/skip/"+this.skip;		
				Backbone.history.navigate(route, { trigger : true });
			return this;
		},		
		
	});

	return PreviewUploadedDataView;
});
