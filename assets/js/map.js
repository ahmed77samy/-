/*
Author       : Ahmed77Samy
Template Name: اكشف اونلاين
Version      : 0.1
*/

google.maps.visualRefresh = true;
var slider,
    infowindow = null;
var bounds = new google.maps.LatLngBounds();
var map,
    current = 0;
var locations = data_hospitals;

var icons = {
    default: "/img/marker.png"
};

function show() {
    infowindow.close();
    var next, marker;
    if (data_hospitals.length == 0) {
        return;
    } else if (data_hospitals.length == 1) {
        next = 0;
    }
    if (data_hospitals.length > 1) {
        do {
            next = Math.floor(Math.random() * data_hospitals.length);
        } while (next == current);
    }
    current = next;
    marker = data_hospitals[next];
    setInfo(marker);
    infowindow.open(map, marker);
}

function initialize(e) {
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(data_location.lat, data_location.lng),
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.slide = true;

    setMarkers(map, locations);
    infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });
    google.maps.event.addListener(infowindow, "closeclick", function () {
        infowindow.close();
    });
    slider = window.setTimeout(show, 3000);
}

function setInfo(marker) {
    var content = '<div class="profile-widget" style="width: 100%; display: inline-block;">' + '<div class="doc-img">' + '<a href="javascript:void(0);" tabindex="0" target="_blank">' + '<img class="img-fluid" width="300" height="200" alt="' + marker.hos_name + '" src="' + marker.image + '">' + "</a>" + "</div>" + '<div class="pro-content">' + '<h3 class="title">' + '<a href="javascript:void(0);" tabindex="0">' + marker.hos_name + "</a>" + '<i class="fas fa-check-circle verified"></i>' + "</h3>" + '<p class="speciality small">' + marker.description + "</p>" + '<div class="rating">' + '<i class="fas fa-star filled"></i>' + '<i class="fas fa-star filled"></i>' + '<i class="fas fa-star filled"></i>' + '<i class="fas fa-star filled"></i>' + '<i class="fas fa-star"></i>' + '<span class="d-inline-block average-rating"></span>' + "</div>" + '<ul class="available-info">' + '<li><i class="fas fa-map-marker-alt"></i> ' + marker.address + " </li>" + '<li><i class="far fa-money-bill-alt"></i> ' + marker.amount + "</li>" + "</ul>" + "</div>" + "</div>";
    infowindow.setContent(content);
}

function setMarkers(map, markers) {
    for (var i = 0; i < markers.length; i++) {
        var item = markers[i];
        let lat = data_location.lat + +item.lat;
        let lng = data_location.lng + +item.lng;
        var latlng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            hos_name: item.hos_name,
            address: `${data_location.location}, مصر`,
            description: item.description,
            amount: item.amount,
            animation: google.maps.Animation.DROP,
            icon: icons["default"],
            image: item.image
        });
        bounds.extend(marker.position);
        markers[i] = marker;
        google.maps.event.addListener(marker, "click", function () {
            setInfo(this);
            infowindow.open(map, this);
            window.clearTimeout(slider);
        });
    }
    map.fitBounds(bounds);
    google.maps.event.addListener(map, "zoom_changed", function () {
        if (map.zoom > 16) map.slide = false;
    });
}

google.maps.event.addDomListener(window, "load", initialize);
