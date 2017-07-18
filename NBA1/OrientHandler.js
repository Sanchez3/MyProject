/**
 * Created by sanchez on 16/5/13.
 */
var OrientHandler = {
    bind: function() {
        var that = this;
        if (window.DeviceOrientationEvent) {
            // $win.bind('deviceorientation',orientationHandler)
            window.addEventListener("deviceorientation", that.orientationListener, false);
        }
    },
    unbind: function() {
        var _this = this;
        if (window.DeviceOrientationEvent) {
            // $win.bind('deviceorientation',orientationHandler)
            window.removeEventListener("deviceorientation", that.orientationListener);
        }
    },
    orientationListener: function(evt, obj, objx) {
        var gamma = evt.gamma;
        var beta = evt.beta;
        if (this._lastGamma != gamma || this._lastBeta != beta) {
            //TweenMax
            TweenMax.to(obj, 0.2, { x: objx + gamma / 45 * 40 });

            // TweenMax.to(obj, 0.1, {x: 480 + gamma / 45 * 40 * 1.1});

            this._lastGamma = gamma;
            this._lastBeta = beta;

        }
    }
};