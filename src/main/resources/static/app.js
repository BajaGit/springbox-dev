(function(){
	const app = angular.module("springbox", []);
	
	app.service("ApiClient", function($http){
		return {
			encrypt: (val, pw) => $http.get("/jasypt/encrypt?text=" + val + "&password=" + pw),
			decrypt: (val, pw) => $http.get("/jasypt/decrypt?text=" + val + "&password=" + pw)
		}
	});
	
	app.controller("MainController", function(ApiClient){
		const self = this;
		
		self.password = null;
		
		self.valToEncrypt = null;
		self.valEncrypted = null;
		
		self.encError = null;
		
		self.valToDecrypt = null;
		self.valDecrypted = null;
		
		self.encrypt = () => {
			self.encError = null;
			
			if ( self.password == null){
				self.encError = "Please provide a Password!";
			}
			if ( self.valToEncrypt == null || self.valToEncrypt === ""){
				self.encError = "Please provide a value to encrypt!";
			}
			
			if ( self.encError != null) return;
			
			ApiClient.encrypt(self.valToEncrypt, self.password)
			  .then( res => self.valEncrypted = res.data,
					 err => self.encError = err.data.message);
		}
		
		self.decrypt = () => {			
			ApiClient.decrypt(self.valToDecrypt, self.password)
			.then( res => self.valDecrypted = res.data);
		}
		
		
		return this;
	});
	
	
})()