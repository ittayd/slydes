define(function(require) {
    var $ = require('jquery'),
        options = require('options'),
        selector = options.stepSelectors.join(",")
    
    $.fn.tree = function() {
        return this.data('tree')
    }
    
    var result = function Tree(elem) {
        this.elem = elem = $(elem);
        this.children = [];

        elem.attr('visited', "true")
        var self = this,
            elems = $(elem).find(selector)
                        
        elems.each(function(_, elem) {
            if(!elem.getAttribute('visited')) {
                self.children.push(new Tree(elem))
            }
        })
        elem.data('tree', this)
        elem.trigger('tree', this)        
    }   

    $.extend(result.prototype, {
        
    })
    
    return result;
})