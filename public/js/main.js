$(function(){
    console.log('rdy');
    $(".vin-container a").click(function () {
        console.log('clk');
        let vin = $('.vin').val();
        var jqxhr = $.getJSON('/api', { vin: vin }, function (data) {
            $(".vin-container").addClass('loaded');
            $(".output").html('');
            if (data) {
                data.forEach(item => {
                    //  console.log(item);
                    $(".output").prepend("<li><strong>" + item.name + "</strong>" + item.value + "</li>");
                });
            } 

            $(".output").addClass('loaded');
      
        });
        
        jqxhr.fail(function() {
            $(".output").html('<srong> Empty or invalid VIN </srong>'); 
        });
        
    });
 });