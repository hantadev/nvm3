$(document).on("click", ".btn", function() {
  $("#ergebnisse").html("");
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 5,
    api_key: "ZQyjffRaBG60GxoZHKRYhZlx89TZGqZJ",
    fmt: "json"
  };

  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  } else if ($("#suchfeld").val() !== "") {
    query = $("#suchfeld").val();
  }
  params.q = query;

  //var giphys

  if ($(this).hasClass("Favoriten")) {
    queryURL = "https://api.giphy.com/v1/gifs/trending?";
    delete params.q;
  }
  
  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function(r) {
      for (i = 0; i < params.limit; i++) {
        var $img = $("<img>");
        var $div = $("<div>");
        //var $star = $("<img>");
        //var $copy = $("<img>");
        var gifObj = r.data[i];
        var gif = gifObj.images;

        // Image builder object
        $img.attr({
          // "width": "200px",
          src: gif.fixed_height_still.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height_still.url,
          "data-state": "still",
          class: "gif"
        });
       /* $star.attr({
          // "width": "200px",
          src: star.url,

          "data-state": "still",
          class: "png"
        });*/
        //$div.attr("id", "gif-" + i);
        $div.addClass("gif-box");
        //$rating.text("Rating: " + gifObj.rating);
        $div.append($img/*, $star, $copy*/);
        $("#ergebnisse").append($div);
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");

          
    /*  $(".star").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");

          
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
*/
  //Stern + Bild als Box)
        }
      });
    }
  });
});