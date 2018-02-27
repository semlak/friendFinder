var reschildren;
	console.log("loading");

$(document).ready(function() {
	console.log("running");
	$("#questions-list").empty();
	$.ajax({
		url: "/api/survey",
		method: "GET"
	}).done(function(data) {
		var questions = data;
		let responseText = {
			1: "1 (Strongly Disagree)",
			2: "2",
			3: "3",
			4: "4",
			5: "5 (Strongly Agree)"
		}
		console.log(data);
		questions.forEach(function(question, i) {
			var element = $("<div>").addClass("form-group question-container")
				.append($("<h3>").text("Question " + i))
				.append($("<div>").attr("label", "question" + i)
					.text(question)
			);
			let questionOptionsSelector = $("<select>").addClass("form-control")
				.attr("id", "question" + i);
			[1, 2, 3, 4, 5].forEach(function(response) {
				questionOptionsSelector.append($("<option>").data("question-num", i)
					.text(responseText[response]).val("3")
				)
			});
			element.append(questionOptionsSelector);
			$("#questions-list").append(element);
		})
	})

	$("#submit-survey-button").on("click", function(e) {
		e.preventDefault();
		var name = $("#nameInput").val().trim();
		var image = $("#image").val().trim();

		var responses = [];
		var children = $("#questions-list").children();
		reschildren = children;
		console.log(children);
	})


})