var settings = [
				{
					label: 'Generali',
					properties: [
					             {
					            	 code: 'tenants.settings.<TENANT>.displayname',
					            	 label: 'Nome dell\'applicazione. Alias del tenant.', 
					            	 placeholder: '', 
					            	 typecontrol: 'text'
								 },
								 
						{
							code: 'tenants.settings.<TENANT>.tenant_image',
							label: 'Immagine del tenant. (dimensione consigliata 190 x 50 px)',
							placeholder: '',
							typecontrol: 'image'
						},
					             ]
				},
               {
            	   label: 'Email - generali',
            	   properties: [
            	                {
            	                	code: 'tenants.settings.<TENANT>.send.email.from',  
            	                	label: 'Indirizzo email mittente. Se non specificato: noreply@openrecordz.it', 
            	                	placeholder: 'noreply@openrecordz.it', 
            	                	typecontrol: 'text'
            	                },
            	                {
            	                	code: 'tenants.settings.<TENANT>.send.email.bcc', 
            	                	label: 'Indirizzi email in copia conoscenza nascosta, anche più di uno separati da virgola. Es: paolo.rossi@azienda.it, luca.bianchi@azienda.it', 
            	                	placeholder: '', 
            	                	typecontrol: 'text'
            	                },
            	                {
            	                	code: 'tenants.settings.<TENANT>.send.email.to', 
            	                	label: 'Indirizzo email destinatario (per amministratore)', 
            	                	placeholder: '', 
            	                	typecontrol: 'text'
            	                },
            	                ]
               },
               {
            	   label: 'Email - registrazione utente',
            	   properties: [
            	                {
            	                	code: 'tenants.settings.<TENANT>.registration.send.email.welcome', 
            	                	label: 'Messaggio di benvenuto', 
            	                	placeholder: '', 
            	                	typecontrol: 'textarea'
            	                },
				{
                                        code: 'tenants.settings.<TENANT>.registration.send.email',
                                        label: 'Invia email in seguito alla registrazione utente',
                                        placeholder: 'true o false',
                                        typecontrol: 'text'
                                },



            	                {
            	                	code: 'tenants.settings.<TENANT>.registration.send.email.subject', 
            	                	label: 'Oggetto della mail. Se non specificato: Benvenuto', 
            	                	placeholder: 'Benvenuto', 
            	                	typecontrol: 'text'
            	                },
            	                ]
               },
               {
            	   label: 'Email - aggiunta di un contenuto',
            	   properties: [
            	                {
            	                	code: 'tenants.settings.<TENANT>.product.added.send.email.subject', 
            	                	label: 'Oggetto della mail. Se non specificato: Complimenti!', 
            	                	placeholder: 'Complimenti!', 
            	                	typecontrol: 'text'
            	                },
            	                ]
               },
            //    {
            // 	   label: 'Email - segnalazione',
            // 	   properties: [
            // 	                {
            // 	                	code: 'tenants.settings.<TENANT>.report.send.email.to', 
            // 	                	label: 'Indirizzo email destinatario delle segnalazioni. Se non impostato verrà usato to delle impostazioni generali', 
            // 	                	placeholder: '', 
            // 	                	typecontrol: 'text'
            // 	                },
            // 	                {
            // 	                	code: 'tenants.settings.<TENANT>.report.send.email.subject', 
            // 	                	label: 'Oggetto della mail. Se non specificato: Nuova Segnalazione', 
            // 	                	placeholder: 'Nuova Segnalazione', 
            // 	                	typecontrol: 'text'
            // 	                },
            // 	                ]
            //    },
               {
            	   label: 'Email - modelli personalizzati',
            	   properties: [
            	                {
            	                	code: 'tenants.settings.<TENANT>.registration.send.email.template', 
            	                	label: 'Modello per l\'invio delle email di registrazione', 
            	                	placeholder: '', 
            	                	typecontrol: 'textarea',
            	                	tooltip: 'Ti diamo il benvenuto, ${model.person.username}\\r\\n<br>Sei su ${info.tenantDisplayName}\\r\\n\\r\\n<br>$!{model.tenant-email-welcome}\\r\\n\\r\\n<br>Clicca qui per validare il tuo account: ${info.tenantUrl}/urls/${model.validationEmail}/f\\r\\n\\r\\n<br>Siamo felici di averti qui!'
            	                },
            	                {
            	                	code: 'tenants.settings.<TENANT>.product_created.send.email.template', 
            	                	label: 'Modello per l\'invio delle email di nuovo contenuto', 
            	                	placeholder: '', 
            	                	typecontrol: 'textarea',
            	                	tooltip: 'Ciao ${model.person.fullName}!!!\\r\\n<br>hai appena aggiunto un nuovo oggetto su ${info.tenantDisplayName}.\\r\\n\\r\\n<br>Clicca sul link per vedere il dettaglio ${info.tenantUrl}/contents/${model.product.id}\\r\\n\\r\\n<br>Buona continuazione\\r\\n\\r\\n<br>Il team di ${info.tenantDisplayName}'
            	                },
            	                // {
            	                // 	code: 'tenants.settings.<TENANT>.abuse.send.email.template', 
            	                // 	label: 'Modello per l\'invio delle email di segnalazione', 
            	                // 	placeholder: '', 
            	                // 	typecontrol: 'textarea',
            	                // 	tooltip: 'Nuovo report registrato per la app ${info.tenantDisplayName}\\r\\n<br>tipo: ${model.objectType}\\r\\n<br>#if( $model.product )\\r\\n<br>Relativamente al prodotto seguente:\\r\\n<br>${info.tenantUrl}/products/${model.product.id}\\r\\n<br>#end\\r\\n<br>#if( $model.reporterUsername )\\r\\n<br>Dall\'utente: ${model.reporterUsername}\\r\\n<br>#end\\r\\n<br>testo:\\r\\n<br>${model.text}\\r\\n'
            	                // },
            	                ]
               },
               ];

