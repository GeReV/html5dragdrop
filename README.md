HTML5 Drag & Drop jQuery Plugin
===============================

Based on [html5sortable](http://farhadi.ir/projects/html5sortable/) ([GitHub](https://github.com/farhadi/html5sortable)) by [Ali Farhadi](http://farhadi.ir/)

**[Demo](http://gerev.github.com/html5dragdrop)**

Features
--------
* Less than 2.5KB (minified and gzipped).
* Built using native HTML5 drag and drop API.
* Similar API and behaviour to jquery-ui sortable plugin.
* Works in IE 5.5+, Firefox 3.5+, Chrome 3+, Safari 3+ and, Opera 12+.

Usage
-----

Draggable Specific
=====

Use `draggable` method to create a draggable element:

``` javascript
$('.draggable').draggable();
```
Use `.draggable` and `.draggable-dragging` CSS selectors to change the styles of a dragging item.

Use `handle` option to restrict drag start to the specified element:

``` javascript
$('.draggable').draggable({
    handle: 'h2'
});
```

Droppable Specific
=====

Use `droppable` method to create a droppable element:

``` javascript
$('.droppable').droppable();
```
Use `.droppable` CSS selectors to change the style of a droppable.

Use `accept` option to restrict items accepted by the droppable:

``` javascript
$('.droppable').droppable({
    accept: '.some-draggable'
});
```

Use `addClasses` to have the `activeClass` added to the droppable when an accepted item starts dragging and `hoverClass` added when the item is above the droppable.

``` javascript
$('.droppable').droppable({
    addClasses: true,
    activeClass: 'active' // Optional. Default: 'droppable-active'.
    hoverClass: 'hover' // Optional. Default: 'droppable-hover'.
});
```

To remove the draggable or droppable functionality completely:

``` javascript
$('.draggable').draggable('destroy');
$('.droppable').droppable('destroy');
```

To disable the draggable or droppable temporarily:

``` javascript
$('.draggable').draggable('disable');
$('.droppable').droppable('disable');
```

To enable a disabled draggable or droppable:

``` javascript
$('.draggable').draggable('enable');
$('.droppable').droppable('enable');
```

The API is compatible with jquery-ui. So you can use jquery-ui as a polyfill in older browsers:

``` javascript
yepnope({
    test: Modernizr.draganddrop,
    yep: 'jquery.dragdrop.js',
    nope: 'jquery-ui.min.js',
    complete: function() {
        $('.sortable').sortable();
    }
});
```

License
-------
Released under the MIT license.
