var selectedElements = [];

function move(class_name) {
    $("." + class_name).on('mousedown', function(e) {
        $(this).addClass('active');

        $(this).parents().on('mousemove', function(e) {
            if(class_name == "circle") {
                $(".active").attr("cx", e.pageX - 150);
                $(".active").attr("cy", e.pageY);
            } else if(class_name == "square") {
                $(".active").attr("x", e.pageX - 150);
                $(".active").attr("y", e.pageY - 10);
            } else if(class_name == "arrow") {
                $(".active").attr("x1", e.pageX - 150);
                $(".active").attr("y1", e.pageY - 10);
                $(".active").attr("x2", e.pageX - 150);
                $(".active").attr("y2", e.pageY - 10);
            }
        });

        $(this).on("mouseup", function (e) {
            $(this).removeClass("active");
        });
        return false;
    });
}

function select(class_name) {
    let clickedElement = document.querySelector('.board');
    $("." + class_name).off('dblclick');
    $("." + class_name).on('dblclick', function() {
        $(this).parents().on("keypress", function(event) {
            if(event.which == 8 && $('.' + class_name).hasClass("selected")) {
                clickedElement.removeChild(document.getElementsByClassName("selected")[0]);
            }
        });

        let elementId = $(this).attr('id');
        var index = selectedElements.indexOf(elementId);
        if($(this).hasClass("selected")) {
            if (index !== -1) {
                selectedElements.splice(index, 1);
            }
            $(this).removeClass("selected");
            $(this).attr('stroke', "black")
        } else {
            selectedElements.push(elementId);
            $(this).addClass("selected");
            $(this).attr('stroke', "red")
        }
        console.log(selectedElements)
    });
}