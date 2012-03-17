define(function(require) {
    var $ = require('jquery'),
        options = require('options'),
        selector = options.stepSelectors.join(",")
    
   
    var result = function Node(elem) {
        elem = this.elem = $(elem);
        this.children = []
        
        elem.attr('visited', "true")
        var self = this,
            elems = $(elem).find(selector)
            
            
        elems.each(function(_, elem) {
            if(!elem.getAttribute('visited')) {
                self.children.push(new Node(elem))
            }
        })
        
    }   

    result.prototype = {
    
    }

    result.prototype.constructor = result

    return result;
})