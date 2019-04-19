const form = document.getElementById('myform');
const searchBook = (e) => {
  var div = document.getElementById("result");
  var input = document.getElementById("books");

    e.preventDefault();
    div.textContent = "";
    var search = input.value;

    if (search == "") {
      alert("Wpisz tytuł");
    } else {
     

      $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function(
        response
      ) {
      
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
	  input.value = "";
    }
}


form.addEventListener('submit', searchBook)

