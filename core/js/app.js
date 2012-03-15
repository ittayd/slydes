define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        presentation = require('presentation'),
        plugins = require('plugins_mgmt')

    return {
        initialize: function initialize(){
            plugins.start(function(){
                presentation.start()
                $('html').removeClass('loading')
            })
        }
    };
});
