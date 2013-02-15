(function ($) {

    $.widget("wellcome.timeline_headerPanelView", {

        isZoomInEnabled: true,
        isZoomOutEnabled: true,
        isNavigating: false,

        _create: function () {
            var self = this;

            // bind to global events.
            $.wellcome.timeline.bind($.wellcome.timeline.RESIZE, function () {
                self.resize();
            });

            $.wellcome.timeline.bind($.wellcome.timeline.START_ZOOM, function () {
                self.disableZoomIn();
                self.disableZoomOut();
            });

            $.wellcome.timeline.bind($.wellcome.timeline.FINISH_ZOOM, function () {
                self.refresh();
            });

            $.wellcome.timeline.bind($.wellcome.timeline.START_SCROLL, function (e, direction) {
                self.disableZoomIn();
                self.disableZoomOut();
            });

            $.wellcome.timeline.bind($.wellcome.timeline.START_NAVIGATING, function (e, direction) {
                self.isNavigating = true;
            });

            $.wellcome.timeline.bind($.wellcome.timeline.FINISH_NAVIGATING, function (e, direction) {
                self.isNavigating = false;
            });

            // create ui.
            self.leftColElem = $('<div class="leftCol"></div>');
            self.element.append(self.leftColElem);

            self.titleElem = $('<div class="title"></div>');
            self.leftColElem.append(self.titleElem);

            self.rightColElem = $('<div class="rightCol"></div>');
            self.element.append(self.rightColElem);

            //self.resetButtonElem = $('<a class="reset">' + $.wellcome.timeline.options.config.HeaderPanelView.Reset + '</a>');
            //self.rightColElem.append(self.resetButtonElem);

            self.zoomOutButtonElem = $('<div class="zoomOut"></div>');
            self.rightColElem.append(self.zoomOutButtonElem);

            self.zoomInButtonElem = $('<div class="zoomIn"></div>');
            self.rightColElem.append(self.zoomInButtonElem);

            // init ui.

            self.title = $.wellcome.timeline.options.provider.data.Title;

            // add start and end dates to title.
            self.title += ": <span>" + $.wellcome.timeline.provider.data.StartDateDisplay + " - " + $.wellcome.timeline.provider.data.EndDateDisplay + "</span>";

            self.titleElem.ellipsisFill(self.title);

            // ui event handlers.
            self.zoomInButtonElem.on('click', function (e) {
                e.preventDefault();

                if (self.isZoomInEnabled) {
                    self._trigger('onZoomIn');
                }
            });

            self.zoomOutButtonElem.on('click', function (e) {
                e.preventDefault();

                if (self.isZoomOutEnabled) {
                    self._trigger('onZoomOut');
                }
            });
        },

        disableZoomIn: function () {
            var self = this;

            self.isZoomInEnabled = false;
            self.zoomInButtonElem.fadeTo(0, 0.5);
        },

        enableZoomIn: function () {
            var self = this;

            self.isZoomInEnabled = true;
            self.zoomInButtonElem.fadeTo(0, 1);
        },

        disableZoomOut: function () {
            var self = this;

            self.isZoomOutEnabled = false;
            self.zoomOutButtonElem.fadeTo(0, 0.5);
        },

        enableZoomOut: function () {
            var self = this;

            self.isZoomOutEnabled = true;
            self.zoomOutButtonElem.fadeTo(0, 1);
        },

        resize: function () {
            var self = this;

            var availWidth = self.element.width() - self.rightColElem.width();

            self.leftColElem.width(availWidth);

            self.titleElem.ellipsisFill(self.title);
        },

        refresh: function () {
            var self = this;

            if (self.isNavigating) return;

            if ($.wellcome.timeline.isMinZoom) {
                self.disableZoomOut();
            } else {
                self.enableZoomOut();
            }

            if ($.wellcome.timeline.isMaxZoom) {
                self.disableZoomIn();
            } else {
                self.enableZoomIn();
            }
        },

        _init: function () {
        },

        _destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });

})(jQuery);
