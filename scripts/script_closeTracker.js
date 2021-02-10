$(document).on('click', '.btnRemoveTracker', function () {
    let trackerID = $(this).attr('id').substring(16);
    $(this).closest('.flex-item').remove();
    clearInterval(intervalArr[trackerID])
});

