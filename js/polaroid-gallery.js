// Placing of images into HTML
function galleryTemplate(art) {
    return `
    <div class="gallery">
        <figure class="polaroid">
            <img src="${art.url_thumb}" data-full-image="${art.url}">
            <figcaption> </figcaption>
        </figure>
    </div>
  `;
}

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
        a = JSON.parse(req.responseText);
        document.getElementById("app").innerHTML = a.pictures.map(galleryTemplate).join("")

        // Randomize polaroid images
        $('.polaroid').each(function() {
            const depth = Math.floor(Math.random() * 100);
            const rotate = Math.random() * 41 - 15;

            $(this).css({
                'z-index': depth,
                'transform': 'rotateZ(' + rotate + 'deg)'
            });
        });

        $(".gallery").click(function() {
            $(".modal-content").hide()
            var a = $(this).find('img').attr('data-full-image')
            $("#imgModal").attr('src', $(this).find('img').attr('data-full-image'))
            $(".modal-content").show()
            $("#myModal").modal();


        });



    }
};



req.open("GET", "https://api.jsonbin.io/v3/b/625409e87b69e806cf4bcb02/latest", true);
req.setRequestHeader("X-Master-Key", "$2b$10$DiOmu04bVKYjDW4uIszdrerbJVV5JoCtov1.iyL51PjNwU65.He3S");
req.setRequestHeader("X-Bin-Meta", "false");
req.send();




// Credits
console.log('%cPolaroid Image Gallery\n\nDesign by: Mehluli Hikwa\n\nwww.thatafro.com', 'font-size: 14px; font-weight: bold;')