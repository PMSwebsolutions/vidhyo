$(document).ready(function() {
  $(".ham-btn").click(function(){
    $(".nav-contents").toggle(function(){
      if( $(".nav-contents").is(":visible") ){
        $(".nav-item-link").click(function(){
          $(".nav-contents").css("display","none");
          $(".ham-btn i").removeClass('fas fa-times').addClass('fas fa-bars')
        });
      }
    });
    $("i", this).toggleClass("fa-bars fa-times");
  });


//======================= SCROLL ==============================================================//

// Add smooth scrolling to all links
$(".nav-item-link").on('click', function(event) {
    console.log("clicked");
// Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
  // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

//======================= CONTACT US FIELD KEYUP FUNCTION ==============================================================//

$('#c-name, #c-subject, #c-phone, #c-address, #c-message').keyup(function(){
  $(this).css("border-bottom","2px solid white");
});

$('#c-email').keyup(function(){
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(String($('#c-email').val()).match(re)){
      $(this).css("border-bottom","2px solid white");
  }else{
    $(this).css("border-bottom","2px solid red");
  }
});

//======================= CONTACT US SUBMIT FUNCTION ==============================================================//

  $('.submit-btn').click(function(e){
    isEmpty = 0;
    $(".contact-form input[type=text],.contact-form input[type=email], .contact-form textarea").each(function(){
      if($(this).val()==""){
        $(this).css("border-bottom","2px solid red");
        isEmpty += 1;
      }
    });

    if(isEmpty >0){
      $(".message").text("Enter Appropriate value.");
      $(".message").css('color','red');
    }else{
      $(this).submit();
      if(window.innerWidth >= 1000){
        $('.ajaxProgress').show();
        $("#c-submit").attr("disabled", "disabled");
      }else{
        $("#c-submit").attr("disabled", "disabled");
        $('.ajaxProgressMob').show();
      }
      e.preventDefault();
      $.ajax({
        type : 'POST',
        url: '',
        data:{
          name:$('#c-name').val(),
          email:$('#c-email').val(),
          subject:$('#c-subject').val(),
          phone:$('#c-phone').val(),
          address:$('#c-address').val(),
          message:$('#c-message').val(),
          csrfmiddlewaretoken:  $('input[name=csrfmiddlewaretoken]').val(),
        },
        success:function(){
          $('.message').text('The message was sent successfully');
          $('#c-name').val('');
          $('#c-email').val('');
          $('#c-subject').val('');
          $('#c-phone').val('');
          $('#c-address').val('');
          $('#c-message').val('').css('color',"green");
          $('.ajaxProgress').css('display','none');
          $('.ajaxProgressMob').css('display','none');
          $('#c-submit').removeAttr("disabled");
        }
      });
    }
  });




});
