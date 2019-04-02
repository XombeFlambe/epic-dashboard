/* Modal Module ***************************************************************************/
$(document).ready(Modal = function() {
	var modalArc = '.js-modalArc';
	var trigger = 'a[class*=js-modalTrigger]';
	var modal = '.js-modal';
	var modalIntro = '.js-modalIntro';
	var content = '.js-modal-content';
	var scroller = '.js-modal-bd';
	var close = '.js-modal-close';
	var maskClose = '.js-modal-mask_close';
	var steps = '.js-modal-steps';
	var stepsHeading = '.js-modal-hd-steps > li';
	var stepsBody = '.js-modal-bd-steps > li';
	var stepsAction = '.js-modal-action-steps > li';
	var stepsHeadingActive = '.js-modal-hd-steps > li.active';
	var stepsBodyActive = '.js-modal-bd-steps > li.active';
	var stepsActionActive = '.js-modal-action-steps > li.active';
	var next = '.js-modal-next';
	var duration = 300;

	$(modalArc).find(trigger).click(function(g) {
		$(this).parents(modalArc).find(modal).not(modalIntro).fadeIn(duration);

		$(content).removeClass('modal-content_grayDark modal-content_ed modal-content_fb');

		if ($(this).hasClass('js-modalTriggerDark')) {
			$(this).parents('body').find(content).addClass('modal-content_grayDark');
		}
		if ($(this).hasClass('js-modalTriggerEd')) {
			$(this).parents('body').find(content).addClass('modal-content_ed');
		}
		if ($(this).hasClass('js-modalTriggerFb')) {
			$(this).parents('body').find(content).addClass('modal-content_fb');
		}

		g.preventDefault();
	});

	$(modal).find(close).click(function() {
		$(this).parents(modal).find(scroller).scrollTop(0);
		$(this).parents(modal).fadeOut(duration);
	});

	$(maskClose).click(function() {
		$(this).parent(modal).find(scroller).scrollTop(0);
		$(this).parent(modal).fadeOut(duration);
	});

	$(modal).find(next).click(function() {
		$(this).parents(steps).find(stepsHeadingActive).next(stepsHeading).addClass('active');
		$(this).parents(steps).find(stepsHeadingActive).prev(stepsHeading).removeClass('active');

		$(this).parents(steps).find(stepsBodyActive).next(stepsBody).addClass('active');
		$(this).parents(steps).find(stepsBodyActive).prev(stepsBody).removeClass('active');

		if ($(stepsHeadingActive).is(':last-child')) {
			$(this).parents(steps).find(stepsActionActive).next(stepsAction).addClass('active');
			$(this).parents(steps).find(stepsActionActive).prev(stepsAction).removeClass('active');
		}
	});

});

module.exports = Modal;