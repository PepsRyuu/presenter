define('text', function () {

    return {
        load: function (fileName, req, onLoad, config) {
            this.fetch(req.toUrl(fileName), function(content) {
                onLoad(content);
            });
        },

        fetch: function(url, callback, errback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onreadystatechange = function (evt) {
                if (xhr.readyState === 4) {
                    if (xhr.status > 399 && xhr.status < 600) {
                        var err = new Error(url + ' HTTP status: ' + xhr.status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);

        }
    };
});
