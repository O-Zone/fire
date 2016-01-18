xmax = 80,
ymax = 30,
fireLevel = 0.35,
colors = ['#000','#100','#200','#300','#400','#500','#600','#a30','#e50','#f60','#a00','#b00','#c00','#d00','#e00','#f00'],
everyXFrame = 2,
globalcounter = 0;

spotsInAll = xmax * ymax;
$(document).ready(function () {
    var tmpStr = '';
    for (var i=0;i<spotsInAll;i++){
        tmpStr += '<div class="spot' + ((i >= (ymax-1) * xmax) ? ' hide':'') + '"></div>';
    }
    $('.container').html(tmpStr);
    window.spots = new Array();
    for (var x = 0; x < xmax; x += 1) {
        window.spots[x] = new Array();
        for (var y = 0; y < ymax; y += 1) {
            window.spots[x][y] = '0';
        }
    }
});

function hex2num(hexstr) {
    switch (hexstr) {
        case 'f' : return 15;
        case 'e' : return 14;
        case 'd' : return 13;
        case 'c' : return 12;
        case 'b' : return 11;
        case 'a' : return 10;
        default: return parseInt(hexstr, 10);
    }
}

function num2hex(num) {
    switch (num) {
        case 15 : return 'f';
        case 14 : return 'e';
        case 13 : return 'd';
        case 12 : return 'c';
        case 11 : return 'b';
        case 10 : return 'a';
        default: return '' + num;
    }
}

    function meanColor(col1, col2, col3) {
        var c1 = hex2num(col1),
            c2 = hex2num(col2),
            c3 = hex2num(col3);
        
        return num2hex(Math.floor((c1 + c2 + c3) / 3));
    }

    function showSpot(spotX, spotY, aX, aY, bX, bY, cX, cY){
        var spots = $('.spot');
        $(spots[spotY * xmax + spotX]).css('border','1px solid red');
        $(spots[aY * xmax + aX]).css('border','1px solid green');
        $(spots[bY * xmax + bX]).css('border','1px solid green');
        $(spots[cY * xmax + cX]).css('border','1px solid green');
    }

function step() {
    if (globalcounter++ % everyXFrame === 0){
        doStep();
    }
    //request next animationFrame
    window.requestAnimationFrame(step);
}

function doStep() {
    // add new lights
    for (var x = 0;x < xmax; x += 1) {
        if (Math.random() < fireLevel) {
            spots[x][ymax - 1] = 'f';
        } else {
            spots[x][ymax - 1] = '0';
        }
    }

    // loop thru the array to change colors
    for (var y = 0; y < ymax - 1; y += 1) {
        spots[0][y] = meanColor('0',spots[0][y+1],spots[1][y+1]);
        for (var x = 1; x < xmax - 1; x += 1) {
            spots[x][y] = meanColor(spots[x-1][y+1], spots[x][y+1], spots[x+1][y+1]);
        }
        spots[xmax-1][y] = meanColor(spots[xmax-2][y+1], spots[xmax-1][y+1], 1);
    }

    // set colors according to the array
    var $spots = $('.spot'), // TODO: optimization keep this in a global var somewhere
        i = 0;
    for (var y = 0; y < ymax; y += 1) {
        for (var x = 0; x < xmax; x += 1) {
            $($spots[i++]).css('background-color', colors[spots[x][y]]); //'#' + spots[x][y] + '00'); //spots[x][y] + spots[x][y]);
        }
    }
}

window.requestAnimationFrame(step);

