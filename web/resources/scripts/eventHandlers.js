var selectedElements = [];

function move(id, class_name) {
    $(document.getElementById(id)).on('mousedown', function(e) {
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

function select(id) {
    let clickedElement = document.querySelector('.board');
    $(document.getElementById(id)).on('dblclick', function() {
        console.log("here")
        $(this).parents().on("keypress", function(event) {
            if(event.which == 8 && $('#' + id).hasClass("selected")) {
                clickedElement.removeChild(document.getElementsByClassName("selected")[0]);
                clearList(selectedElements);
            }
        });

        if($(this).hasClass("selected")) {
            removeElementById(selectedElements, id);
            $(this).removeClass("selected");
            $(this).attr('stroke', "black")
        } else {
            selectedElements.push(id);
            $(this).addClass("selected");
            $(this).attr('stroke', "red")
        }
        console.log(selectedElements)
    });
}