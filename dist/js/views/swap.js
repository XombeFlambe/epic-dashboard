/* Swap Module ***************************************************************************/
$(document).ready(Swap = function() {
	var swap = '.js-swap';
	var trigger1 = '.js-swap-trigger1';
	var trigger2 = '.js-swap-trigger2';
	var content1 = '.js-swap-content1';
	var content2 = '.js-swap-content2';

	$(swap).find(trigger1).click(function() {
		$(this).parents(swap).find(content1).show(0);
		$(this).parents(swap).find(content2).hide(0);
	});

	$(swap).find(trigger2).click(function() {
		$(this).parents(swap).find(content2).show(0);
		$(this).parents(swap).find(content1).hide(0);
	});

});

module.exports = Swap;