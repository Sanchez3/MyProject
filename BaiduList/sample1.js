/**
 * Created by Sanchez on 16/4/11.
 */

/*
 利用原型 prototype 与继承，某个类封装
 通过构造函数构造出的新对象，其原型指向构造函数的原型对象。
 */
MyObj = function(_game, x, y, spriteName) {
    Phaser.Sprite.call(this, _game, x, y, spriteName);
    this.origX = x;
    this.origY = y;
    this.game = _game;


    this.title = this.add.sprite(0, 0);
    this.addChild(this.title);
};


MyObj.prototype = Object.create(Phaser.Sprite.prototype);
MyObj.prototype.constructor = MyObj;


MyObj.prototype.myfunction = function() {

};


// eg
var obj1 = new MyObj(game, 0, 0, 'obj_name');
obj1.myfunction();