/**
 * Created by sanchez on 16/3/8.
 */

'use strict';
//,fillColor,strokeColor,pointColor,pointStrokeColor,data
function RadarChart(game,_x,_y,radar_data){
    this.game = game;
    this._x = _x;
    this._y = _y;
    //this._width = _width;
    //this._height = _height;



    Phaser.Sprite.call(this, this.game, this._x, this._y);


    var r_bg=this.game.make.sprite(0,0,'radarchart');
    var r_t=this.game.make.sprite(214,284,'radar_t1');
    var r_i=this.game.make.sprite(169,134,'radar_i1');

    this.addChild(r_bg);
    this.addChild(r_t);
    this.addChild(r_i);


    var score_txt =this.game.add.bitmapText(300, 267, 'score_font','88',120);

    score_txt.anchor.setTo(0.5);
    this.addChild(score_txt);


    //#c3e8ff   rgba(195, 232, 255, 0.15);
    var graphics = game.add.graphics(170,215);
    // set a fill and line style
    graphics.beginFill(0xc3e8ff);
    graphics.lineStyle(0);
    // draw a shape
    graphics.moveTo(this.radarArray[0][radar_data[0]].x,this.radarArray[0][radar_data[0]].y);
    graphics.lineTo(this.radarArray[1][radar_data[1]].x,this.radarArray[1][radar_data[1]].y);
    graphics.lineTo(this.radarArray[2][radar_data[2]].x,this.radarArray[2][radar_data[2]].y);
    graphics.lineTo(this.radarArray[3][radar_data[3]].x,this.radarArray[3][radar_data[3]].y);
    graphics.lineTo(this.radarArray[4][radar_data[4]].x,this.radarArray[4][radar_data[4]].y);
    graphics.endFill();
    graphics.alpha=0.2;




    this.game.add.existing(this);
    return this;

}


RadarChart.prototype = Object.create(Phaser.Sprite.prototype);
RadarChart.prototype.constructor = RadarChart;
RadarChart.prototype.radarArray=[
    //car
    [{x:203,y:6},{x:203,y:43},{x:203,y:85},{x:203,y:128},{x:203,y:171}],
    //gun
    [{x:6,y:150},{x:41,y:162},{x:82,y:175},{x:122,y:188},{x:163,y:201}],
    //wp
    [{x:82,y:383},{x:104,y:352},{x:129,y:317},{x:153,y:283},{x:178,y:248}],
    //suits
    [{x:326,y:383},{x:304,y:352},{x:279,y:317},{x:254,y:283},{x:229,y:248}],
    //bt
    [{x:403,y:150},{x:366,y:162},{x:326,y:175},{x:285,y:188},{x:244,y:201}]
];

module.exports = RadarChart;