define(function(require) {
    var options = require('options'),
        _ = require('underscore')
      
    return {
        start: function start(callback) {
            var pluginModules = _.map(options.plugins, function(name){return 'plugins/' + name + '/main'})
            require(pluginModules, function() {
                callback();
            }) 
        }
    }
})