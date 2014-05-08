define('graphmenuView', ['config', 'html2canvas', 'canvg', 'screenshot', 'text!graphmenuView.html'],
    function(config, html2canvas, canvg, Screenshot, GraphmenuTemplate) {

        return Backbone.View.extend({

            template: _.template(GraphmenuTemplate),

            events: {
                'click .js-screenshot': 'takeAScreenshot',
            },
            intialize: function() {},
            initParent: function(parentEl) {
                var self = this;
                this.parentEl = parentEl;
                if (this.parentEl) {
                    $(parentEl).hover(function() {
                        self.$el.show();
                    }, function() {
                        self.$el.hide();
                    });
                }
            },
            render: function(params) {
                this.$el.html(this.template());
                return this;
            },

            takeAScreenshot: function() {
                var div2screen = this.$el.parent();
                var svgElem = div2screen.find('svg');
                var wkdoc = $('<html>')
                var body = $('<body>')
                var head = $('<head>')
                wkdoc.append(body)
                wkdoc.prepend(head)
                body.append(svgElem.clone())
                head.prepend($('<link href="http://localhost:9090/styles/all.css" rel="stylesheet" />'))
                var data = '<!DOCTYPE html>' + wkdoc[0].outerHTML

                var payload = {
                    html: data,
                    type: 'maingraph'
                };

                $.ajax({
                    url: "/services/pdf",
                    type: "POST",
                    data: payload,
                    success: function(filename) {
                        console.log('pdf : ', filename);
                        window.open('/services/pdf/' + filename)
                    }
                });

                // html2canvas(svgElem.clone(), {
                //     onrendered: function(canvas) {
                //         var screenshot = new Screenshot(canvas);
                //         document.body.appendChild(canvas);
                //         window.open(canvas.toDataURL());
                //     },
                //     width: svgElem.width(),
                //     height: svgElem.height()
                // });
            }

        });

    });