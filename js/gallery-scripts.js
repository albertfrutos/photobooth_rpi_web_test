let req = new XMLHttpRequest();



req.open("GET", "https://api.jsonbin.io/v3/b/625409e87b69e806cf4bcb02/latest", true);
req.setRequestHeader("X-Master-Key", "$2b$10$DiOmu04bVKYjDW4uIszdrerbJVV5JoCtov1.iyL51PjNwU65.He3S");
req.setRequestHeader("X-Bin-Meta", "false");
req.send();

// Placing of images into HTML
function galleryTemplate(art) {
    return `
    <div hidden class="gallery">
        <figure class="polaroid">
            <img src="${art.url_thumb}" data-full-image="${art.url}">
            <figcaption> </figcaption>
        </figure>
    </div>
  `;
}


$(document).ready(function() {
    var options = {
        theme: "custom",
        // If theme == "custom" , the content option will be available to customize the logo
        content: '<img style="width:120px;" src="https://www.pngkey.com/png/detail/945-9455051_sccamera-camera-poloroid-rainbow-oldschool-oldcamera-old-polaroid.png" class="center-block">',
        message: '</br></br>Una mica de paciència, he anat a buscar les fotos...',
        backgroundColor: "#ffffff",
        textColor: "black"
    };
    HoldOn.open(options);
});

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
        a = JSON.parse(req.responseText);
        document.getElementById("app").innerHTML = a.pictures.map(galleryTemplate).join("")

        // Randomize polaroid images
        $('.polaroid').each(function() {
            const depth = Math.floor(Math.random() * 100);
            const rotate = Math.random() * 41 - 10;

            $(this).css({
                'z-index': depth,
                'transform': 'rotateZ(' + rotate + 'deg)'
            });
        });

        $(".gallery").click(function() {
            var options = {
                theme: "custom",
                // If theme == "custom" , the content option will be available to customize the logo
                content: '<img style="width:120px;" src="https://www.pngkey.com/png/detail/945-9455051_sccamera-camera-poloroid-rainbow-oldschool-oldcamera-old-polaroid.png" class="center-block">',
                message: '</br></br>Espera mentre et porto la foto en gran!',
                backgroundColor: "#ffffff",
                textColor: "black"
            };
            HoldOn.open(options);

            $(".modal-content").hide()
            var a = $(this).find('img').attr('data-full-image')
            $("#imgModal").attr('src', $(this).find('img').attr('data-full-image'))
            $("#myModal").modal();
            $('#imgModal').on('load', function(event) {
                HoldOn.close();
                $(".modal-content").fadeIn(1000);

            });

        });

        $('div#app img').on('load', function(event) {
            HoldOn.close()
            $("#mainDiv").removeAttr("hidden").fadeIn(2000);
            $(event.currentTarget).parent().parent().removeAttr("hidden");
            $("header").html("<b>Faig un any!</b>");
        });
    }
};