function UI() {

}


UI.prototype.clearInputs = function () {
    for (let i = 0; i < arguments.length; i++) {
        // console.log(arguments[i]);
        arguments[i].value = "";
    }
}
UI.prototype.addFilmToUI = function (film) {
    //console.log(film);

    const filmList = document.getElementById('films');


    filmList.innerHTML +=
        `<tr>
         <td><img src="${film.url}"  class="img-fluid img-thumbnail poster-img"></td>
        <td><label>${film.title}</label></td>
        <td><label>${film.director}</label></td>
        <td><a onclick="degerleriYukariGonder('${film.title}')" href="#" class="btn btn-success">Filmi Güncelle</a></td>
        <td><a href="#" class="btn btn-danger">Filmi Sil</a></td>
        </tr>`;



}

UI.prototype.loadAllFilms = function (films) {
    const filmList = document.getElementById('films');
    films.forEach(function (film) {

      
        filmList.innerHTML +=
            `<tr>
        <td><img id="1"  src="${film.url}" class="img-fluid img-thumbnail poster-img"></td>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td><a onclick="degerleriYukariGonder('${film.title}')" href="#" class="btn btn-success">Filmi Güncelle</a></td>
        <td><a href="#" class="btn btn-danger">Filmi Sil</a></td>
        </tr>`
    });
}

UI.prototype.displayMessage = function (message, type) {
    const cardBody = document.querySelector(".card-body");

    /*
    <div class="alert alert-success" role="alert">
        alert mesajı buraya yazılacak
    </div>
    */

    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    //card body içerisine çocuk element olarak ekliyoruz
    cardBody.appendChild(div);

    //zamanlayıcı kuralım
    setTimeout(function () {
        div.remove();
    }, 3000);

}
UI.prototype.clearAllFilmsFromUI = function () {
    const filmList = document.getElementById('films');
    //1. yöntem
    //filmList.innerHTML = '';

    //2.yöntem
    while (filmList.firstElementChild !== null) {
        filmList.firstElementChild.remove();
    }

}
UI.prototype.deleteFilmFromUI = function (element) {
    element.remove();
}



 