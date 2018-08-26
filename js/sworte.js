
var feature = document.getElementsByClassName("feature-box");
var featureImg =  document.getElementById("featureImg");

// register and login
$(function () {
	$("#registerForm").hide();
	$("#registerModal").click(function () {
		$("#loginForm").fadeOut();	
		$("#registerForm").fadeIn();
	});
	$("#loginModal").click(function () {
		$("#registerForm").fadeOut();
		$("#loginForm").fadeIn();	
	});

	/*Dashboard*/ 
	$("#dashboard").css("cursor", "pointer");
	$("#dashboard").click(function () {
		if ($("#dashboard .fa").hasClass("fa-minus-square-o")) {
			$("#dashboard .fa").removeClass("fa-minus-square-o");
			$("#dashboard .fa").addClass("fa-plus-square-o");
			$("#dashboardInfo").slideUp("slow");
		}else{
			$("#dashboard .fa").removeClass("fa-plus-square-o");
			$("#dashboard .fa").addClass("fa-minus-square-o");
			$("#dashboardInfo").slideDown("slow");
		}
	});
})
for (var i = 0; i < feature.length; i++) {
	feature[i].addEventListener("mouseover", toggleElements ,false);
}

function toggleElements() {
	featureImg.setAttribute("src", this.dataset.img);
}

/* For the accordion plus and minus signs */ 
var collapsible = document.querySelectorAll(".d-flex");
for (var i = 0; i < collapsible.length; i++) {
	collapsible[i].addEventListener("click", togglePanel ,false);
}

function togglePanel() {
	var flag = false;
	var fa = document.querySelectorAll(".d-flex .fa");
	if (this.classList.contains("collapsed")) {
		this.setAttribute("id", "accord");
		var accord =  document.querySelectorAll("#accord .fa");
		accord[0].classList.remove("fa-plus-square-o");
		flag = true;
	}
	for (var i = 0; i < fa.length; i++) {
		fa[i].classList.remove("fa-minus-square-o");
		fa[i].classList.add("fa-plus-square-o");
	}
	if (flag) {
		accord[0].classList.remove("fa-plus-square-o");
		accord[0].classList.add("fa-minus-square-o");
		this.removeAttribute("id");
	}
}

/* settings page */
$(document).ready(function () {
    $("#notificationContent, #configurationContent").hide();
    $("#notification, #userNext, #configurationPrev").click(function () {
      $("#notification").addClass('active');
      $("#configuration, #userInfo").removeClass('active');
      $("#notificationContent").fadeIn();
      $("#userInfoContent, #configurationContent").fadeOut();
    });
    $("#configuration, #notificationNext").click(function () {
      $("#configuration").addClass('active');
      $("#notification, #userInfo").removeClass('active');
      $("#configurationContent").fadeIn();
      $("#userInfoContent, #notificationContent").fadeOut();
    });
    $("#userInfo, #notificationPrev").click(function () {
      $("#userInfo").addClass('active');
      $("#configuration, #notification").removeClass('active');
      $("#userInfoContent").fadeIn();
      $("#configurationContent, #notificationContent").fadeOut();
    });
    let autograph =  document.getElementById("autograph");
    $("#autograph").change(function () {
      $("#autographStyle").css("font-family", autograph.value);
    });

});

// For Back to Top Sticky

$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 1500) {
                $('#scrollUp').fadeIn();
            } else {
                $('#scrollUp').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#scrollUp').click(function () {
            $('#scrollUp').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('#scrollUp').tooltip('show');

});

// network
$(".n-image-container").mouseover(function () {
  this.childNodes[3].style.display = "block";
});
$(".n-image-container").mouseout(function () {
  this.childNodes[3].style.display = "none";
});

// profile page bio-pic
var modalCall = document.getElementsByClassName("modal-call");
for (var i = 0; i < modalCall.length; i++) {
  modalCall[i].setAttribute("data-num", i);
}

$(function () {
  $(".modal-call").click(function () {
    var bioStory = $(this).attr("id", "bioStory");
    bioStory = $(this).attr("id");
    $("#bioModalTitle").html(($("#"+bioStory+ " .bio-title").html()));
    $("#bioModalDescription").html(($("#"+bioStory+ " .bio-description").html()));
    $("#bioModalImage").attr("src", ($("#"+bioStory+ " .bio-image").attr("src")));
    $(this).attr("id", "");
    var dataNum = $(this).attr("data-num");
    $("#nextBtn").click(function () {
      if (dataNum >= modalCall.length - 1) {
        dataNum = -1;
      }
      dataNum = parseInt(dataNum) + 1;
      var bioStory = modalCall[dataNum].setAttribute("id", "bioStory");
      bioStory = modalCall[dataNum].getAttribute("id");
      $("#bioModalTitle").html(($("#"+bioStory+ " .bio-title").html()));
      $("#bioModalDescription").html(($("#"+bioStory+ " .bio-description").html()));
      $("#bioModalImage").attr("src", ($("#"+bioStory+ " .bio-image").attr("src")));
      modalCall[dataNum].setAttribute("id", "");
      
    });
  $("#prevBtn").click(function () {
      if (dataNum <= 0) {
        dataNum = modalCall.length;
      }
      dataNum = parseInt(dataNum) - 1;
      var bioStory = modalCall[dataNum].setAttribute("id", "bioStory");
      bioStory = modalCall[dataNum].getAttribute("id");
      $("#bioModalTitle").html(($("#"+bioStory+ " .bio-title").html()));
      $("#bioModalDescription").html(($("#"+bioStory+ " .bio-description").html()));
      $("#bioModalImage").attr("src", ($("#"+bioStory+ " .bio-image").attr("src")));
      modalCall[dataNum].setAttribute("id", "");
      
    });
  });
});

// personality
var editBtn = document.getElementsByClassName("edit-btn");
for (var i = 0; i < editBtn.length; i++) {
  var dataId;
  var dataContent;
  editBtn[i].addEventListener("click", function () {
    dataId = $(this).attr("data-id");
    dataContent = $(this).attr("data-content");
    if (document.getElementById(dataId).style.display == "block") {
      $("#"+dataId).slideUp();
      $("#"+dataContent).slideDown();
      $(this).html('<a class="edit-link edit-color"><i class="fas fa-pencil-alt"></i></a>');
    }else{
      $("#"+dataId).slideDown();
      $("#"+dataContent).slideUp();
      console.log(this);
      $(this).html('<a class="edit-link save-color"><i class="fa fa-paper-plane-o"></i></a>');
    }
  },false);
}