var data = new Firebase("https://vivid-fire-368.firebaseio.com/");

function saveFunction(){
	var newImage = document.getElementById('previewing').src;
	console.log(newImage);

	var pic = document.getElementById('file').value;
	var stories = document.getElementById('story').value;
	var dates = document.getElementById('date').value;
		data.push({
			'username': { 
					'Sarah':{
						'photo':{
							'file':{
								'pic': newImage,
								'description': stories,
								'date': dates
							}
						}	
					}
				}				
			})
}
function display(loadedPics){
	console.log(loadedPics);
	document.getElementById('libraryImages').innerHTML += '<img src= ' + loadedPics['pic'] + '></img>';
	document.getElementById('libraryImages').innerHTML += '<figcaption>' + loadedPics['description'] + " " + loadedPics['date'] + '</figcaption>';
	/*document.getElementById('libraryImages').innerHTML += '<figcaption>'  + '</figcaption>';*/
}


function loadPics(){
	data.on("value", function(snapshot) {
	  console.log(snapshot.val());
	 
	for (var key in snapshot.val()){
		display(snapshot.val()[key]['username']['Sarah']['photo']['file']);
	} 
	},

	
	function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});	
	/*data.child('photo').display;
	console.log('yay it worked');*/
}


// Generate a reference to a new location and add some data using push()
