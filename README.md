binned-stacked-inventory
========================

An interface for inventory, stacked and limited by type(slightly different than the standard unified storage)

Usage
-----

    var inventory = new Inventory({
        sizes : {
            <type name> : <max # of items per stack>
        }, stack : {
            <type name> : <total # of stacks for this type>
        }
    });

You'll want to listen for events:

    inventory.on('stack-change', function(e){ });
    inventory.on('stack-add', function(e){ });
    inventory.on('stack-drop', function(e){ });

Where `e` looks like:

    {
        stack: {
            count : <number of items in this stack>,
            material : <the id of this particular item (unique within type)>
        },
        type : <the type of stack this is>
    }

Then to add an item:

    inventory.add(<type>, material);

It will fill items into stacks until there is no more room and begin dropping things.

Testing
-------
Eventually it'll be:

    mocha

Enjoy,

 -Abbey Hawk Sparrow
