'use strict';

var USER_PICTURE_PATH = 'img/avatars/user0';
var USER_PICTURE_EXT = '.png';

var RANDOM_OFFERS_OBJECT_COUNT = 8;

var OFFERS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
];

var OFFERS_TYPES = ['flat', 'house', 'palace', 'bungalo'
];

var OFFERS_TIMES = ['12:00', '13:00', '14:00'
];

var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
];

var OFFERS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OffersTypes = {flat: 'Квартира', house: 'Дом', palace: 'Дворец', bungalo: 'Бунгало',}

var getRandomNumber = function (min, max) { return Math.floor((max - min + 1) * Math.random()) + min;
}

var getRandomArray = function (array) { var result = array.sort(function () {return 0.5 - Math.random();}); return result.slice(0, getRandomNumber(1, array.length));
}

var generateRandomOffers = function (count) { var features = OFFERS_FEATURES.slice(); var photos = OFFERS_PHOTOS.slice(); var result = [];

 for (var i = 0; i < count; i++) {
var newOffer = {};

newOffer.author = {};
newOffer.author.avatar = USER_PICTURE_PATH + (i + 1) + USER_PICTURE_EXT;

newOffer.offer = {};
        newOffer.offer.title = OFFERS_TITLES[getRandomNumber(0, OFFERS_TITLES.length - 1)];

newOffer.location = {};
newOffer.location.x = getRandomNumber(300, 900);
newOffer.location.y = getRandomNumber(150, 500);

newOffer.offer.address = newOffer.location.x + ',' + newOffer.location.y;

newOffer.offer.price = getRandomNumber(1000, 1000000);
newOffer.offer.type = OFFERS_TYPES[getRandomNumber(0, 3)];
newOffer.offer.rooms = getRandomNumber(1, 5);
newOffer.offer.guests = getRandomNumber(1, 30);
newOffer.offer.checkin = OFFERS_TIMES[getRandomNumber(0, 2)];
newOffer.offer.checkout = OFFERS_TIMES[getRandomNumber(0, 2)];

newOffer.offer.description = '';

newOffer.offer.photos = getRandomArray(photos);
newOffer.offer.features = getRandomArray(features);

result.push(newOffer);

};

return result;
}

var allOffers = generateRandomOffers(RANDOM_OFFERS_OBJECT_COUNT);

console.log(allOffers);

var similarListElement = document.querySelector('.map__pin');
var similarListObjects = document.querySelector('.map__card');

for (var i = 0; i < 8; i++) {
var NewPinElement = similarListObjects.cloneNode(true);
 NewPinElement.querySelector('.popup__title').textContent = newOffer.title;
 NewPinElement.querySelector('.popup__text--address').textContent = newOffer.offer.address;
 NewPinElement.querySelector('.popup__text--price').textContent = offer.price + 'р/ночь';
 NewPinElement.querySelector('.popup__type').textContent =  newOffer.offer.type;
 NewPinElement.querySelector('.popup__text--capacity').textContent =  newOffer.offer.rooms + 'комнаты для' + newOffer.offer.guests + 'гостей'; 
NewPinElement.querySelector('.popup__text--time').textContent = 'Заезд после' + newOffer.offer.checkin + ', выезд до' +  newOffer.offer.checkout;
NewPinElement.querySelector('.popup__features').textContent =  newOffer.offer.features;
NewPinElement.querySelector('.popup__description').textContent = newOffer.offer.description;
NewPinElement.querySelector('.popup__photos').textContent = offer.photos;

similarListElement.appendChild(NewPinElement);
}


/* function randomInteger(min,max) {
    var rand = min - 0.5+ Math.random()*(max-min+1)
    rand = Math.round(rand);
    return rand;
}

function Getrandom() {
  return Math.random();
}
var arr = ['wifi','dishwasher','parking','washer','elevator','conditioner'];
var keks = [
    {
        'author': {
               'avatar': 'img/avatars/user{{xx}}.png',
    },
    'offer':{
        'title':'Большая уютная квартира Маленькая неуютная квартира Огромный прекрасный дворец Маленький ужасный дворец Красивый гостевой домик Некрасивый негостеприимный домик Уютное бунгало далеко от моря Неуютное бунгало по колено в воде',
        'adress':'{{location.x}}, {{location.y}}',
        'price':randomInteger(1000,1000000),
        'type':'palace flat house bungalo',
        'rooms':randomInteger(1,5),
        'guests':Getrandom(),
        'checkin':'12:00 13:00 14:00',
        'checkout':'12:00 13:00 14:00',
        'features':Math.floor(Math.random()*arr.length),
        'description':'',
        'photos':['http://o0.github.io/assets/images/tokyo/hotel1.jpg','http://o0.github.io/assets/images/tokyo/hotel2.jpg','http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
     'location': {
         'x':randomInteger(300,900),
         'y':randomInteger(150,500)
   }
 }

];

var userDialog = document.querySelector('.map__card');
userDialog.classList.remove('popup');
*/


