exports.getDate = function(){

    const today = new Date();

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'};

    return today.toLocaleDateString('en-US', options);
};

exports.getDayOfWeek = function (){

    const today = new Date();

    const options = {weekday: 'long'};

    return today.toLocaleDateString('en-US', options);
};

