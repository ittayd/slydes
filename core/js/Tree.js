define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore')
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
        find: function find(arg) {
            if (arg instanceof Tree && _.isEqual(this, arg)) {
                return this;
            }
            
            if (this.elem.is(arg)) {
                return this
            }
            
            for(i = 0; i < children.length; i++) {
                var found = children[i].find(arg)
                if (found) {
                    return found;
                }
            }
        } 
    })
    
    return result;
})