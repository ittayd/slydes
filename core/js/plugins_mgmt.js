define(function(require) {
    var options = require('options'),
        _ = require('underscore'),
        pm = _.map(options.plugins, function(name){return 'plugins/' + name + '/main'})
      
    require(pm)
    return {
        pluginModules: pm
    }
})