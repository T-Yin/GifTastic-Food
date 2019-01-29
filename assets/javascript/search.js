// $(document).ready(function () {

var food = ["cupcake", "sushi", "taco", "pizza", "dumpling", "cookie", "pie", "croissant", "pineapple", "burrito", "ramen", "cheeseburger"];

function displayFoodGifs() {

    var food = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=7KpEm4RDSBZa2Bml3Ym3iOls1K2B4oso&limit=10";

    $.ajax({
        url: queryURL,
        mthod: "GET"
    }).then(function (response) {
        console.log(response);

        $("#foodGifs").empty();

        for (var i = 0; i < response.data.length; i++) {

            var rating = response.data[i].rating;
            var gifImgStill = response.data[i].images.fixed_width_still.url;

            var pRating = $("<p>").text("Rating: " + rating);
            $("#foodGifs").append(pRating);

            var image = $("<img class='food' data-state='still' >");
            image.attr("src", gifImgStill);
            image.attr("data-state", "still");

            $("#foodGifs").append(image);
        }

    });

}

$(".food").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    // var gifImgAnimate = response.data[i].images.fixed_width.url;
    // var gifImgStill = response.data[i].images.fixed_width_still.url;
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        console.log("Still Image");
    //   $(this).attr("src", gifImgAnimate);
    //   $(this).attr("data-state", "animate");
    } else {
    //   $(this).attr("src", gifImgStill);
    //   $(this).attr("data-state", "still");
    }

  });

// Generic function for capturing the food name from the data-attribute
function alertFoodName() {
    var foodName = $(this).attr("data-name");
}

function renderButtons() {

    // Deleting the foods prior to adding new foods
    $("#foodButtons").empty();

    // Looping through the array of food
    for (var i = 0; i < food.length; i++) {

        // Then dynamicaly generating buttons.
        var foodBtn = $("<button class='btn btn-dark m-1'>");
        // Adding a class of food to our button
        foodBtn.addClass("food");
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

$(document).on("click", "button", displayFoodGifs);

renderButtons();


// });