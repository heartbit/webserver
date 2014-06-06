define('bignumber', ['config', 'FormatUtils', 'd3', 'moment'], function(config, FormatUtils, d3) {

    function BigNumber(el, options) {
        this.el = el;

        this.options = options;
        // this.firstDraw = false;
        
        if (options && options.trend && options.trend.before) {
            $(this.el).append('<span class="trend"><span>');
        }

        this.$bigvalue = d3.select(this.el)
            .append('span')
            .attr('class', 'bigvalue');

        if (options && options.trend && options.trend.after) {
            $(this.el).append('<span class="trend"><span>');
        }

        this.$trend = $(this.el).children('.trend');

        this.addLoader();
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
        this.unit = params.unit || this.unit;
        this.delay = params.delay || 0;
        this.duration = params.duration || 0;
        this.type = params.type || this.type;
        this.fontSize = params.fontSize || this.fontSize || "20px";

        this.removeLoader();
        this.$bigvalue.transition()
            .delay(self.delay)
            .duration(self.duration)
            .attr('opacity', 1)
            .attr('font-size', self.fontSize)
            .tween("text", function(d) {
                var i = d3.interpolate(self.initValue, self.value);
                return function(t) {
                    this.textContent = self.valueToLabel(i(t));
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
        this.$trend.removeClass();

        var trendclass;
        // if (this.options.trend.before) {
        //     trendclass = "icon-left-dir";
        // } else {
        //     trendclass = "icon-right-dir";
        // }
        if (this.value >= this.initValue && this.initValue != 0) {
            trendclass = "icon-up-dir";
        }
        if (this.value < this.initValue && this.initValue != 0) {
            trendclass = "icon-down-dir";
        }
        this.$trend.addClass(trendclass);
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
        $(this.el).addClass('icon-spin4');
    };

    BigNumber.prototype.removeLoader = function() {
        $(this.el).removeClass('icon-spin4');
    };

    return BigNumber;

});