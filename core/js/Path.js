define(function(require){
    var $ = require('jquery'),
        _ = require('underscore'),
        Step = require('Step');

    function helper(tree, path, steps) {
        $.each(tree.children, function(_, child) {
            steps.push(new Step(child, path)); 
            helper(child, path.concat(child), steps)  
        })
        return steps
    }
    
    var result = function Path(tree) {
        this.tree = tree
        this.steps = helper(tree, [], [])
    }
    
    $.extend(result.prototype, {
        insertBefore: function insertBefore(arg, step) {
            if (!(step instanceof Step)) {
               step = this.tree.find(step) 
            }
            for(i = 0; i < this.steps.length; i++) {
                if (this.steps[i].elem.is(arg)) {
                    this.steps.splice(i, 0, step)
                    break;
                }
            }
        }
    })
    
    return result;
})