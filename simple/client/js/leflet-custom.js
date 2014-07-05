L.Control.Zoom = L.Control.extend({
        options: {
                position: 'topright'
        },

        onAdd: function (map) {
                var className = 'my-leaflet-control-zoom',
                    container = L.DomUtil.create('div', className);

                this._createButton('sZoom in', className + '-in', container, map.zoomIn, map);
                this._createButton('Zsoom out', className + '-out', container, map.zoomOut, map);

                return container;
        },

        _createButton: function (title, className, container, fn, context) {
                var link = L.DomUtil.create('a', className, container);
                link.href = '#';
                link.title = title;

                L.DomEvent
                        .on(link, 'click', L.DomEvent.stopPropagation)
                        .on(link, 'click', L.DomEvent.preventDefault)
                        .on(link, 'click', fn, context)
                        .on(link, 'dblclick', L.DomEvent.stopPropagation);

                return link;
        }
});

L.Map.mergeOptions({
        zoomControl: true
});

L.Map.addInitHook(function () {
        if (this.options.zoomControl) {
                this.zoomControl = new L.Control.Zoom();
                this.addControl(this.zoomControl);
        }
});

L.control.zoom = function (options) {
        return new L.Control.Zoom(options);
};