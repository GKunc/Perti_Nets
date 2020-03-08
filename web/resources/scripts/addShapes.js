function addSquare() {
    var square = document.createElement( "div" );
    square.setAttribute("class", "shape square");
    $(".board-container").append(square);
    move("square");
}

function addCircle() {
    var circle = document.createElement( "div" );
    circle.setAttribute("class", "shape circle");
    $(".board-container").append(circle);
    move("circle");
}

function addArrow() {
    var arrow = document.createElement( "div" );
    arrow.setAttribute("class", "shape circle");
    $(".board-container").append(arrow);
}

function move(class_name) {
    $("." + class_name).on('mousedown', function(e) {
        $(this).addClass('active');
        var oTop = e.pageY - $('.active').offset().top;
        var oLeft = e.pageX - $('.active').offset().left;
        $(this).parents().on('mousemove', function(e) {
            $('.active').offset({
                top: e.pageY - oTop,
                left: e.pageX - oLeft
            }).on('mouseup', function() {
                $(this).removeClass('active');
            });
        });
        return false;
    });
}