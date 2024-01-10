const container = document.getElementById('contenedor-reloj');
var time_L_D = document.getElementById('reloj-L-D');

var labelClocks = [
    document.getElementById('clock1'),
    document.getElementById('clock2'),
    document.getElementById('clock3'),
    document.getElementById('clock4'),
    document.getElementById('clock5'),
    document.getElementById('clock6'),
    document.getElementById('clock7')
];

var timeClock1 = document.getElementById('reloj_1'),
    timeClock2 = document.getElementById('reloj_2'),
    timeClock3 = document.getElementById('reloj_3'),
    timeClock4 = document.getElementById('reloj_4'),
    timeClock5 = document.getElementById('reloj_5'),
    timeClock6 = document.getElementById('reloj_6');

var timeClock1_D = document.getElementById('reloj-1-D'),
    timeClock2_D = document.getElementById('reloj-2-D'),
    timeClock3_D = document.getElementById('reloj-3-D'),
    timeClock4_D = document.getElementById('reloj-4-D'),
    timeClock5_D = document.getElementById('reloj-5-D'),
    timeClock6_D = document.getElementById('reloj-6-D');

var fechas = document.getElementById('days-to');
var mostrar = document.getElementById('mostrar');
var fondo = document.getElementById('fondo');

const contadores = [
    document.getElementById('countdown1'),
    document.getElementById('countdown2'),
    document.getElementById('countdown3'),
    document.getElementById('countdown4'),
    document.getElementById('countdown5'),
    document.getElementById('countdown6')
]

var urlwpe, urlsel, custombga = false;

const locale = 'en-US',
    locale_2 = 'es-MX';

//Fechas
const dates = [
    new Date("Apr 6 2024 9:15"), //Contador 1
    new Date("May 20 2024 15:00"), //Contador 2
    new Date("Aug 22 2024 20:00"), //Contador 3
    new Date("Oct 12 2024 6:00"), //Contador 4
    new Date("")
];
const img = [
    "img/refuge.png",
    "img/basilica_zapopan.jpg",
    "img/sunset.jpg",
    "img/catedral_gdl.jpg",
    "img/romeria_2019.png",
    "img/autumn.jpg",
    "img/primavera.jpg"
];

const timezones = {
    clock1: 'America/Los_Angeles',
    clock2: 'America/New_York',
    clock3: 'Europe/Rome',
    clock4: 'Asia/Makassar',
    clock5: 'Asia/Tokyo',
    clock6: 'Australia/Sydney'
},
    clockNames = {
        clock1: 'Pacífico',
        clock2: 'New York',
        clock3: 'Europa',
        clock4: 'Indonesia',
        clock5: 'Japón',
        clock6: 'Sídney'
    };

const time_diff = [0, 0, 0, 0, 0];
const days_diff = [0, 0, 0, 0, 0];
const local = { hour: 0, minutes: 0, seconds: 0, period: 'AM', day: '', date: '', etapa: '' };
const clock1 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };
const clock2 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };
const clock3 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };
const clock4 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };
const clock5 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };
const clock6 = { hour: 0, period: 'AM', weekday: '', time_diff: 0, etapa: '' };

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
const solo_dia = { weekday: 'short' };
const options_c = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

function animacionEntrada() {
    $("#contenedorRelojes").animate({
        top: "300"
    }, 1000);
    $("#contenedorSec").animate({
        left: "328"
    }, 1000);
    $(".mediaInt").animate({
        left: "953"
    }, 1000);
}

function changeLabelClock() {
    labelClocks[0].innerHTML = clockNames.clock1;
    labelClocks[1].innerHTML = clockNames.clock2;
    labelClocks[2].innerHTML = clockNames.clock3;
    labelClocks[3].innerHTML = clockNames.clock4;
    labelClocks[4].innerHTML = clockNames.clock5;
    labelClocks[5].innerHTML = clockNames.clock6;
}

