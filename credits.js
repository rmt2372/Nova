demo.credits = function(){};
demo.credits.prototype = {
    preload: function(){},
    create: function(){
        addChangeStateEventListeners();
        console.log('credits');
    },
    update: function(){}
}
