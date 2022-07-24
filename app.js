const form = document.getElementById('film-form');
const titleElement = document.querySelector('#title');
const urlElement = document.querySelector('#url');
const directorElement = document.querySelector('#director');
const cardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films');

//UI objectten bir instance (örnek) oluşturduk
const ui = new UI();
//Storage objectten bir instance (örnek) oluşturduk
const storage = new Storage();

eventListener();
function eventListener() {
    //Formun submit olayı için event listener ekledik
    form.addEventListener('submit', addFilm);
    document.addEventListener('DOMContentLoaded', function () {
        //storageden filmleri yükle
        let films = storage.getFilmsFromStorage();
        //UI da tüm filmleri göster
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener('click', deleteFilm);
    clear.addEventListener('click', clearAllFilms);
    
 }




function addFilm(e) {
    e.preventDefault();

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    const id="1";
    if (title === "" || url === "" || director === "") {
        //hata mesajı göster
        ui.displayMessage('Tüm alanları doldurduğunuzdan emin olun!', "danger");
    } else {
        //yeni bir film oluştur
        const newFilm = new Film(title, director, url,id);
        //Yeni filmi arayüze ekle
        ui.addFilmToUI(newFilm);
         //Yeni filmi storage ekle
        storage.addFilmToStorage(newFilm);
        //mesaj göster
        ui.displayMessage('Film başarı ile eklendi!', "success");


    }
    //inputları temizle
    ui.clearInputs(titleElement, directorElement, urlElement);
}
function deleteFilm(e) {
    e.preventDefault();
    //console.log('tıklandı --> ' + e.target);
    if (e.target.className === 'btn btn-danger') {
        // console.log("Filmi sil butonuna tıkladın");
        // console.log(e.target.parentElement.parentElement);
        //UI da filmi sil
        ui.deleteFilmFromUI(e.target.parentElement.parentElement);
         storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    }
}
function clearAllFilms(e) {
    e.preventDefault();
    if (confirm('Emin misiniz?')) {
        //ui dan temizle
        ui.clearAllFilmsFromUI();
        //storageden temizle
        storage.clearAllFilmsFromStorage();
    }
}


 
function updateFilm(title) {
    
    var index = storage.getFilmIndex(title);
    var films  =storage.getFilmsFromStorage();
    var film =new Film(titleElement.value,directorElement.value,urlElement.value);
    films[index] = film;
    storage.setFilms(films);
    document.getElementById('films').innerHTML="";
    ui.loadAllFilms(films);
    alert("Film güncellendi"); 
    ui.clearInputs(titleElement, directorElement, urlElement);
    document.getElementById("btnGuncelle").className="btn btn-success d-none";
    document.getElementById("btnEkle").className="btn btn-danger";
}
function degerleriYukariGonder(title) {
    var data = storage.getFilmFromStorage(title);
    titleElement.value=data.title;
    directorElement.value=data.director;
    urlElement.value=data.url;
    document.getElementById("btnEkle").className="btn btn-danger d-none";
    document.getElementById("btnGuncelle").className="btn btn-success";
    document.getElementById("btnGuncelle").setAttribute("onclick","updateFilm('" + data.title + "');");
}