function updateClock() {
    // Get the current time, day , month and year
    var now = new Date(), date2 = new Date(now.getFullYear(), 10, 1);
    clock1.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock1, hour12: false }));
    clock2.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock2, hour12: false }));
    clock3.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock3, hour12: false }));
    clock4.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock4, hour12: false }));
    clock5.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock5, hour12: false }));
    clock6.hour = parseInt(now.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: timezones.clock6, hour12: false }));

    //Hora local
    /*if (now < date2) {
        //now.setHours(now.getHours()-1);
    }*/
    
    local.hour = now.getHours();
    local.minutes = now.getMinutes();
    local.seconds = now.getSeconds();
    local.date = now.toLocaleDateString(locale_2, options);
    local.etapa = getDayStage(now);

    if (local.seconds == 0) { //Si pasa un minuto actualizar el contador
        yearPercent();
    }
    if (local.minutes == 0) {
        horas_Diff();
        actualizaMensaje();
        try {
            if (custombga == false && urlsel.equals("-1"))
                cambia_fondo();

        } catch (error) {
            console.error(error);
        }

    }

    // format time
    local.period = local.hour < 12 ? 'AM' : 'PM';
    local.hour = local.hour % 12 || 12;
    local.minutes = local.minutes < 10 ? '0' + local.minutes : local.minutes;
    local.seconds = local.seconds < 10 ? '0' + local.seconds : local.seconds;

    //Reloj Local
    document.getElementById('reloj-h').innerHTML = local.hour;
    document.getElementById('dot1').innerHTML = ':';
    document.getElementById('reloj-m').innerHTML = local.minutes;
    document.getElementById('dot2').innerHTML = ':';
    document.getElementById('reloj-s').innerHTML = local.seconds;
    document.getElementById('reloj-p').innerHTML = local.period;

    time_L_D.innerHTML = local.date;

    timeClock1.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock1, hour12: true });
    timeClock2.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock2, hour12: true });
    timeClock3.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock3, hour12: true });
    timeClock4.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock4, hour12: true });
    timeClock5.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock5, hour12: true });
    timeClock6.innerHTML = now.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', timeZone: timezones.clock6, hour12: true });

    updateCountdown();
}
//Calcular Horas de Diferencia
function horas_Diff() {
    //Clock 1
    let now = new Date();
    let temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock1 }));
    clock1.time_diff = Math.floor((temp_h - now) / 1000 / 60 / 60);
    if (clock1.time_diff > 0) {
        clock1.time_diff = "+" + clock1.time_diff.toString();
    }
    clock1.etapa = getDayStage(clock1.hour);

    //Clock 2
    temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock2 }));
    clock2.time_diff = Math.ceil((temp_h - now) / 1000 / 60 / 60);
    if (clock2.time_diff > 0) {
        clock2.time_diff = "+" + clock2.time_diff.toString();
    }
    clock2.etapa = getDayStage(clock2.hour);

    //Clock 3
    temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock3 }));
    clock3.time_diff = Math.ceil((temp_h - now) / 1000 / 60 / 60);
    if (clock3.time_diff > 0) {
        clock3.time_diff = "+" + clock3.time_diff.toString();
    }
    clock3.etapa = getDayStage(clock3.hour);
    //Clock 4
    temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock4 }));
    clock4.time_diff = Math.ceil((temp_h - now) / 1000 / 60 / 60);
    if (clock4.time_diff > 0) {
        clock4.time_diff = "+" + clock4.time_diff.toString();
    }
    clock4.etapa = getDayStage(clock4.hour);

    //Clock 5
    temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock5 }));
    clock5.time_diff = Math.ceil((temp_h - now) / 1000 / 60 / 60);
    if (clock5.time_diff > 0) {
        clock5.time_diff = "+" + clock5.time_diff.toString();
    }
    clock5.etapa = getDayStage(clock5.hour);

    //Clock 6
    temp_h = new Date(now.toLocaleString('en-US', { timeZone: timezones.clock6 }));
    clock6.time_diff = Math.ceil((temp_h - now) / 1000 / 60 / 60);
    if (clock6.time_diff > 0) {
        clock6.time_diff = "+" + clock6.time_diff.toString();
    }
    clock6.etapa = getDayStage(clock6.hour);

    timeClock1_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock1 }) + clock1.etapa + " " + clock1.time_diff + "hrs";
    timeClock2_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock2 }) + clock2.etapa + " " + clock2.time_diff + "hrs";
    timeClock3_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock3 }) + clock3.etapa + " " + clock3.time_diff + "hrs";
    timeClock4_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock4 }) + clock4.etapa + " " + clock4.time_diff + "hrs";
    timeClock5_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock5 }) + clock5.etapa + " " + clock5.time_diff + "hrs";
    timeClock6_D.innerHTML = now.toLocaleDateString(locale_2, { weekday: 'short', timeZone: timezones.clock5 }) + clock6.etapa + " " + clock6.time_diff + "hrs";
}

function getDayStage(x) {
    if (x >= 5 && x <= 8) {
        return "🌅";
    } else if (x < 20 && x > 8) {
        return "🌞";
    } else {
        return "🌙";
    }
}

function yearPercent() {
    let now = new Date();
    let newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0);
    let year_s = new Date(now.getFullYear(), 0, 1, 0, 0);

    let daysPassed = (now - year_s) / (1000 * 60 * 60 * 24);
    let totalDays = (newYear - year_s) / (1000 * 60 * 60 * 24);
    let percentage = 0;
    percentage = (daysPassed) / totalDays * 100;

    totalDays = totalDays - daysPassed;
    document.getElementById('completado').innerHTML = (now.getFullYear() + " completado en un " + Math.floor(percentage) + "%<br>" + Math.floor(daysPassed) +
        " días recorridos<br>" + Math.ceil(totalDays)) + " días restantes";
}

