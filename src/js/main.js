(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Accordion = require('./views/accordion.js');
var AutoScroll = require('./views/autoScroll.js');
var Modal = require('./views/modal.js');
var Swap = require('./views/swap.js');
var Tab = require('./views/tab.js');
var Toggle = require('./views/toggle.js');
},{"./views/accordion.js":2,"./views/autoScroll.js":3,"./views/modal.js":4,"./views/swap.js":5,"./views/tab.js":6,"./views/toggle.js":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/* Tabs Module ***************************************************************************/
$(document).ready(Tab = function() {
	var tab = '.js-tab';
	var trigger = '.js-tab-trigger';
	var subTab = '.js-tab-sub';
	var subTabTitle = '.js-tab-sub-title > span';
	var subTabTitleFirst = '.js-tab-sub-title > span.first';
	var subTabTitleLast = '.js-tab-sub-title > span.last';
	var subTabTitleActive = '.js-tab-sub-title > span.active';
	var subTabTrigger = '.js-tab-sub-trigger';
	var subTabBack = '.js-tab-sub-back';
	var subTabNext = '.js-tab-sub-next';
	var subTabContent = '.js-tab-sub-content';
	var subTabContentActive = '.js-tab-sub-content.active';
	var duration = 0;
	
	$(tab).find(trigger).find('li').click(function(g) {
		var tab = $(this).closest('.js-tab');
		var index = $(this).closest('li').index();
		var content = '.js-tab-content';
		var contentActive = '.js-tab-content:eq(' + index + ')';

		$(tab).find(trigger).find('li').find('a').removeClass('active');
		$(this).closest('li').find('a').addClass('active');

		tab.find(content).not(contentActive).slideUp(duration);
		tab.find(contentActive).slideDown(duration);

		//g.preventDefault();

	});

	$(subTabNext).find(subTabTrigger).addClass('inActive');

	$(tab).find(subTabNext).click(function(next) {
		$(this).parents(subTab).find(subTabTitleActive).next().addClass('active');
		$(this).parents(subTab).find(subTabTitleActive).prev().removeClass('active');

		$(this).parents(tab).find(subTabContentActive).next().addClass('active');
		$(this).parents(tab).find(subTabContentActive).prev().removeClass('active');

		$(this).parents(subTab).find(subTabNext).find(subTabTrigger).removeClass('inActive');
		$(this).parents(subTab).find(subTabBack).find(subTabTrigger).removeClass('inActive');

		if ($(this).parents(subTab).find(subTabTitleLast).hasClass('active')) {
			$(this).find(subTabTrigger).addClass('inActive');
		}

		next.preventDefault();
	});

	$(tab).find(subTabBack).click(function(back) {
		$(this).parents(subTab).find(subTabTitleActive).prev().addClass('active');
		$(this).parents(subTab).find(subTabTitleActive).next().removeClass('active');

		$(this).parents(tab).find(subTabContentActive).prev().addClass('active');
		$(this).parents(tab).find(subTabContentActive).next().removeClass('active');

		$(this).parents(subTab).find(subTabNext).find(subTabTrigger).removeClass('inActive');
		$(this).parents(subTab).find(subTabBack).find(subTabTrigger).removeClass('inActive');

		if ($(this).parents(subTab).find(subTabTitleFirst).hasClass('active')) {
			$(this).find(subTabTrigger).addClass('inActive');
		}

		back.preventDefault();
	});

});

module.exports = Tab;
},{}],7:[function(require,module,exports){
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
},{}]},{},[1])