$(document).ready(function () {
    $("#meniHam").click(function () {
        $("nav").animate({
            top: 0
        }, 300);
        $("nav").addClass("position-fix");
    });
    $("#meniX i").click(function () {
        $("nav").removeClass("position-fix");
        $("nav").animate({
            top: -550
        }, 300, function () {
            $("nav").removeAttr("style");
        });
    });

    // Uvecanje slike klikom na nju
    $('.galerijaBlok img').click(function () {
        $('body').css('overflow-y', 'hidden');
        $("<div id='fullPage'></div>").css({"display" : "flex", "top" : $(document).scrollTop()}).appendTo("body");
        var $slika = $(document.createElement("img"));
        $slika.attr('src', $(this).attr('src'));
        $slika.attr('id', 'lightbox');
        $slika.appendTo("#fullPage");


        $('#fullPage').click(function (e) {
            if(e.target !== this)
                return ;
            
            $('body').css('overflow-y', 'auto');
            $(this).remove();
        });
    });

    const regIme = /^[A-ZŠĐČĆŽ][a-zšđčćž]{1,11}$/;
    const regPrezime = /^([A-ZŠĐČĆŽ][a-zšđčćž]{1,15}){1,2}$/;
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var nizGresaka = ["tbIme", "tbPrezime", "tbEmail", "tbTekst"];

    $("#tbIme").blur(function () {  
        if($(this).next().length != 0){
            $(this).next().remove();
        }
        if(!regIme.test($(this).val())){
            $("<small>Ime mora početi sa velikim slovom i sadržati bar dva slova</small>")
                .appendTo($(this).parent());
            $(this).addClass("reqError");

            if(nizGresaka.indexOf("tbIme") == -1){
                nizGresaka.push("tbIme");
            }
        }else{
            $(this).removeClass("reqError");
            if(nizGresaka.indexOf("tbIme") > -1){
                nizGresaka.splice(nizGresaka.indexOf("tbIme"), 1);
            }
        }
        console.log(nizGresaka);
    });

    $("#tbPrezime").blur(function () {  
        if($(this).next().length != 0){
            $(this).next().remove();
        }
        if(!regPrezime.test($(this).val())){
            $("<small>Prezime mora početi sa velikim slovom i sadržati bar dva slova</small>")
                .appendTo($(this).parent());
            $(this).addClass("reqError");
            if(nizGresaka.indexOf("tbPrezime") == -1){
                nizGresaka.push("tbPrezime");
            }
        }else{
            $(this).removeClass("reqError");
            if(nizGresaka.indexOf("tbPrezime") > -1){
                nizGresaka.splice(nizGresaka.indexOf("tbPrezime"), 1);
            }
        }
    });

    $("#tbEmail").blur(function () {  
        if($(this).next().length != 0){
            $(this).next().remove();
        }
        if(!regEmail.test($(this).val())){
            $("<small>Neispravna email adresa</small>")
                .appendTo($(this).parent());
            $(this).addClass("reqError");
            if(nizGresaka.indexOf("tbEmail") == -1){
                nizGresaka.push("tbEmail");
            }
        }else{
            $(this).removeClass("reqError");
            if(nizGresaka.indexOf("tbEmail") > -1){
                nizGresaka.splice(nizGresaka.indexOf("tbEmail"), 1);
            }
        }
    });

    $("#tbTekst").blur(function () {
        if($(this).next().length != 0){
            $(this).next().remove();
        }
        if($(this).val().length < 4){
            $("<small>Poruka nije pravilno upisana</small>")
                .appendTo($(this).parent());
            $(this).addClass("reqError");
            if(nizGresaka.indexOf("tbTekst") == -1){
                nizGresaka.push("tbTekst");
            }
        }else{
            $(this).removeClass("reqError");
            if(nizGresaka.indexOf("tbTekst") > -1){
                nizGresaka.splice(nizGresaka.indexOf("tbTekst"), 1);
            }
        }
    });

    $("#kontaktForma").submit(function (e) {
        e.preventDefault();
        if(nizGresaka.length == 0){
            console.log("Forma uspesna")
        }else{
            nizGresaka.forEach(element => {
                isReq("#" + element);
            });
        }
    });
});


function isReq(element) {
    $(element).addClass("reqError");
    if($(element).next().length == 0){
        console.log("usao");
        $("<small>Obavezno polje</small>").appendTo($(element).parent());
    }
}