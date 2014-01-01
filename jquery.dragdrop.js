/*
 * HTML5 Draggable & Droppable jQuery Plugin
 *
 * Based on html5sortable (http://farhadi.ir/projects/html5sortable/) by Ali Farhadi
 *
 * Copyright 2012, Amir Grozki
 * Released under the MIT license.
 */
(function($) {
  var dragging, callbacks = {
    dragstart: $.Callbacks(),
    dragstop: $.Callbacks()
  };

  $.fn.draggable = function(options) {
    var method = String(options);

    options = $.extend({
      helper: 'original'
    }, options);

    $(document).on('dragover.h5dnd dragenter.h5dnd', function() {
      if ( dragging ) {
        dragging.toggle(dragging.data('helper') !== 'original');
      }
    });

    return this.each(function() {
      if (/^enable|disable|destroy$/.test(method)) {
        var self = $(this).attr('draggable', method == 'enable');

        if (method == 'destroy') {
          self.add(this)
            .off('dragstart.h5dnd dragend.h5dnd selectstart.h5dnd');
        }
        return;
      }

      var isHandle, self = $(this);

      self.find(options.handle).mousedown(function() {
        isHandle = true;
      }).mouseup(function() {
        isHandle = false;
      });

      self
        .addClass('draggable')
        .attr('draggable', 'true')
        .data('helper', options.helper)
        .on('dragstart.h5dnd', function(e) {
          if (options.handle && !isHandle) {
            return false;
          }

          isHandle = false;

          var dt = e.originalEvent.dataTransfer;

          dt.effectAllowed = 'move';
          dt.setData('Text', 'dummy');

          dragging = $(this).addClass('draggable-dragging');

          callbacks.dragstart.fire();

          options.start && options.start.call(dragging);

        }).on('dragend.h5dnd', function() {
          if (!dragging) {
            return;
          }

          dragging.trigger('dragstop.h5dnd').removeClass('draggable-dragging').show();

          dragging = null;

          callbacks.dragstop.fire();

          options.stop && options.stop.call(dragging);

        }).not('a[href], img').on('selectstart.h5dnd', function() {
          this.dragDrop && this.dragDrop();
          return false;
        });
    });
  };

  $.fn.droppable = function(options) {
    var method = String(options);

    options = $.extend({
      accept: '*',
      addClasses: false,
      activeClass: 'droppable-active',
      hoverClass: 'droppable-hover'
    }, options);

    return this.each(function() {
      if (/^enable|disable|destroy$/.test(method)) {
        var self = $(this);

        if (method == 'destroy' || method == 'disable') {
          self.add(this)
            .off('dragover.h5dnd dragenter.h5dnd dragout.h5dnd dragleave.h5dnd drop.h5dnd');
        }

        return;
      }

      var isHandle, index, self = $(this);

      callbacks.dragstart.add(function() {
        self.toggleClass(options.activeClass, dragging && dragging.is(options.accept));
      });

      callbacks.dragstop.add(function() {
        self.removeClass(options.activeClass);
      });

      self
        .addClass('droppable')
        .add(this)
        .on('dragover.h5dnd dragenter.h5dnd', function(e) {
          if (!self.is(dragging) && !dragging.is(options.accept)) {
            return true;
          }

          self.toggleClass(options.hoverClass, options.addClasses);

          e.preventDefault();
          e.originalEvent.dataTransfer.dropEffect = 'move';

          options.over && options.over.call(self);

          return false;
        })
        .on('dragout.h5dnd dragleave.h5dnd', function(e) {
          self.removeClass(options.hoverClass);

          e.preventDefault();

          options.out && options.out.call(self);

          return false;
        })
        .on('drop.h5dnd', function(e) {
          self.removeClass(options.hoverClass);

          e.stopPropagation();

          dragging.trigger('dragend.h5dnd');

          options.drop && options.drop.call(dragging);

          return false;
        });
    });
  };
})(jQuery);
