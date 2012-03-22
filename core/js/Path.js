define(function(require){
    var $ = require('jquery'),
        _ = require('underscore'),
        Step = require('Step');

    function helper(tree, path, steps) {
        $.each(tree.children, function(_, child) {
            steps.push(new Step(child, path)); 
            helper(child, path.add(child), steps)  
        })
        return steps
    }
    
    var result = function Path(tree) {
        this.tree = tree
        this.steps = helper(tree, $(), [])
        
        this.current(0);
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
        },
        
        current: function current(index) {
            _.each(this.steps, function(step, stepIdx) {
                if (stepIdx < index) {
                    step.past();
                } 
                
                if (stepIdx > index) {
                    step.future();
                }
            })
            this.steps[index].current();
        },
        
        $rootElements: function stepElements() {
            var arr = _.collect(this.steps, function(step) {
                if (step.$geneology.length == 0) {
                    return step.$element;
                }
            })
            return $.fromArray(arr)
        },
        
        length: function length() {
            return this.steps.length;
        }
    })
    
    return result;
})