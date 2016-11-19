var NoteType = {
			NORMAL: {cod: 0},
			LIST: {cod: 1}
};

var Note = function(note) {
	// this.element = $("<div>").addClass("note");
	// this.element.textarea = $("<textarea>").addClass("note-content").prop("placeholder", "Nova Nota - Conteúdo");
	if(note) {
		this.title = note.title;
		this.description = note.description;
		this.type = eval(note.type);
		this.alarm = note.alarm;
		// this.element.textarea = $(this.element.textarea).prop("readonly", true).text(this.description);
		// this.element.title = $("<div>").addClass("note-title").append($("<h5>").text(this.title));
	} else {
		// this.element = $(this.element).addClass("note-new");
		this.title = "";
		this.description = "";
		this.type = NoteType.NORMAL;
		this.alarm = undefined;
		// this.element.title = $("<div>").addClass("note-title").append($("<input>").prop("type", "text").prop("placeholder", "Nova Nota - Título"));
	}
	
	// this.element.prepend(this.element.textarea);
	// this.element.prepend(this.element.title);
	// this.element.on("keypress.enter", {element: this.element}, function(event) {
	// 	var elem = event.data.element
	// 	var key = event.which;
	// 	var title = $(elem.title).children("input").val();
	// 	if (key == 13) {
	// 		$(this).removeClass("note__new");
	// 		$(elem.textarea).prop("readonly", true);
	// 		$(elem.title).children("input")[0].remove();
	// 		$(elem.title).prepend($("<h5>").text("titulo da nota"));
	// 		$(elem.textarea).focusout();
	// 	}
	// });
}

var MyApp = function() {
	var app = this;
	
	this.name = "Notas"
	this.notes = [];
	this.noteCounter = 0;

	var promiseNewNoteTemplate = $.ajax(
		{	url: '/html/templates/note-new-template.html',
			    data: '',         // Request data
			    type: 'GET',      // POST, PUT, DELETE...
			    dataType: 'text',
			    async: true
		});
	$.when(promiseNewNoteTemplate).done(function(source) {
		app.newNoteTemplate = source;
	});

}

MyApp.prototype.addNote = function(note) {
	$(".note").removeClass("note__new");
	note.id = "note" + (++this.noteCounter);
	this.notes.push(note);
	$(".notes-container").prepend(note);
}

MyApp.prototype.loadNotes = function() {
	var app = this;
	$.spinning.init();
	var promiseSleep = $.Deferred();
	$.spinning.show();

	var promiseNotasDados = $.ajax({
				    url: '/dados.json',
				    data: '',         // Request data
				    type: 'GET',      // POST, PUT, DELETE...
				    async: true,
				    dataType: 'json', // Response: html, xml, text, script, jsonp
	});

	var promiseNotaTemplate = $.ajax({
				    url: '/html/templates/note-template.html',
				    data: '',         // Request data
				    type: 'GET',      // POST, PUT, DELETE...
				    dataType: 'text',
				    async: true,
	});


	setTimeout(function() {
		promiseSleep.resolve();
	}, 500);

	$.when(promiseSleep, promiseNotasDados, promiseNotaTemplate).done(function(promiseValue, notes, source) {
		$.spinning.hide();
		var template = Handlebars.compile(source[0]);
		notes[0].forEach(function(note) {
				var noteObj = new Note(note);
				app.addNote(noteObj);
				$(".notes-container").prepend(template(noteObj));
		});
	});
}


$(document).ready(function() {
	var app = new MyApp();
	
	$(".nav__nova-nota").click(function() {
		$(".note").hide();
		var template = Handlebars.compile(app.newNoteTemplate);
		var newNote = new Note();
		app.addNote(newNote);
		$(".notes-container").prepend(template(newNote));
		$(".note-new").find(".note__content").focus();
	});

	app.loadNotes();
	
});

