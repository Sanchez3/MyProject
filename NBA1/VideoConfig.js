/**
 * Created by daimons on 15/12/19.
 */

'use strict';

/*

 视频序列帧配置类
 @filepath 路径
 @prefix 前缀
 @postfix 后缀
 @start 序列帧素材开始索引
 @end  序列帧素材结束索引
 @frameWidth 帧宽度
 @frameHeight 帧高度
 @frames 每张图片所包含的总帧数
 @totalFrame 视频总帧数
 @frameRate 帧速率 每秒多少帧

 */


function VideoConfig(game, filepath, prefix, postfix, start, end, frameWidth, frameHeight, frames, totalFrame, frameRate) {
    this.game = game;
    this.frameWidth = frameWidth || 320;
    this.frameHeight = frameHeight || 569;
    this.frames = frames || 9;
    this.frameRate = frameRate || 15;

    this.filepath = filepath;
    this.prefix = prefix;
    this.postfix = postfix;
    this.start = start;
    this.end = end;
    this.totalFrame = totalFrame;
}


VideoConfig.prototype = {
    preload: function() {
        for (var i = this.start; i <= this.end; i++) {
            var nFrame = this.frames;
            if (i == this.end) { //最后一张图片计算剩余帧数
                nFrame = this.totalFrame % this.frames;

            }
            this.game.load.spritesheet(this.prefix + i, this.filepath + this.prefix + i + this.postfix, this.frameWidth, this.frameHeight, nFrame);
        }
    },
    getStartIndex: function() {
        return this.start;
    }
};


module.exports = VideoConfig;