define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        presentation = require('presentation'),
        plugins = require('plugins_mgmt')
        
    require(plugins.pluginModules)

    return {
        initialize: function initialize(){
            $(document).ready(function() {
                presentation.initialize();
                $('html').removeClass('loading')
            })
        }
    };
});
