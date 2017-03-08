$(function () {
    'use strict';

    $('input[type=checkbox]').change(function(){
        $(this).parent().toggleClass('checked');
    });

    $('.items-counter').each(function(index, el) {
        updateItemsCounter(el);

        $(el).parent('h2').next('ul').find('input[type="checkbox"]').on('change', function(event) {
            updateItemsCounter($(this).parents('ul').prev('h2').find('.items-counter'));
        });
    });

    function updateItemsCounter(element) {
        var liTotalCount = $(element).parent('h2').next('ul').find('input[type="checkbox"]').length,
            liNotCheckedCount = $(element).parent('h2').next('ul').find('input[type="checkbox"]:not(":checked")').length;

        if (liTotalCount) {
            $(element).text('(' + liNotCheckedCount + ')');

            if (liNotCheckedCount === 0) {
                $(element).addClass('all-checked');
            } else {
                $(element).removeClass('all-checked');
            }
        }
    }
}());
