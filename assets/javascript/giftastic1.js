$(document).ready(function() {
	var topics = ["hillary clinton", "donald trump", "barack obama", "bernie sanders", "george w. bush"];


	function createPoliticianButtons() {
		$("#politician-Buttons").empty();
		  for (var i = 0; i < topics.length; i++) {
		  	var gifButton = $("<button>");
		  	    gifButton.addClass("politician");
		  	    gifButton.attr("data-name", topics[i]);
		  	    gifButton.text(topics[i]);

		$("#politician-Buttons").append(gifButton);
	}
  }
	createPoliticianButtons();

$(document).on("click", ".politician", function() {
	var person = $(this).html();

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=55fa83da04e04a38b28a997d9d79f784&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			var results = response.data;

			$("#gifsArea").empty();
		  		for (var j = 0; j < results.length; j++) {
		  		  var gifDiv = $("<div>");
		  		  var gifImage = results[j].images.fixed_height.url;
		  		  var still = results[j].images.fixed_height_still.url;
		  		  var politicianImage = $("<img>").attr("src", still).attr("data-animate", gifImage).attr("data-still", still);
		  		  politicianImage.attr("data-state", "still");
			$("#gifsArea").prepend(politicianImage);
		 	politicianImage.on("click", playsGif);

		 		  var rating = results[j].rating;
		 		  var p = $("<p>").text("Rating: " + rating);
			$("#gifsArea").prepend(p);
			$("#gifsArea").prepend(politicianImage);

		  }

		});

		function playsGif() {
			var state = $(this).attr("data-state");
			    
			if (state == "still") {
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-state", "animate");
			} else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}
		}

	})

	 	$(document).on("click", "#addPolitician", function() {
	 		if ($("#addPolitician-input").val().trim() == "") {
    		  console.log(" ");
	 		} else {
    		var politicians = $("#addPolitician-input").val().trim();
    		topics.push(politicians);
    		$("#addPolitician-input").val("");
    		createPoliticianButtons();
    		return false;
    	}
    });

    });