function updateCountdown() {
    let date1 = new Date();
    dates[dates.length - 1] = calculaSigVisita();
    for (let x = 0; x < dates.length; x++) {
        time_diff[x] = calcTimeDiff(dates[x]); //Hacer la resta de los dias
    }
    contadores[0].innerHTML = contador_avanzado(time_diff[0]) + " para " + dates[0].toLocaleDateString('es-MX', options_c);
    contadores[1].innerHTML = contador_avanzado(time_diff[1]) + " para " + dates[1].toLocaleDateString('es-MX', options_c);
    contadores[2].innerHTML = contador_avanzado(time_diff[2]) + " para " + dates[2].toLocaleDateString('es-MX', options_c);
    contadores[3].innerHTML = contador_avanzado(time_diff[3]) + " para " + dates[3].toLocaleDateString('es-MX', options_c);
    //contadores[4].innerHTML = "<br>" + contador_avanzado(time_diff[4]) + " para el próximo cambio vespertino";
}

function calcTimeDiff(dateO) {
    let date1 = new Date(),
        time_difference;
    time_difference = dateO.getTime() - date1.getTime(); //Hacer la resta de los dias
    return time_difference;
}

function calculaSigVisita() {
    let ahora = new Date();
    let proxima_visita = new Date(ahora.getMonth() + 1 + " " + ahora.getDate() + " 2022 17:00");
    if (ahora.getHours() >= 17) {
        proxima_visita.setDate(proxima_visita.getDate() + 1);
    }
    return proxima_visita;
}


