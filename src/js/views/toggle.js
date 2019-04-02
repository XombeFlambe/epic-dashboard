/* Toggle Module ***************************************************************************/
$(document).ready(Toggle = function() {
	var toggle = '.js-toggle';
	var trigger = '.js-toggle-trigger';
	var content = '.js-toggle-content';

	$(toggle).find(trigger).click(function() {
		$(this).parents(toggle).find(content).slideToggle(200);
		$(this).find('i').toggleClass('icon-plus').toggleClass('icon-minus');
		$(this).find('span:first-child').toggle(0);
		$(this).find('span:last-child').toggle(0);
	});
});

module.exports = Toggle;