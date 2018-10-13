$(document).ready(function () {
    $('.dragg').on("dragstart", function (event) {
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).attr('id'));
        //console.log(dt);
    });
    $('.ships-dock').on("dragenter dragover drop", function (event) {
        event.preventDefault();
        if (event.type === 'drop') {
            var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
             console.log(data);
            
           var de = $('#' + data).detach();
           // if (event.originalEvent.target.tagName === "DIV") {
            //    de.insertBefore($(event.originalEvent.target));
            //}
            //else {
                de.appendTo($(this));
           // }
        };
    });
})