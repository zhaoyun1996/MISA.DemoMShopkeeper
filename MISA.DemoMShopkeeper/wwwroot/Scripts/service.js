var ajaxService = {
    get: function (uri, callback) {
        $.ajax({
            url: uri,
            type: 'GET',
            success: function (result) {
                callback(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var exceptionMessage = JSON.parse(XMLHttpRequest.responseText).ExceptionMessage;
                alert(exceptionMessage);
            }
        });
    },
    post: function (uri, data, callback) {
        $.ajax({
            url: uri,
            type: 'POST',
            data: data,
            dataType: 'application/json',
            contentType: 'application/json',
            success: function (result) {
                callback(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var exceptionMessage = JSON.parse(XMLHttpRequest.responseText).ExceptionMessage;
                alert(exceptionMessage);
            }
        });
    },
    put: function (uri, data, callback) {
        $.ajax({
            url: uri,
            type: 'POST',
            data: data,
            dataType: 'application/json',
            contentType: 'application/json',
            success: function (result) {
                callback(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var exceptionMessage = JSON.parse(XMLHttpRequest.responseText).ExceptionMessage;
                alert(exceptionMessage);
            }
        });
    },
    delete: function (uri, callback) {
        $.ajax({
            url: uri,
            type: 'POST',
            data: data,
            dataType: 'application/json',
            success: function (result) {
                callback(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var exceptionMessage = JSON.parse(XMLHttpRequest.responseText).ExceptionMessage;
                alert(exceptionMessage);
            }
        });
    }
}