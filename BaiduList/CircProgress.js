/**
 * Created by sanchez on 16/4/13.
 */
'use strict';
/*
 圆形进度条类
 @x y radius 进度条的中心点位置及半径
 @circBgName 圆形进度条颜色图片key
 @circBgpName  圆形进度条缺少部分颜色图片key
 @
 */
function CircProgress(_game, x, y, radius, circBgName, circBgpName) {
    Phaser.Sprite.call(this, _game, x, y);

    this.origX = x;
    this.origY = y;
    this.radius = radius;

    this.game = _game;
    this.anchor.setTo(0.5);

    // this.circ_bg=this.game.make.sprite(0,0);
    // this.addChild(this.circ_bg);

    this._mask = this.game.add.graphics(radius, radius);

    this._mask.beginFill(0xff0000);
    // arc(cx, cy, radius, startAngle, endAngle, anticlockwise, segments)
    this._mask.arc(this.origX - radius, this.origY - radius, radius, 0, 2 * Math.PI);
    this._mask.endFill();
    this.mask = this._mask;

    this._mask.clear();
    // _mask.anchor.setTo(0.5);

    this.loader_c_p = this.game.make.sprite(0, 0, 'loader_c_p');
    this.loader_c_p.alpha = 0;
    this.addChild(this.loader_c_p);
    return this;
};


CircProgress.prototype = Object.create(Phaser.Sprite.prototype);
CircProgress.prototype.constructor = CircProgress;


CircProgress.prototype.drawCirc = function(progress) {
    this._mask.beginFill(0xff0000);
    if (progress > 25) {
        // this.loader_c_p.aphla=1;
    }
    this._mask.arc(this.origX - this.radius, this.origY - this.radius, this.radius, 0, this.game.math.degToRad(-360 * progress / 100.0), true)
    this._mask.endFill();

};
module.exports = CircProgress;