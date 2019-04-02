/* Auto Scroll Module ***************************************************************************/
$(document).ready(AutoScroll = function() {
	var scrollBox = '.js-autoScroll';
	var scrollTop = '.js-autoScroll.autoScroll_top';
	var scrollBtm = '.js-autoScroll.autoScroll_bottom';
	var trigger = '.js-autoScroll-trigger';
	var duration = 2000;

	$(trigger).mousedown(function() {
        $('body').find(scrollBox).addClass('active');
    });

    $(document).mouseup(function() {
        $(this).find(scrollBox).removeClass('active');
    });

	$(scrollTop).hover(function () {
		$("html, body").animate({ scrollTop: 0 }, duration);
	}, function() {
		$( "html, body" ).stop();
	});

	$(scrollBtm).hover(function () {
		var bodyHeight = $('body').height();
		$("html, body").animate({ scrollTop: bodyHeight }, duration);
	}, function() {
		$( "html, body" ).stop();
	});
});

module.exports = AutoScroll;