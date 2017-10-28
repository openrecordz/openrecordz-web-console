
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
		
		events : {
			"change input[type=radio][name=cvsformat]" : "delimiterChanged",
		},
		

		
		initialize: function() {
			console.log('PreviewUploadedDataView.initialize');
			this.firstLines=this.options.firstLines;	
			this.uploadedFilePath= this.options.uploadedFilePath;		
			this.dsSlug=this.options.dsSlug;	
			this.currentDelimiter=this.options.currentDelimiter;
		},
		
		
		render: function(){
			console.log('PreviewUploadedDataView.render');
			this.$el.html(this.template({firstLines:this.firstLines, uploadedFilePath: this.uploadedFilePath,dsSlug:this.dsSlug, currentDelimiter:this.currentDelimiter}));
			
			return this;
		},
		
		delimiterChanged: function(e){
			var curDelimiter=e.target.value;		
			console.log("curDelimiter", curDelimiter);
//previewUploadedData/:uploadedFilePath/ds/:dsSlug/delimiter/:delimiter'
				var route = '#previewUploadedData/'+this.uploadedFilePath+"/ds/"+this.dsSlug+"/delimiter/"+curDelimiter;		
				Backbone.history.navigate(route, { trigger : true });
			return this;
		},		
		
	});

	return PreviewUploadedDataView;
});
