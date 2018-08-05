
var feature = document.getElementsByClassName("feature-box");
var featureImg =  document.getElementById("featureImg");

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
		if ($("#dashboard .fa").hasClass("fa-minus")) {
			$("#dashboard .fa").removeClass("fa-minus");
			$("#dashboard .fa").addClass("fa-plus");
			$("#dashboardInfo").slideUp("slow");
		}else{
			$("#dashboard .fa").removeClass("fa-plus");
			$("#dashboard .fa").addClass("fa-minus");
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
		accord[0].classList.remove("fa-plus");
		flag = true;
	}
	for (var i = 0; i < fa.length; i++) {
		fa[i].classList.remove("fa-minus");
		fa[i].classList.add("fa-plus");
	}
	if (flag) {
		accord[0].classList.remove("fa-plus");
		accord[0].classList.add("fa-minus");
		this.removeAttribute("id");
	}
}