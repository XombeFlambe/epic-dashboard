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