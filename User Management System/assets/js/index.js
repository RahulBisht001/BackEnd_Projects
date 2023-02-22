
$("#add_user").submit(function (event) {

    alert("Data Inserted Successfully !")
})

$("#update_user").submit(function (event) {
    event.preventDefault()
    let unindexed_array = $("#update_user").serializeArray()
    let data = {}
    $.map(unindexed_array, function (n, i) {
        data[n["name"]] = n["value"]
    })

    let request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    // console.log(data)

    // AJAX  request
    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully !")
    })
})


// Delete Request

if (window.location.pathname == '/') {
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function () {
        let id = $(this).attr("data-id")

        let request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE",
        }
        if (confirm("Are you sure that you want to Delete this record ?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully !")
                window.location.reload()
            })
        }
    })
}