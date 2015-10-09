(function(){
    var app = angular.module('gemStore',[]);

    app.controller('StoreController',function(){
        this.product=gem;
    });

    var gems = [
    {
        name:"Azurite",
        price:110.50,
        canPurchase:flase,
        soldOut:true
    },
    {};

})();