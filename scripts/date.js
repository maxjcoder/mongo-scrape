//variable makes a date - exports at the bottom to use within program
var makeDate = function(){
    var d = new Date();
    var formattedDate = '';

    //months are counted at a zero indexl need the '+ 1'
    formattedDate += (d.getMonth() + 1) + '_';

    formattedDate += d.getDate() + '_';

    formattedDate += d.getFullYear();

    return formattedDate;

};

module.exports = makeDate;