function contador_avanzado(times) {
    let dias, horas, minutos, seg;
    if (times <= 0) {
        return "0d. 00hrs. 00min. 00seg."
    } else {
        
        times = times + 1000;
        
        //Calcular tiempo
        dias = Math.floor(times / (1000 * 60 * 60 * 24));
        horas = Math.floor((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutos = Math.floor((times % (1000 * 60 * 60)) / (1000 * 60));
        seg = Math.floor((times % (1000 * 60)) / 1000);

        //formatear tiempo
        seg = seg < 10 ? '0' + seg : seg;
        horas = horas < 10 ? '0' + horas : horas;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        return dias + "d. " + horas + "hrs. " + minutos + "min. " + seg + "seg."
    }

}

function colocaFondo() {
    fondo.style.backgroundImage = "url(" + img[5] + ")";
    fondo.style.backgroundSize = "cover";
    fondo.style.backgroundPositionY = "33%";
}

function cambia_fondo() {
    let date1 = new Date();
    if (date1.getHours() >= 5 && date1.getHours() < 12) {
        //Mañana
        fondo.style.backgroundImage = "url(" + img[1] + ")";
        fondo.style.backgroundSize = "cover";
        fondo.style.backgroundPositionY = "33%";
    } else if (date1.getHours() >= 12 && date1.getHours() < 20) {
        //Tarde
        fondo.style.backgroundImage = "url(" + img[2] + ")";
        fondo.style.backgroundSize = "cover";
        fondo.style.backgroundPositionY = "33%";
    } else {
        //Noche
        fondo.style.backgroundImage = "url(" + img[3] + ")";
        fondo.style.backgroundSize = "cover";
        fondo.style.backgroundPositionY = "0%";
    }
}

function actualizaMensaje() {
    let date1 = new Date();
    if (date1.getHours() >= 5 && date1.getHours() < 12) {
        mostrar.innerHTML = "Buenos Días 🌅";
    } else if (date1.getHours() >= 12 && date1.getHours() < 20) {
        mostrar.innerHTML = "Buenas Tardes 🌞";
    } else {
        mostrar.innerHTML = "Buenas Noches 🌙";
    }
}
//Obtener color desde Wallpaper Engine
function getColor(customColor) {
    let customC = customColor;
    customC = customC.map(function (c) {
        return Math.ceil(c * 255);
    });
    return 'rgb(' + customC + ')';
}
// Escucha de propiedades
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.titlecolors) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customC = getColor(properties.titlecolors.value.split(' '));
            // Do something useful with the value here or assign it to a global variable
            const elements = document.querySelectorAll(".titulos");
            elements.forEach(function (element) {
                element.style.cssText = "color: " + customC;
            });
        }

        if (properties.foregroundcolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customC = getColor(properties.foregroundcolor.value.split(' '));
            // Do something useful with the value here or assign it to a global variable
            const elements = document.querySelectorAll(".colors");
            elements.forEach(function (element) {
                element.style.cssText = "color: " + customC;
            });
        }
        if (properties.colorcontadores) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customC = getColor(properties.colorcontadores.value.split(' '));
            // Do something useful with the value here or assign it to a global variable
            const elements = document.querySelectorAll(".colors-contadores");
            elements.forEach(function (element) {
                element.style.cssText = "color: " + customC;
            });
        }
        //Contadores 1-4
        if (properties.countdown1) {
            dates[0] = new Date(properties.countdown1.value.toString());
            updateCountdown();
        }
        if (properties.countdown2) {
            dates[1] = new Date(properties.countdown2.value.toString());
            updateCountdown();
        }
        if (properties.countdown3) {
            dates[2] = new Date(properties.countdown3.value.toString());
            updateCountdown();
        }
        if (properties.countdown4) {
            dates[3] = new Date(properties.countdown4.value.toString());
            updateCountdown();
        }
        //Foto de fondo
        if (properties.background) {
            urlsel = properties.background.value;
            switch (properties.background.value) {
                case '0':
                    fondo.style.backgroundImage = "url(" + img[0] + ")";
                    //fondo.style.backgroundPosition = "100% 30%"
                    break;
                case '1':
                    fondo.style.backgroundImage = "url(" + img[1] + ")";
                    //fondo.style.backgroundPosition = "100% 50%"
                    break;
                case '2':
                    fondo.style.backgroundImage = "url(" + img[2] + ")";
                    break;
                case '3':
                    fondo.style.backgroundImage = "url(" + img[3] + ")";
                    break;
                case '4':
                    fondo.style.backgroundImage = "url(" + img[4] + ")";
                    break;
                case '5':
                    fondo.style.backgroundImage = "url(" + img[5] + ")";
                    break;
                case '-1':
                    cambia_fondo();
                    break;
            }
        }
        if (properties.custombg) {
            custombga = properties.custombg.value;
            switch (properties.custombg.value) {
                case true:
                    try {
                        fondo.style.backgroundImage = urlwpe;
                    } catch (error) { cambia_fondo() }
                    break;
                case false:
                    if (urlsel >= 0)
                        fondo.style.backgroundImage = "url(" + img[urlsel] + ")";
                    break;
            }


        }
        //Fondo personalizado
        if (properties.imagencustom) {

            urlwpe = "url('file:///" + properties.imagencustom.value + "')";
            // Assign the file to the src attribute of an image element
            if (custombga == true)
                fondo.style.backgroundImage = urlwpe;
        }
        //Modo Fondo
        if (properties.displaymode) {
            switch (properties.displaymode.value) {
                case "cover":
                    fondo.style.backgroundSize = "cover";
                    //fondo.style.backgroundPosition = "100% 30%"
                    break;
                case "contain":
                    fondo.style.backgroundSize = "contain";
                    fondo.style.backgroundRepeat = "no-repeat";
                    fondo.style.backgroundColor = "black";
                    break;
                case "tile":
                    fondo.style.backgroundSize = "initial"
                    fondo.style.backgroundRepeat = "repeat";
            }
        }
        //Ajustar Fondo X
        if (properties.ajustarfondox) {
            let valorX = properties.ajustarfondox.value + "%"
            fondo.style.backgroundPositionX = valorX;
        }

        //Ajustar Fondo Y
        if (properties.ajustarfondoy) {
            let valorY = properties.ajustarfondoy.value + "%"
            fondo.style.backgroundPositionY = valorY;
        }

        //Activar contadores
        if (properties.activarcontador) {
            switch (properties.activarcontador.value) {
                case true:
                    document.getElementById('contadores').style.visibility = "visible";
                    break;
                case false:
                    document.getElementById('contadores').style.visibility = "hidden";
                    break;
            }

        } //Activar Porcentaje Año
        if (properties.activarporcentajeanio) {
            switch (properties.activarporcentajeanio.value) {
                case true:
                    document.getElementById('secCompletado').style.visibility = "visible";
                    break;
                case false:
                    document.getElementById('secCompletado').style.visibility = "hidden";
                    break;
            }
        }
        // Add more properties here
    },
};
//Media integration Listener
let albumCoverArt = null;

function wallpaperMediaPropertiesListener(event) {
    // Update title and artist labels
    $("#trackTitle").text(event.title);
    $("#album").text(event.albumTitle);
    $("#artist").text(event.artist);

}

function wallpaperMediaThumbnailListener(event) {
    // Update album cover art
    albumCoverArt.src = event.thumbnail;
    $("#trackTitle").css("color", event.primaryColor);
    $("#artist").css("color", event.secondaryColor);
}

// Find all required elements
albumCoverArt = document.getElementById('albumCoverArt');
try {
    // Register the media property listener provided by Wallpaper Engine.
    window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);

    // Register the media thumbnail listener provided by Wallpaper Engine.
    window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);
} catch (e) {

}


colocaFondo();
actualizaMensaje();
changeLabelClock();
updateClock();
horas_Diff();
yearPercent();
setInterval(updateClock, 1000);
animacionEntrada();