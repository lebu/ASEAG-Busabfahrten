$(document).ready(function () {
    $.when(loadAJAX(100642), loadAJAX(100621)).done(function (a1, a2) {
        setTimeout(function () {
            location.reload();
        }, 600000);//10 Minuten in ms
        createTable(a1[0].data.concat(a2[0].data)
            .filter(function (item) {
                return !(item[2] === "Campus Melaten" || item[2] === "Uniklinik" || item[2] === "Vaals Heuvel" || item[2] === "Uniklinik-Schanz-Hbf.");
            }).sort(function (e1, e2) {
                return e1[4] - e2[4];
            }));
    });
});

function loadAJAX(id) {
    return $.ajax({
        url: "http://ivu.aseag.de/interfaces/ura/instant_V1?StopAlso=false&ReturnList=expiretime,linename,destinationtext,estimatedtime&StopId=" + id,
        type: "POST",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose",
        },
        dataFilter: function (data) {
            return "{\n\"data\":[" + data.split('\n').splice(1, 16).join(",\n") + "]\n}";
        }
    });
}

function createTable(data) {
    $('#abfahrten').DataTable({
        data: data,
        "columnDefs": [
            {
                "render": function (data) {
                    var date = new Date(data);
                    return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
                },
                "targets": [4]
            },
            {"visible": false, "targets": [0, 3]}
        ],
        dataType: 'jsonp'
    });
}