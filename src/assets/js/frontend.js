$(document).ready(function() {

    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if( $(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('cd-fade-out');
            }
        });

    // $(".kkSlider").owlCarousel({
    //     center: true,
    //     items:1.25,
    //     loop:true,
    //     margin:40,
    //     nav:false,
    //     animateOut: 'slideInLeft',
    //     animateIn: 'slideOutRight',
    //     autoplay:true,
    //     dots: true,
    //     smartSpeed: 1500,
    //     responsive : {
    //         // 0 : {
    //         //     margin:30,
    //         //     items:1.1,
    //         // },
    //         // 480 : {
    //         //     margin:40,
    //         //     items:1.1,
    //         // },
    //         // 768 : {
    //         //     margin:50,
    //         //     items:1.1,
    //         // },
    //         // 991 : {
    //         //     margin:70,
    //         // }
    //     }
    // });

    $(".galleryImgSummery .readMore").click(function(){
        $(this).parent(".galleryImgSummery").toggleClass('show');
    });

});
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function goBack() {
  window.history.back();
}