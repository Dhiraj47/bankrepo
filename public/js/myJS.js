$(document).ready(function(){

    $.post("/allBankName", 
        function(data, status){
        var $bankName = $('#bankName');      
        console.table(data);
        $.each(data, function(i, item){
            $bankName.append('<option>'+item.name+'</option>');
        }); 
    });

    $.post("/allStateName", 
        function(data, status){
        var $state = $('#state');      
        console.table(data);
        $state.append('<option>--SELECT--</option>');
        $.each(data, function(i, item){
            $state.append('<option>'+item.state+'</option>');
        }); 
    });

});


function getClear(){
    $("#state").val($("#state option:first").val());
    $('#district').html('<option>-- SELECT--</option>');
    $('#branch').html('<option>-- SELECT--</option>');
}

function getDist(){
    var bankName = $('#bankName').val();
    var state = $('#state').val();
    var $district = $('#district'); 
    $district.html('<option>-- SELECT--</option>');  
    $('#branch').html('<option>-- SELECT--</option>');

    $.post("/getDist", {
        state: state,
        bankName: bankName
    },
        function(data, status){           
        console.log(data);
        $.each(data, function(i, item){
            $district.append('<option>'+item.district+'</option>');
        }); 
    });
}


function getBranch(){
    var bankName = $('#bankName').val();
    var state = $('#state').val();
    var dist = $('#district').val();
    var $branch = $('#branch');   
    $branch.html('<option>-- SELECT--</option>');  
    $.post("/getBranch", {
        state: state,
        dist: dist,
        bankName: bankName
    },
        function(data, status){                 
        console.log(data);
        $.each(data, function(i, item){
            $branch.append('<option>'+item.branch+'</option>');
        }); 
    });
}


function getresult(){
    var bankName = $('#bankName').val();
    var state = $('#state').val();
    var dist = $('#district').val();
    var branch = $('#branch').val();

    $.post("/getresult", {
        state: state,
        dist: dist,
        bankName: bankName,
        branch: branch
    },
        function(data, status){
            result(data);
    });
}


function searchIFSC(){
    getClear();
    var IFSC = $('#IFSC').val();
    var reg = /^[A-Za-z]{4}\d{7}$/;
    if(IFSC.trim().match(reg)){
    $.post("/searchIFSC",
    {
        IFSC: IFSC.trim()
    },
    function(data, status){
        result(data);
    });
}
else
    alert('Invalid IFSC Code');
}


function result(data){
    var $result = $('#result');
    console.log(data);
    $result.html('');
    if(data[0]==null)
    {
       $result.html('<p>Sorry... No result Found</p>');
    }
    else{
       $result.append('<p> <b>Address:</b> '+data[0].address+'</p>');
       $result.append('<p> <b>Bank Name:</b> '+data[0].bank_name+'</p>');
       $result.append('<p> <b>Branch Name:</b> '+data[0].branch+'</p>');
       $result.append('<p> <b>City:</b> '+data[0].city+'</p>');
       $result.append('<p> <b>District:</b> '+data[0].district+'</p>');
       $result.append('<p> <b>IFSC:</b> '+data[0].ifsc+'</p>');
       $result.append('<p> <b>State:</b> '+data[0].state+'</p>');
       $result.append("<p> <a class='text-primary' href='https://www.google.com/maps?q="+data[0].bank_name+','+data[0].address+','+data[0].city+','+data[0].state+"' target='_blank'>Location In Map</a></p>");
                
    }
   
}