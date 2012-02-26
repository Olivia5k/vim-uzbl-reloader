// GET param deserializer
// http://stackoverflow.com/questions/1131630/javascript-jquery-param-inverse-function
function deparam(query)
{
    var query_string = {};
    var vars = query.split("&");

    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");

        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);

        if (typeof query_string[pair[0]] === "undefined") {
            // If first entry with this name
            query_string[pair[0]] = pair[1];

        } else if (typeof query_string[pair[0]] === "string") {
            // If second entry with this name
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
        } else {
            // If third or later entry with this name
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
};

function uzbl_reload_file(filename)
{
    $('head link[href*="'+filename+'"]').each(
        function(e) {
            var href = $(this).attr('href'),
                get = [],
                params = {},
                unixtime = (new Date().valueOf() * 0.001)|0;

            // If there are any GET parameters, deserialize them and handle
            if(href.indexOf('?') != -1) {
                get = href.split('?');

                filename = get[0];
                params = deparam(get[1])
            } else {
                filename = href;
            }

            // Add the bogus uzbl GET parameter to force file reloading
            params['uzbl'] = unixtime;

            $(this).attr('href', filename + '?' + $.param(params));
        }
    );
}
