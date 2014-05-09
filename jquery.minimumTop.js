//use example $('#nav').setMinimumTop(10);

(function ($) {
    $.fn.extend({
        setMinimumTop: function (offset, minWidth) {

            function checkConditions($element) {
                return $(document).width() >= minWidth
                    && $(window).height() > $element.height() + 20
                    && $element.offset().top - $(window).scrollTop() <= offset;
            }
            
            function setWidth($element, fixedCopy) {
                $(fixedCopy).css('width', $element.width());
            }

            //EVENTS
            $(window).bind('scroll resize', { $element: this }, function (event) {

                //position toggling
                if (event.data.$element.data('fixedCopy') == undefined) {
                    if (checkConditions(event.data.$element)) {

                        event.data.$element.css('visibility', 'hidden');

                        var fixedCopy = document.createElement('div');
                        fixedCopy.innerHTML = event.data.$element[0].innerHTML;
                        $(fixedCopy).attr('class', event.data.$element.attr('class'));
                        $(fixedCopy).css('position', 'fixed');
                        $(fixedCopy).css('top', offset + 'px');
                        setWidth(event.data.$element, fixedCopy);
                        $(fixedCopy).insertAfter(event.data.$element);
                        event.data.$element.data('fixedCopy', fixedCopy);
                    }
                } else {
                    if (!checkConditions(event.data.$element)) {
                        $(event.data.$element.data('fixedCopy')).remove();
                        event.data.$element.removeData('fixedCopy');
                        event.data.$element.css('visibility', 'visible');
                    }

                    setWidth(event.data.$element, event.data.$element.data('fixedCopy'));
                }
            });
        }
    });
})(jQuery);
