$(function () {

    // add new task validation
    $('#taskinfo').on('input', function () {
        if (this.validity.patternMismatch) {
            this.setCustomValidity('Only alphanumeric and spaces allowed.');
        }
        else {
            this.setCustomValidity('');
        }
    });

    // confirmation for removing a task
    $('.btn-danger').on('click', function (e) {
        e.preventDefault();
        var ele = $(this);
        showDialog({
            content: '<p>You are about to remove task : ' + ele.data('taskinfo') + '</p><p>Are you sure you want to do this?</p>',
            title: '<span class="ui-icon ui-icon-alert"></span> WARNING - Confirmation Required.',
            buttons: [
                {
                    text: 'YES -> REMOVE TASK FROM LIST',
                    click: function () { $(this).dialog('close'); location.href = ele.attr('href'); },
                    title: 'Remove Task From List'
                },
                {
                    text: 'NO -> CHANGED MY MIND!',
                    click: function () { $(this).dialog('close'); },
                    title: 'Close Window'
                }
            ],
            keepclose: true,
            resizable: false,
        });

    });

    // add tooltips
    QTip();

});

///////////////////////
// helper functions //
/////////////////////

// show JQUI dialog
function showDialog(options) {

    // default options      
    var myOptions = {
        position: { my: 'center', at: 'center', of: window },
        modal: true,
        minWidth: 400,
        maxWidth: 480,
        minHeight: 100,
        maxHeight: 1000,
        width: 'auto',
        height: 'auto',
        show: 'explode',
        hide: 'explode',
        resizable: true,
        draggable: true,
        divID: 'dialog',
        keepclose: false,
    };


    // merge supplied options
    $.extend(true, myOptions, options);

    // check if div exits, otherwise add it
    if ($('#' + myOptions.divID).length == 0) {
        jQuery('<div/>', {
            id: myOptions.divID,
        }).appendTo('body');
    }

    // add message content
    $('#' + myOptions.divID).html(myOptions.content);

    // check if title provided
    if (!myOptions.title) {
        myOptions.title = 'The following error has occured...';
    }

    // add buttons (default CLOSE)
    if (myOptions.buttons) {
        // check if close icon needed
        if (!options.keepclose) {
            myOptions.dialogClass = 'no-close';
        }
        else {
            myOptions.dialogClass = undefined;
        }
    }
    else {
        myOptions.dialogClass = undefined;
        myOptions.buttons = [{
            text: 'CLOSE',
            click: function () { $(this).dialog('close'); QTip(); },
            title: 'Close Window'
        }];
    }

    $('#' + myOptions.divID).removeClass('nopad');

    // show dialog
    $('#' + myOptions.divID).dialog(myOptions);
    $('.ui-dialog-titlebar-close').attr('title', 'Close Window');
    $('.ui-dialog-titlebar-close').on('click', function () { QTip(); });

    // add tooltips
    QTip();

}

// fix bug with HTML in title attribute of JQUI dialog
jQuery.widget('ui.dialog', jQuery.extend({}, jQuery.ui.dialog.prototype, {
    _title: function (titleBar) {
        titleBar.html(this.options.title || '&#160;');
    }
}));

// QTip2 replacement for JQUI Tooltip
function QTip() {

    var myPos = {
        bot: { target: 'mouse', my: 'top left', at: 'bottom right', adjust: { x: 10, y: 20 } },
        top: { target: 'mouse', my: 'bottom left', at: 'top right', adjust: { x: 5, y: 0 } }
    };

    $('[title]').each(function () {
        $(this).qtip({
            style: { classes: 'qtip-light qtip-shadow qtip-rounded' },
            position: ($(this).data('qtop')) ? myPos.top : myPos.bot,
            content: { text: $(this).attr('title') },
            suppress: true
        });

    });

}
