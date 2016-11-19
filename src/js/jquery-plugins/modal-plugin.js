(function($) {
	var elemClicked;
	var modal;
	var abreModal = function(msg, callback) {
		if(!modal) {
			modal =  $("<div>").addClass("myModal-layer")
				.append($("<div>")
					.addClass("myModal-dialog")
					.append($("<p>").html(msg))
					.append($("<button>").text("Sim").click(function() {
						$(this).closest(".myModal-layer").fadeOut();
						callback.call(elemClicked);
					}))
					.append($("<button>").text("Não").click(function() {
						$(this).closest(".myModal-layer").fadeOut();
					}))
				).click(function() {
					fechaModal();
				});
		}
		$("body").append(modal);
		modal.fadeIn();
	}

	var fechaModal = function() {
		$(this).fadeOut();
	}

	$.fn.modal = function(msg, callback) {
		elemClicked = this;
		this.click(function() {
			abreModal(msg, callback);
		});
		return this;
	}	
})(jQuery);