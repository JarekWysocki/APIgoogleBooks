$(document).ready(function() {
  var div = document.getElementById("result");
  var input = document.getElementById("books");
  $("#myform").submit(function(e) {
    e.preventDefault();
    div.textContent = "";
    var search = $("#books").val();

    if (search == "") {
      alert("Wpisz tytuł");
    } else {
      var url = "";
      var img = "";
      var title = "";
      var author = "";

      $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function(
        response
      ) {
        console.log(response.items);
        for (var i = 0; i < response.items.length; i++) {
          var divsecond = document.createElement("div");
          if (i > 0) {
            divsecond.className = "hideme";
          }

          div.appendChild(divsecond);
          var h2 = document.createElement("h2");
          h2.textContent = response.items[i].volumeInfo.title;
          divsecond.appendChild(h2);

          var h3 = document.createElement("h3");
          h3.textContent = response.items[i].volumeInfo.authors;
          divsecond.appendChild(h3);

          var p = document.createElement("p");
          var desc = response.items[i].volumeInfo.description;

          if (desc == undefined) {
            p.textContent = desc;
            divsecond.appendChild(p);
          } else {
            var newdesc = desc.match(/[^\.!\?]+[\.!\?]+/g);
            var tab = newdesc.slice(0, 4); //ustawiam opis do maksymalnie 4 zdań
            for (x = 0; x < tab.length; x++) {
              p.textContent += tab[x];
              divsecond.appendChild(p);
            }
          }

          var img = document.createElement("img");
          if (response.items[i].volumeInfo.imageLinks == undefined) {
            img.src = "";
          } else {
            img.src = response.items[i].volumeInfo.imageLinks.thumbnail;
            divsecond.appendChild(img);
          }
        }
      });
    }
    input.value = "";
  });
});
