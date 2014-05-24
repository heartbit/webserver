define('bignumber', ['config', 'FormatUtils', 'd3', 'moment'], function(config, FormatUtils, d3) {

    function BigNumber(el) {
        var self = this;
        this.el = el;
        this.padding = {
            top: 0,
            bottom: 10,
            left: 0,
            right: 0
        };

        this.width = $(this.el).width();
        this.height = $(this.el).height();

        this.chart = d3.select(this.el).append("svg")
            .attr("class", 'playground')
            .attr("width", this.width)
            .attr("height", this.height);

        this.bigNumber = this.chart.append('text')
            .text('0')
            .attr('opacity', 0)
            .attr('y', function() {
                return self.height - self.padding.bottom;
            });
        this.bigNumber.attr('x', function() {
            var length = self.bigNumber.node().getComputedTextLength();
            return Math.round((self.width - length) / 2);
        });
        this.addLoader();
    };

    BigNumber.prototype.calculateY = function() {
        return this.height - this.padding.bottom;
    };

    BigNumber.prototype.render = function(params) {
        var self = this;

        if (!this.validate(params.value)) {
            this.addLoader();
            return;
        }

        this.initValue = this.value || 0;
        this.trend = params.trend || false;
        this.reset = params.reset || false;
        this.value = params.value;
        this.unit = params.unit || this
        this.delay = params.delay || 0;
        this.duration = params.duration || 0;
        this.type = params.type || this.type;
        this.fontSize = params.fontSize || this.fontSize || "20px";

        this.removeLoader();
        this.bigNumber.transition()
            .delay(self.delay)
            .duration(self.duration)
            .attr('opacity', 1)
            .attr('font-size', self.fontSize)
            .tween("text", function(d) {
                var i = d3.interpolate(self.initValue, self.value);
                return function(t) {
                    this.textContent = self.valueToLabel(i(t));
                    self.bigNumber.attr('x', function() {
                        var length = self.bigNumber.node().getComputedTextLength() + 5;
                        return Math.round((self.width - length) / 2);
                    });
                };
            });
        if (this.trend) {
            this.addTrend();
        }
    };

    BigNumber.prototype.validate = function(value) {
        return _.isNumber(value) && !_.isNaN(value);
    };

    BigNumber.prototype.addTrend = function() {
        var self = this;
        var delay = this.delay + this.duration;
        var fadeInfadeOutDuration = 600;

        if (this.trendSvg) {
            this.trendSvg.transition().duration(fadeInfadeOutDuration / 2).attr('opacity', 0);
            if (this.reset) return;
        } else {
            this.trendSvg = this.chart.append('text')
                .attr('y', function() {
                    return self.height - self.padding.bottom;
                })
                .text('')
                .attr('font-size', self.fontSize)
                .attr('class', 'trend');
        }

        var symbol = "";
        if (this.value > this.initValue && this.initValue != 0) {
            symbol = "+";
        }
        if (this.value < this.initValue && this.initValue != 0) {
            symbol = "-";
        }

        this.trendSvg.transition()
            .delay(delay + fadeInfadeOutDuration / 2).duration(fadeInfadeOutDuration / 2)
            .attr('x', function() {
                var length = self.bigNumber.node().getComputedTextLength() + 5;
                return Math.round((self.width + length) / 2);
            })
            .text(symbol)
            .attr('opacity', 1);
    };

    BigNumber.prototype.valueToLabel = function(raw) {
        var formattedlabel = raw;
        switch (this.type) {
            case "price":
                formattedlabel = FormatUtils.formatPrice(raw, this.unit);
                break;
            case "short":
                formattedlabel = FormatUtils.formatValueShort(raw);
                break;
            case "volume":
                formattedlabel = FormatUtils.formatItem(raw, this.unit);
                break;
            case "timestamp":
                formattedlabel = FormatUtils.formatTime(raw, 'timestamp');
                break;
            case "second":
                formattedlabel = FormatUtils.formatTime(raw, 'second');
                break;
            case "ago":
                formattedlabel = "(" + FormatUtils.formatAgo(raw, this.unit) + ")";
                break;
            case "percent":
                formattedlabel = FormatUtils.formatPercent(raw);
                break;
            default:
                formattedlabel = FormatUtils.formatValue(raw, 2);
        }

        return formattedlabel;
    };

    BigNumber.prototype.addLoader = function() {
        // $(this.el).addClass('loading');
        // this.chart.attr('opacity', 0);
    };

    BigNumber.prototype.removeLoader = function() {
        // $(this.el).removeClass('loading');
        // this.chart.attr('opacity', 1);
    };

    return BigNumber;

});