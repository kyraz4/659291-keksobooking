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

  // var parentCard = document.querySelector('template');
  // var closeButton = document.querySelector('.popup__close');
  // closeButton.addEventListener('click', function () {
  //   parentCard.parentNode.removeChild(parentCard);
  // });
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

var onPinClick = function (data) {

  // drop card
  // add card
  var newCard = createCard(data);
  renderCards(newCard);
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

  pinElementTemplate.addEventListener('click', onPinClick.bind(null, offerObject));
  return pinElementTemplate;

};

var getPhoto = function (photo) {
  var nextPhoto;
  for (var i = 1; i < photo.length; i++) {
    nextPhoto = ' <img src= ' + photo[i] + '/>';
    return nextPhoto;
  }
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
  cardElementTemplate.querySelector('.popup__photos img').innerHtml = getPhoto(offerObject.offer.photos);
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

var closeCard = function () {
  var existCard = document.querySelector('.map__card');
  if (!existCard) {
    return;
  }
  existCard.removeEventListener('click', closeCard);
  map.removeChild(existCard);
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    closeCard();
  }
});

var renderCards = function (cardNode) {
  cardNode.querySelector('.popup__close').addEventListener('click', closeCard);

  closeCard();

  map.appendChild(cardNode);
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
  addformadress.value = coord;
  addformadress.disabled = true;
  togglePinHidden(true);
});


var minLengthCount = 30;
var maxLengthCount = 100;
var newTitle = document.querySelector('#title');
newTitle.minLength = minLengthCount;
newTitle.maxLength = maxLengthCount;
newTitle.required = true;

var setPriceMax = 1000000;
var setPrice = document.querySelector('#price');
setPrice.required = true;
setPrice.max = setPriceMax;


var appartamentType = document.querySelector('#type');
var onPriceChange = function () {
  if (appartamentType.value === 'bungalo') {
    setPrice.min = 0;
  } else if (appartamentType.value === 'flat') {
    setPrice.min = 1000;
  } else if (appartamentType.value === 'house') {
    setPrice.min = 5000;
  } else if (appartamentType.value === 'palace') {
    setPrice.min = 10000;
  }
};

appartamentType.addEventListener('change', onPriceChange);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var onTimeInChange = function () {
  if (timeIn.value === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn.value === '13:00') {
    timeOut.value = '13:00';
  } else if (timeIn.value === '14:00') {
    timeOut.value = '14:00';
  }
};

//  onTimeOutChange = function (){
//    if (timeOut.value === '12:00'){
//      timeIn.value = '12:00';
//    } else if (timeOut.value === '13:00'){
//      timeIn.value = '13:00';
//    } else if (timeOut.value === '14:00') {
//      timeIn.value = '14:00';
//   }
// }

timeIn.addEventListener('change', onTimeInChange);
// timeOut.addEventListener('change', onTimeOutChange);

var roomNumber = document.querySelector('#room_number');
var capacityValue2 = document.querySelector('#capacity option:nth-child(2)');
var capacityValue1 = document.querySelector('#capacity option:nth-child(1)');
var capacityValue3 = document.querySelector('#capacity option:nth-child(3)');
var capacityValue4 = document.querySelector('#capacity option:nth-child(4)');
var onRoomNumberChange = function () {
  if (roomNumber.value === '1') {
    capacityValue2.disabled = true;
    capacityValue1.disabled = true;
    capacityValue4.disabled = true;
    capacityValue3.disabled = false;
  } else if (roomNumber.value === '2') {
    capacityValue1.disabled = true;
    capacityValue4.disabled = true;
    capacityValue2.disabled = false;
    capacityValue3.disabled = false;
  } else if (roomNumber.value === '3') {
    capacityValue4.disabled = true;
    capacityValue1.disabled = false;
    capacityValue2.disabled = false;
    capacityValue3.disabled = false;
  } else if (roomNumber.value === '100') {
    capacityValue1.disabled = true;
    capacityValue2.disabled = true;
    capacityValue3.disabled = true;
    capacityValue4.disabled = false;
  }
};

roomNumber.addEventListener('change', onRoomNumberChange);

var GENERATE_ITEMS = generateRandomOffers(8);
renderPins(GENERATE_ITEMS);

var pinMove = document.querySelector('.map__pin');
pinMove.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    pinMove.style.top = (pinMove.offsetTop - shift.y) + 'px';
    pinMove.style.left = (pinMove.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// var draggedItem = null;

// pinMove.addEventListener('dregstart', function (evt) {
//   if (evt.target.tagName.toLowerCase() === 'img') {
//     draggedItem = evt.target;
//     evt.dataTransfer.setData('text/plain', evt.target.alt);
//   }
// });

// var draggedItemPlase = document.querySelector('.map__overlay');

// draggedItemPlase.addEventListener('dragover', function (evt) {
//   evt.preventDefault();
//   return false;
// });

// renderCards(GENERATE_ITEMS);

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


