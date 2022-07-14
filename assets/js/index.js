

$("#UpdateProduct").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://shoppingcartlogincrud.herokuapp.com/api/products/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})


if(window.location.pathname == "/AllProduct"){
 
$(document).ready(function(){
   $(".DeleteProduct").click(function(){
        var id = $(this).attr("data-id")
     
        var request = {
            "url" : `http://shoppingcartlogincrud.herokuapp.com/api/products/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
   });
}