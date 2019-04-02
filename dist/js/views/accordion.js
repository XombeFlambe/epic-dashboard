/* Accordion Module ***************************************************************************/
$(document).ready(Accordion = function() {
	var accordion = '.js-accordion';
	var item = '.js-accordion-item';
	var trigger = '.js-accordion-trigger';
	var content = '.js-accordion-content';
	var contentActive = '.js-accordion-content.active';
	var icon = 'i';
	var duration = 300;

	// Styles accordion item if you choose to start with an open accordion on load //
	$(accordion).find('.active').parent(item).find('i').addClass('active');
	$(accordion).find('.active').css("display", "block");

	// Click function logic //
	$(accordion).find(item).find(trigger).click(function(event) {

		$(accordion).find(contentActive).slideUp(duration);
		$(accordion).find(icon).removeClass('active');

		if ($(this).next(content).hasClass('active')) {
            $(content).removeClass('active');
            $(this).find(icon).removeClass('active');
        } else {
			$(content).removeClass('active');
			$(this).next(content).slideDown(duration);
			$(this).next(content).addClass('active');
			$(this).find(icon).addClass('active');
		}

	});
});

module.exports = Accordion;
