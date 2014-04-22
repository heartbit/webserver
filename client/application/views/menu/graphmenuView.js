define('graphmenuView', ['config', 'html2canvas', 'canvg', 'screenshot', 'text!graphmenuView.html'], function(config, html2canvas, canvg, Screenshot, GraphmenuTemplate) {

    return Backbone.View.extend({

        template: _.template(GraphmenuTemplate),

        events: {
            'click .js-screenshot': 'takeAScreenshot'
        },

        initialize: function() {},

        render: function(params) {
            // this.$el.html(this.template());
            return this;
        },

        takeAScreenshot: function() {
            var div2screen = this.$el.parent();

            // var nodesToRecover = [];
            // var nodesToRemove = [];

            var svgElem = div2screen.find('svg');

            // svgElem.each(function(index, node) {
            //     var parentNode = node.parentNode;
            //     var svg = parentNode.innerHTML;

            //     var canvas = document.createElement('canvas');

            //     canvg(canvas, svg);

            //     nodesToRecover.push({
            //         parent: parentNode,
            //         child: node
            //     });
            //     parentNode.removeChild(node);

            //     nodesToRemove.push({
            //         parent: parentNode,
            //         child: canvas
            //     });

            //     parentNode.appendChild(canvas);
            // });

            // html2canvas(div2screen, {
            //     onrendered: function(canvas) {
            //         var ctx = canvas.getContext('2d');
            //         ctx.webkitImageSmoothingEnabled = false;
            //         ctx.mozImageSmoothingEnabled = false;
            //         ctx.imageSmoothingEnabled = false;

            //         canvas.toBlob(function(blob) {
            //             nodesToRemove.forEach(function(pair) {
            //                 pair.parent.removeChild(pair.child);
            //             });

            //             nodesToRecover.forEach(function(pair) {
            //                 pair.parent.appendChild(pair.child);
            //             });
            //             saveAs(blob, 'screenshot_' + moment().format('YYYYMMDD_HHmmss') + '.png');
            //         });
            //     }
            // });

            html2canvas(svgElem, {
                onrendered: function(canvas) {
                    var screenshot = new Screenshot(canvas);
                    document.body.appendChild(canvas);
                    window.open(canvas.toDataURL());
                },
                width: svgElem.width(),
                height: svgElem.height()
            });
        }

    });

});