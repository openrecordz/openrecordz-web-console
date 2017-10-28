/**
 * Classe utilizzata per .....
 * Esempio di utilizzo: ....
 */

define([
	'core/BaseView',
	'Session',
	'moment',
	'bootbox',
	'text!templates/datasets/mappingFieldTemplate.html',
], function(BaseView, Session, 
		moment, bootbox,
		mappingFieldTemplate){ 
	
	var MappingFieldView = BaseView.extend({
		template:_.template(mappingFieldTemplate),
		headers:null,
		uploadedFilePath:null,
		dsSlug:null,
		currentDelimiter:",",
		dataset:null,
		mappedHeaders:[],
		skip:0,

		events : {
			"change select" : "typeFieldChanged",
		},
		

		
		initialize: function() {
			console.log('MappingFieldView.initialize');
			this.headers=this.options.headers;	
			this.uploadedFilePath= this.options.uploadedFilePath;	
			this.dsSlug=this.options.dsSlug;		
			this.currentDelimiter=this.options.currentDelimiter;
			this.skip=this.options.skip;

			this.dataset=this.options.dataset;

			this.mappedHeaders=[];
			var mappedHeader=null;
			for (var head in this.headers) {

				mappedHeader={};
				mappedHeader.origColumnName=head;

				var tryFindMappingInDataset=this.findMappingInDataset(head);
				if (tryFindMappingInDataset) {
						mappedHeader.columnType=tryFindMappingInDataset.columnType;
						mappedHeader.columnName=tryFindMappingInDataset.columnName;
				}else {
					mappedHeader.columnType="gen";
					mappedHeader.columnName=head.replace(/\./g,"").replace(/\./g,"").replace(/\,/g,"").replace(/\$/g,"").trim();
				}
				this.mappedHeaders.push(mappedHeader);
				_g_mappedHeaders=this.mappedHeaders;
			}
		},
		
		findMappingInDataset : function(origColumnName) {
			if (this.dataset && this.dataset._mapping) {
				for (var i=0;i<this.dataset._mapping.length;i++){
					//console.log("this.dataset._mapping[i].origColumnName : " + this.dataset._mapping[i].origColumnName);
					if (this.dataset._mapping[i].origColumnName==origColumnName){						
						return this.dataset._mapping[i];
					}
				}
			}else {
				return null;
			}
		},
		
		render: function(){
			console.log('MappingFieldView.render');
//			console.log('===========================================');
			console.log("this.headers",this.headers);
//			console.log('===========================================');
			this.$el.html(this.template({myheaders:this.headers, mappedHeaders:this.mappedHeaders, dataset: this.dataset,uploadedFilePath: this.uploadedFilePath, dsSlug:this.dsSlug, currentDelimiter: this.currentDelimiter, skip:this.skip}));

			// var view = this;
			
			// //Definizione della callback da eseguire al termine del download dei dataset.
			// var callback = function(rows){
			// 	view.rowsTaken(rows);
			// };
			
			// //Recupero della lista dei dataset.
			// var data = new Data();
			// data.search('{"_type":"testslug"}',callback);
			
			return this;
		},
		typeFieldChanged: function(e) {
			console.log('MappingFieldView.typeFieldChanged');

			 var selectId=e.target.id;
		   	console.log("select changed: "+selectId);
			var currentSelect = $("#"+selectId);
//			andrea=currentSelect;

			 if (currentSelect.val()=="_location" 
				|| currentSelect.val()=="_latitude" 
				|| currentSelect.val()=="_longitude"
				|| currentSelect.val()=="_title" 
				|| currentSelect.val()=="_description" 
				|| currentSelect.val()=="_email"
				|| currentSelect.val()=="_phone"
				|| currentSelect.val()=="_website"  
				|| currentSelect.val()=="_main_image"
				|| currentSelect.val()=="_idext"   
				|| currentSelect.val()=="_skipcolumn") {

//			  if (currentSelect.val()=="_location") {
					//se value di  select corrente è _location trovo l'input text di nome della colonna è lo setto a _location
		  		console.log("select con option value _location: "+currentSelect.parent().parent().find("input.renameValueClass").attr("id"));
				var columnNameForce=currentSelect.parent().parent().find("input.renameValueClass");
	//					se _location allora setto il nome della colonna a _location etc..
				columnNameForce.val(currentSelect.val());
				columnNameForce.attr("readonly","readonly");
//			   }
				
				//trovo tutte le altre select che hanno il valore loc è le resetto a generic
				 if (currentSelect.val()=="_location" 
					|| currentSelect.val()=="_latitude" 
					|| currentSelect.val()=="_longitude"
					|| currentSelect.val()=="_title" 
					|| currentSelect.val()=="_description" 
					|| currentSelect.val()=="_email"
					|| currentSelect.val()=="_phone"
					|| currentSelect.val()=="_website"  
					|| currentSelect.val()=="_main_image"
					|| currentSelect.val()=="_idext"   
					) {
					    $( "select.mappingselect option:selected" ).each(function() {
						testthis=$(this);
		     			        //console.log("testthis: "+testthis.parent().attr("id"));
					      if ( $(this).parent().attr("id")!=currentSelect.attr("id") && $(this).val()==currentSelect.val()) {
							//alert("trovato");
							_testthisSelectFound=$(this);
							console.log("found duplicate with id: " +$(this).parent().attr("id"));
							$(this).removeAttr("selected");
							var columnNameForce=$(this).parent().parent().parent().find("input.renameValueClass");
							console.log("remove readonly form input with id: "+columnNameForce.attr("id"));
							columnNameForce.removeAttr("readonly");
							//riprendo il valore della colonna dalla colonna originaria
							columnNameForce.val($(this).parent().parent().parent().find("input.origcolumnnameClass").val().replace(/ /g, ''));
					
						}
					    });
				}

		   	}else if (currentSelect.val()=="gen"){
				var columnNameForce=currentSelect.parent().parent().find("input.renameValueClass");
				columnNameForce.removeAttr("readonly");
				columnNameForce.val(currentSelect.parent().parent().find("input.origcolumnnameClass").val().replace(/ /g, ''));
			 }else {
				alert("error");
			}

			return this;
		}

		
	
	});

	return MappingFieldView;
});
