
// $(document).ready(function () {

var food = ["cupcake", "sushi", "taco", "pizza", "dumpling", "cookie", "pie", "croissant", "pineapple", "burrito", "ramen", "cheeseburger", "hot cocoa"];

function displayFoodGifs() {

    var food = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=7KpEm4RDSBZa2Bml3Ym3iOls1K2B4oso&limit=12";

    $.ajax({
        url: queryURL,
        mthod: "GET"
    }).then(function (response) {

        $("#foodGifs").empty();

        for (var i = 0; i < response.data.length; i++) {

            var rating = response.data[i].rating;
            var gifImgStill = response.data[i].images.fixed_width_still.url;
            var gifImgAnimate = response.data[i].images.fixed_width.url;

            var $div = $("<div class='col-12 col-md-3 text-center'>");

            var pRating = $("<p>").text("Rating: " + rating);


            var image = $("<img>");
            image.attr("data-still", gifImgStill)
            image.attr("data-animate", gifImgAnimate);
            image.attr("data-state", "still");
            image.addClass("food gif");
            image.attr("src", gifImgStill);

            $div.append(image, pRating);

            $("#foodGifs").append($div);
        }

    });

}

function renderButtons() {

    // Deleting the foods prior to adding new foods
    $("#foodButtons").empty();

    // Looping through the array of food
    for (var i = 0; i < food.length; i++) {

        // Then dynamicaly generating buttons.
        var foodBtn = $("<button class='btn btn-dark m-1'>");
        // Adding a class of food to our button
        foodBtn.addClass("foodBtn");
        // Adding a data-attribute
        foodBtn.attr("data-name", food[i]);
        // Providing the initial button text
        foodBtn.text(food[i]);
        // Adding the button to the HTML
        $("#foodButtons").append(foodBtn);
    }
}

$("#submitFood").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var newFood = $("#newFood").val().trim();
    // Adding the newFood from the textbox to our array
    food.push(newFood);

    renderButtons();

});


$(document).on("click", ".food", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

    var state = $(this).attr("data-state");

    console.log("Clicked gif");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value

    if (state === "still") {
        console.log(state);
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

$(document).on("click", ".foodBtn", displayFoodGifs);

renderButtons();


// });
