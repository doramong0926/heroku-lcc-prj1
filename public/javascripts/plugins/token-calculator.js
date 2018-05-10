
var exchangeRate = 10000;

$(document).ready(function() {
    $("#calculator-eth").change(function(){
        calculateToken(this);
    });
    $("#calculator-lcc").change(function(){
        calculateToken(this);
    });
});

function calculateToken() {
    var text = document.getElementById("calculator-eth");
    text = text.value * exchangeRate;
    document.getElementById("calculator-lcc").value = text;
}