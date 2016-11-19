$.spinning = {
	init: function() {
		this.spinning = $("<div>").addClass("carregando");
	},
	show: function() {
		$("body").append(this.spinning);
	},
	hide: function() {
		$(this.spinning).remove();
	}
}