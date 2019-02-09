$(document).ready(function () {
    $.when(loadAJAX()).done(function (a1) {
        createTable(a1.data
		.filter(function (item) {
                return !(item[1] === ".");
        }).sort(function (a, b) {
                return a[1].localeCompare(b[1]);
            }));
    });
});

function loadAJAX() {
    return $.ajax({
        url: "http://ivu.aseag.de/interfaces/ura/instant_V1?StopAlso=false&ReturnList=stoppointname,stopid",
		//url: "haltestellen.json",
        type: "POST",
        dataType: "json",
        headers: {
            Accept: "application/json;odata=verbose",
        },
        dataFilter: function (data) {
            return "{\n\"data\":[" + data.split('\n').splice(1).join(",\n") + "]\n}";
        }
    });
}

function createTable(data) {
    $('#haltestellen').DataTable({
        data: data,
        "columnDefs": [
            {"visible": false, "targets": [0]}
        ],
        dataType: 'jsonp'
    });
}