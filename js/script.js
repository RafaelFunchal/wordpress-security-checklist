$(function () {
    'use strict';

    $('input[type=checkbox]').change(function(){
    	$(this).parent().toggleClass('checked');
    });

}());
