// HTML elementlerini seçiyoruz
const container = document.querySelector('.container'); // Koltukların bulunduğu ana kapsayıcı
const count = document.getElementById('count'); // Seçilen koltuk sayısını gösterecek alan
const amount = document.getElementById('amount'); // Toplam ücreti gösterecek alan
const select = document.getElementById('movie'); // Film seçme dropdown'u
const seats = document.querySelectorAll('.seat:not(.reserved)'); // Rezerve edilmemiş tüm koltuklar

// localStorage'dan veri alarak sayfayı başlatıyoruz
getFromLocalStorage();
calculateTotal(); // Toplam ücret ve seçilen koltuk sayısını güncelle

// Koltuğa tıklama olayı
container.addEventListener('click', function(e) {
    // Eğer tıklanan eleman koltuksa ve rezerve değilse
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected'); // Koltuk seçili ise seçimi kaldır, seçili değilse seç
        calculateTotal(); // Toplam sayıyı ve ücreti güncelle
    }
});

// Film değiştirildiğinde toplam ücreti yeniden hesaplama
select.addEventListener('change', function(e) {
    calculateTotal(); // Film fiyatına göre toplam ücreti yeniden hesapla
});

// Seçilen koltukları ve toplam ücreti hesaplayan fonksiyon
function calculateTotal () {
    const selectedSeats = container.querySelectorAll('.seat.selected'); // Seçili koltukları bul

    // Seçilen koltuklar ve tüm koltukları dizilere dönüştürüyoruz
    const selectedSeatsArr = [];
    const seatsArr = [];

    // Seçili koltukları diziye ekle
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });

    // Tüm koltukları diziye ekle
    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });

    // Seçili koltukların dizinlerini alıyoruz
    let selectedSeatIndexes = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat); // Her koltuğun index'ini bul
    });

    // Seçili koltuk sayısı ve toplam ücret
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount; // Seçili koltuk sayısını göster
    amount.innerText = selectedSeatCount * select.value; // Toplam ücreti hesapla ve göster

    // Seçili koltukları localStorage'a kaydediyoruz
    saveLocalStorage(selectedSeatIndexes);
}

// localStorage'dan verileri alıp sayfayı güncelleyen fonksiyon
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // Seçilen koltukların indekslerini al
    
    if (selectedSeats != null && selectedSeats.length > 0) { // Eğer seçili koltuk varsa
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) { // Eğer koltuk, seçilenler arasında varsa
                seat.classList.add('selected'); // Koltuğu seçili yap
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); // Seçili film indeksini al

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex; // Film seçimini güncelle
    }
}

// Seçilen koltuk ve film verilerini localStorage'a kaydeden fonksiyon
function saveLocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes)); // Seçili koltuk indekslerini kaydet
    localStorage.setItem('selectedMovieIndex', select.selectedIndex); // Seçili film indeksini kaydet
}
