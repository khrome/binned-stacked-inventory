(function(root, factory){
    if (typeof define === 'function' && define.amd){
        define(['extended-emitter'], factory);
    }else if(typeof exports === 'object'){
        module.exports = factory(require('extended-emitter'));
    }else{
        root.BinnedStackedInventory = factory(root.ExtendedEmitter);
    }
}(this, function(Emitter){

    function Inventory(options){
        this.options = options || {};
        if(!this.options.stack) this.options.stack = {};
        if(!this.options.sizes) this.options.sizes = {};
        this.inventory = {};
        new Emitter().onto(this);
    }

    Inventory.prototype.getStacksOfMaterial = function(type, material){
        return this.inventory[type].filter(function(stack){
            return stack.type === type;
        })
    }

    Inventory.prototype.add = function(type, material){
        var opts = this.options;
        if(!this.inventory[type]) this.inventory[type] = [];
        var inv = this.inventory[type].filter(function(item){
            return item.material === material;
        });
        var stack = inv.length && inv.reduce(function(a, b){
            if(a.material === b.material) return a.count < b.count?a:b;
            if(
                (opts.sizes[type] && b.count >= opts.sizes[type]) ||
                !opts.sizes[type]
            ) return b;
            if(
                (opts.sizes[type] && a.count >= opts.sizes[type]) ||
                !opts.sizes[type]
            ) return a;
        });
        if(stack){
            this.emit('stack-change', {
                stack : stack,
                type : type
            })
            stack.count++;
        }else{
            if(
                (
                    opts.stack[type] &&
                    (this.inventory[type].length < opts.stack[type])
                ) || !opts.stack[type]
            ){
                stack = {
                    count : 1,
                    material : material,
                    index : this.inventory[type].length
                };
                this.inventory[type].push(stack);
                this.emit('stack-add', {
                    stack : stack,
                    type : type
                })
            }else{
                this.emit('stack-drop', {
                    stack : stack,
                    count : 1
                })
            }
        }
    }
    return Inventory;
}));
