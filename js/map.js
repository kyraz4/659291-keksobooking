'use strict';
var USER_PICTURE_PATH = 'img/avatars/user0';
var USER_PICTURE_EXT = '.png';

var OFFERS_TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFERS_TYPES = ['flat', 'house', 'palace', 'bungalo'];

var OFFERS_TIMES = ['12:00', '13:00', '14:00'];

var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFERS_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OffersTypes = {flat: 'Квартира', house: 'Дом', palace: 'Дворец', bungalo: 'Бунгало'};

var getRandomNumber = function (min, max) {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

var getRandomArray = function (array) {
  var result = array.sort(function () {
    return 0.5 - Math.random();
  }); return result.slice(0, getRandomNumber(1, array.length));
};

var generateRandomOffers = function (count) {
  var features = OFFERS_FEATURES.slice();
  var photos = OFFERS_PHOTOS.slice();
  var result = [];

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


  }

  return result;
  // var similarListElement = document.querySelector('.map__pin');
  // var mapTemplate = document.querySelector('template');

  // for (var j = 0; j < count; j++) {
  //   var newPinElement = similarListObjects.cloneNode(true);
  //   newPinElement.querySelector('.popup__title').textContent = newOffer.title;
  //   newPinElement.querySelector('.popup__text--address').textContent = newOffer.offer.address;
  //   newPinElement.querySelector('.popup__text--price').textContent = newOffer.offer.price + 'р/ночь';
  //   newPinElement.querySelector('.popup__type').textContent = OffersTypes[getRandomNumber(0, 3)];
  //   newPinElement.querySelector('.popup__text--capacity').textContent = newOffer.offer.rooms +
  //    'комнаты для' + newOffer.offer.guests + 'гостей';
  //   newPinElement.querySelector('.popup__text--time').textContent = 'Заезд после' +
  //    newOffer.offer.checkin + ', выезд до' + newOffer.offer.checkout;
  //   newPinElement.querySelector('.popup__features').textContent = newOffer.offer.features;
  //   newPinElement.querySelector('.popup__description').textContent = newOffer.offer.description;
  //   newPinElement.querySelector('.popup__photos').textContent = newOffer.offer.photos;
  //   similarListElement.appendChild(newPinElement);
  // }

  // return result;
};

var mapTemplate = document.querySelector('template').content;
var map = document.querySelector('.map');

var createPin = function (offerObject) {
  var pinElementTemplate = mapTemplate.querySelector('.map__pin').cloneNode(true);

  pinElementTemplate.style.left = offerObject.location.x + 24 + 'px';
  pinElementTemplate.style.top = offerObject.location.y + 24 + 'px';

  pinElementTemplate.querySelector('img').src = offerObject.author.avatar;
  pinElementTemplate.classList.add('visually-hidden');
  pinElementTemplate.classList.add('icon-open');
  return pinElementTemplate;

};

var createCard = function (offerObject) {
  var cardElementTemplate = mapTemplate.querySelector('.map__card').cloneNode(true);

  cardElementTemplate.querySelector('.popup__title').textContent = offerObject.offer.title;
  cardElementTemplate.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  cardElementTemplate.querySelector('.popup__text--price').textContent = offerObject.offer.price + ' р/ночь';
  cardElementTemplate.querySelector('.popup__type').textContent = OffersTypes[offerObject.offer.type];
  cardElementTemplate.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms +
     ' комнаты для ' + offerObject.offer.guests + ' гостей';
  cardElementTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' +
  offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  cardElementTemplate.querySelector('.popup__features').textContent = offerObject.offer.features;
  cardElementTemplate.querySelector('.popup__description').textContent = offerObject.offer.description;
  cardElementTemplate.querySelector('.popup__photos img').src = offerObject.offer.photos;
  // cardElementTemplate.classList.add('visually-hidden');
  return cardElementTemplate;
};

var renderPins = function (offersArray) {
  var documentFragment = document.createDocumentFragment();

  offersArray.forEach(function (offerItem) {
    var newPin = createPin(offerItem);
    documentFragment.appendChild(newPin);
  });

  map.appendChild(documentFragment);
};

var renderCards = function (offersArray) {
  var documentFragment = document.createDocumentFragment();

  offersArray.forEach(function (offerItem) {
    var newCard = createCard(offerItem);
    documentFragment.appendChild(newCard);
  });
  map.appendChild(documentFragment);
};

var togglePinHidden = function (show) {
  var allPins = map.querySelectorAll('.map__pin');
  for (var i = 0; i < allPins.length; i++) {

    if (allPins[i].classList.contains('map__pin--main')) {
      continue;
    }

    if (show) {
      allPins[i].classList.remove('visually-hidden');
      continue;
    }

    allPins[i].classList.add('visually-hidden');
  }
};

var Mouseup = document.querySelector('.map__pin--main');
var mapfaded = document.querySelector('.map');
var addform = document.querySelector('.ad-form');
var addformadress = document.getElementById('address');
Mouseup.addEventListener('mouseup', function () {
  mapfaded.classList.remove('map--faded');
  addform.classList.remove('ad-form--disabled');
  var coord = event.x + ', ' + event.y;
  addformadress.setAttribute('value', coord);
  togglePinHidden(true);
});

// //var pinClick = document.querySelector('.icon-open');
// var cardHidden = document.querySelector('.map__card');
// pinClick.addEventListener('click', function () {
//   cardHidden.classList.remove('visually-hidden');
// });


var GENERATE_ITEMS = generateRandomOffers(8);
renderPins(GENERATE_ITEMS);
renderCards(GENERATE_ITEMS);

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


