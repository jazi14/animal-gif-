var animalList = ["monkey", "dog","parrot" ,"bear", "horse", "bull"];



// This function handles events when add button is clicked
$("#addingAnimal").on("click", function(event) {
    event.preventDefault();
    // get the user data 
    var animal = $("#addAnimal").val().trim();
    // add new animal in animal arry
    animalList.push(animal);
    deliverButtons();
    });
function deliverButtons() {
        // Delete the content in viewAnimal div before adding new
        $("#viewAnimal").html("<h1></h1>");
        // Loop through the array of animals, 
        for(var i = 0; i < animalList.length; i++ ) {
          var animalBtn= $('<input type="button" value="' + animalList[i] + '"/>');
          animalBtn.addClass("animal");
          animalBtn.attr("data-name", animalList[i])
        $("#viewAnimal").append(animalBtn);
        }

      };

function animalDisplay() {
	$("#gifs").empty();
	var animalName = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lzcGYta9bfMdDiwu3ZImzoJH3rgRatgC&q=" + animalName + "&limit=10&offset=0&&lang=en";
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	for (var i = 0; i < response.data.length - 1; i++) {
    		// save the url to be used later
    		var stillGif = response.data[i].images.fixed_height_still.url;
    		var movingGif = response.data[i].images.fixed_height.url;
    		// Saves the rating into a variable for later
    		var rating = response.data[i].rating;
    		// creates an image tag to put into the HTML
    		var animalPhoto = $("<img>");
    		//Adds the src attribute and url to the image tag, and alt text, and still state
    		animalPhoto.attr("data-state", "still")
    		animalPhoto.attr("data-still", stillGif)
    		animalPhoto.attr("data-animate", movingGif)
        	animalPhoto.attr("src", stillGif);
        	animalPhoto.attr("alt", "animal image");
        	animalPhoto.addClass("gifType");
        	// Puts the GIF on the HTML
        	$("#gifs").prepend(animalPhoto, "rated: " + rating);

        }
    	
    });
};
// Add an on click event to change from still to moving and back
function animate(){
    var condition = $(this).attr("data-state");
        if (condition === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate")                    
        }else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still")
        }
    };
// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", animalDisplay);
// Add on click even to animate gifs
$(document).on("click", ".gifType", animate)
// Starts the website with a few buttons
deliverButtons();