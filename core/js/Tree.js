define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore')
        options = require('options'),
        selector = options.stepSelectors.join(",")
    
    $.fn.tree = function() {
        return this.data('tree')
    }
    
    var result = function Tree(element) {
        this.$element = $(element);
        this.children = [];

        this.$element.attr('visited', "true")
        var self = this,
            $children = this.$element.find(selector)
                        
        $children.each(function(_, $child) {
            if(!$child.getAttribute('visited')) {
                self.children.push(new Tree($child))
            }
        })
        this.$element.data('tree', this)
        this.$element.trigger('tree', this)        
    }   

    $.extend(result.prototype, {
        find: function find(arg) {
            if (arg instanceof Tree && _.isEqual(this, arg)) {
                return this;
            }
            
            if (this.$element.is(arg)) {
                return this
            }
            
            for(i = 0; i < this.children.length; i++) {
                var found = this.children[i].find(arg)
                if (found) {
                    return found;
                }
            }
        } 
    })
    
    return result;
})