var config = {
//	hostname: 'frontiere21.it',
//	hostname: 'ciaotrip.it',
//	poiId: '231167d29dbf65a8183b31540ab6ab9cca481323' //Eurofood
//	poiId: '50bf69bce4b025c2a1b62000',
	
	datasetsPageSize: 10,		//Dimensione della pagina per la lista dei dataset.
	
	contentsListPageSize: 30, 	//Dimensione della pagina per la lista dei contenuti.
	usersListPageSize: 30, 		//Dimensione della pagina per la lista degli utenti.
	poisListPageSize: 10, 		//Dimensione della pagina per la lista dei poi.
	contentsListRangePage: 10,	//Numero di pagine massime da visualizzare (nel controllo paginazione).
	usersListRangePage: 10,		//Numero di pagine massime da visualizzare (nel controllo paginazione).
	poisListRangePage: 10,		//Numero di pagine massime da visualizzare (nel controllo paginazione).
	position: {lat: 40.353244, lon:18.179101},	//Default position (Lecce).
	logoTenant: 'logo_openrecordz_menu_25.png',	//Logo del tenant.
//	relativeScore: 10,			//Relative score da utilizzare nello spostamento UP/DOWN di un contenuto nella lista.
//	tabMore: {label: 'Altro', url: 'http://blog.ciaotrip.it/bpp/consoletabmore/'}, //per la visualizzazione di un Tab agganciato ad una pagina web esistente.
	settings: settings,
};


//var service = {
//	datasetList:	'/service/v1/cdata/_datasets',
//	datasetDetail:	'',
//};

//http://snook.ca/archives/javascript/javascript_pass
//When passing in a primitive type variable like a string or a number, the value is passed in by value. 
//Passing in an object, however, passes it in by reference.

//=================================================================
//EDIT di un Contenuto.
//Funzione eseguita PRIMA del salvataggio.
function _contentEditView_beforeSave(content){
	console.log('_contentEditView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _contentEditView_afterRender(view){
	console.log('_contentEditView_afterRender');
}

//=================================================================
//ADD di un Contenuto.
//Funzione eseguita PRIMA del salvataggio.
function _contentAddView_beforeSave(content){
	console.log('_contentAddView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _contentAddView_afterRender(view){
	console.log('_contentAddView_afterRender');
}


//=================================================================
//EDIT di un Utente.
//Funzione eseguita PRIMA del salvataggio.
function _userEditView_beforeSave(user){
	console.log('_userEditView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _userEditView_afterRender(view){
	console.log('_userEditView_afterRender');
}




//=================================================================
//ADD di una Categoria.
//Funzione eseguita PRIMA del salvataggio.
function _categoryAddView_beforeSave(category){
	console.log('_categoryAddView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _categoryAddView_afterRender(view){
	console.log('_categoryAddView_afterRender');
}


//=================================================================
//EDIT di una Categoria.
//Funzione eseguita PRIMA del salvataggio.
function _categoryEditView_beforeSave(category){
	console.log('_categoryEditView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _categoryEditView_afterRender(view){
	console.log('_categoryEditView_afterRender');
}



//=================================================================
//EDIT di un Punto di interesse.
//Funzione eseguita PRIMA del salvataggio.
function _poiEditView_beforeSave(poi){
	console.log('_poiEditView_beforeSave');
}

//Funzione eseguita DOPO il render della vista.
function _poiEditView_afterRender(view){
	console.log('_poiEditView_afterRender');
}
