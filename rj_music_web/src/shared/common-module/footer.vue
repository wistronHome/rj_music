<template>
    <div class="footer-wrap">
        <div class="btns">
            <a class="prev" title="上一首(ctrl+←)">上一首</a>
            <a class="j-flag" :class="playBtnClass" @click="playBtnClick()" title="播放/暂停(p)">播放/暂停</a>
            <a class="next" title="下一首(ctrl+→)">下一首</a>
        </div>
        <div class="head">
            <img width="34" height="34" src="http://p1.music.126.net/FZ0nOEQnG7IpyVD53gvWtQ==/7884597883552529.jpg?param=34y34">
            <a class="mask"></a>
        </div>
        <div class="play-area">
            <div class="words">
                <a class="name" @click="routerToSong(music._id)">{{music ? music.name : '-'}}</a>
                <a class="mv" title="MV"></a>
                <span class="by">
                    <span title="Ruth B">
                        <a>{{music ? music.singer : '-'}}</a>
                    </span>
                </span>
            </div>
            <div class="m-pbar">
                <div id="progress" @mousedown.left="changeProgress($event)" class="barbg">
                    <div class="rdy" style="width: 80%"></div>
                    <div class="cur" :style="{width: progress + '%'}">
                        <span class="btn"></span>
                    </div>
                </div>
                <span class="j-flag time"><em>{{currentTime}}</em> / <em>{{totalTime}}</em></span>
            </div>
        </div>
        <div class="operation">
            <a href="javascript:;" class="icn icn-add" title="收藏">收藏</a>
            <a href="javascript:;" class="icn icn-share" title="分享">分享</a>
        </div>
        <div class="control">
            <div v-show="isVolShow" class="m-vol">
                <div class="barbg"></div>
                <div id="volume" @mousedown.left="changeVolumn($event)" class="vbg">
                    <div class="curr" :style="{ 'height': volHeight + '%' }"></div>
                    <span class="btn" :style="{ 'top': 93 * (100 - volHeight) / 100 + 'px' }"></span>
                </div>
            </div>
            <a @click="isVolShow = !isVolShow" class="icn icn-vol"></a>
            <a @click="changeCircleType" class="icn" :class="circleCls" :title="circleTitle"></a>
            <span class="add">
                <a title="播放列表" class="icn-list">1</a>
            </span>
            <div class="tip" style="display: none" >循环</div>
        </div>
        <audio v-if="musicSrc" ref="audio" controls="controls" style="display: none;"
            @timeupdate="handleTimeupdate"
            @ended="handleEnded"
            @canplay="handleCanPlay">
            <source :src="musicSrc" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
        <!-- <rj-player :emit="emit"></rj-player> -->
    </div>
</template>

<script type="text/ecmascript-6">
import player from "./player.vue";
import Vue from "vue";
import { setTimeout } from 'timers';
let _clientY = 0,
    _clientX = 0,
    _volumn,
    _volumeHeight = 0,
    _progress = 0,
    _progressWidth = 0;
export default {
    data() {
        return {
            emit: new Vue(),
            playerInfo: {
                paused: true,
                voice: 60,
                currentTime: 0,
                duration: 0,
                circleStyle: 0
            },
            addressIp: null,
            music: {},
            progress: 0,
            paused: true,
            volume: parseFloat(localStorage.getItem('__volume') || 0.5),
            duration: 0,
            isVolShow: false, // 控制音乐显示隐藏
            circleType: parseFloat(localStorage.getItem('__circleType') || 0),  // 0，列表循环 1,单曲循环 2,随机播放
            cTime: 0,
            currentTime: '00:00'
        }
    },
    components: {
        'rj-player': player
    },
    created() {
        this.$userService.getAddressIp().then(result => {
            this.addressIp = result.data;
        });

    },
    mounted() {
        if (this.$refs.audio) {
            this.$refs.audio.volume = this.volume;
        }
    },
    computed: {
        musicSrc() {
            let _cs = this.$store.getters.currentSong;
            this.music = _cs;
            setTimeout(() => {
                this.$refs.audio.load();
                this.playBtnClick();
            }, 100);
            return _cs ? `http://${this.addressIp}:3000/${_cs.src.replace('public/', '')}` : null;
        },
        playBtnClass() {
            return this.paused ? 'pause' : 'play';
        },
        totalTime() {
            let m = Math.trunc(this.duration / 60);
            let s = Math.trunc(this.duration - m * 60);
            return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
        },
        // currentTime() {
        //     let m = Math.floor(this.cTime / 60);
        //     let s = Math.floor(this.cTime - m * 60);
        //     return (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
        // },
        volHeight() {
            return this.volume * 100;
        },
        circleCls() {
            return 'icn-' + (this.circleType === 0 ? 'loop' : this.circleType === 1 ? 'shuffle' : 'one');
        },
        circleTitle() {
            return this.circleType === 0 ? '列表循环' : this.circleType === 1 ? '随机播放' : '单曲循环';
        }
    },
    methods: {
        routerToSong(id) {
            this.$router.push({path: '/song', query: { id }})
        },
        playBtnClick() {
            this.paused = !this.paused;
            this.$refs.audio[this.paused ? 'pause' : 'play']();
        },
        /**
         * @description 音量事件起点
         */
        changeVolumn(event) {
            let clsName = event.target.className;
            _volumeHeight = document.getElementById('volume').clientHeight;
            if (clsName === 'vbg') {
                this.volume = 1 - event.offsetY / _volumeHeight;
            } else if (clsName === 'curr') {
                this.volume = (event.target.clientHeight - event.offsetY) / _volumeHeight;
            } else {
                // keydown在圆圈上  不做处理
            }
            _clientY = event.clientY; // 记录初始高度
            _volumn = this.volume;  // 记录改变后的音量
            // 点击音量条上 鼠标不松开  也要拖拽
            document.addEventListener('mousemove', this._handleMouseMove);
            document.addEventListener('mouseup', this._handleMouseUp);
        },
        /**@description mousemove处理音量事情 */
        _handleMouseMove(event) {
            let _height = event.clientY - _clientY;
            if (_height < 0) {
                if (Math.abs(_height) < _volumeHeight * (1 - _volumn)) {
                    this.volume = _volumn + Math.abs(_height) / _volumeHeight;
                } else {
                    this.volume = 1;
                }
            } else {
                if (_height < _volumeHeight * _volumn) {
                    this.volume = _volumn - Math.abs(_height) / _volumeHeight;
                } else {
                    this.volume = 0
                }
            }
            localStorage.setItem('__volume', this.volume);
        },
        _handleMouseUp() {
            if (_progress) {
                this.$refs.audio.currentTime = this.progress / 100 * this.duration;
            }
            _progress = 0;
            document.removeEventListener('mousemove', this._handleMouseMove);
            document.removeEventListener('mousemove', this._handleProgressMove);
            document.removeEventListener('mouseup', this._handleMouseUp);
        },
        changeProgress(event) {
            _progressWidth = document.getElementById('progress').clientWidth;
            if (event.target.className !== 'btn') {
                this.$refs.audio.currentTime = event.offsetX / _progressWidth * this.duration;
            } else {
                _clientX = event.clientX;
                _progress = this.progress;
                document.addEventListener('mousemove', this._handleProgressMove);
                document.addEventListener('mouseup', this._handleMouseUp);
            }
        },
        _handleProgressMove(event) {
            let _width = event.clientX - _clientX;
            if (_width < 0) {
                if (Math.abs(_width) < _progress / 100 * _progressWidth) {
                    this.progress = _progress - Math.abs(_width) / _progressWidth * 100;
                } else {
                    this.progress = 0;
                }
            } else {
                if (_width < (100 - _progress) / 100 * _progressWidth) {
                    this.progress = _progress + _width / _progressWidth * 100;
                } else {
                    this.progress = 100;
                }
            }
            let _cur = this.progress * this.duration / 100;
            let m = Math.floor(_cur / 60);
            let s = Math.floor(_cur - m * 60);
            this.currentTime = (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
        },
        handleCanPlay(event) {
            this.duration = Math.trunc(event.target.duration);
            this.$refs.audio.volume = this.volume;
        },
        handleTimeupdate(event) {
            this.cTime = event.target.currentTime;
        },
        handleEnded(event) {
            this.paused = true;
        },
        changeCircleType() {
            this.circleType = ++this.circleType % 3;
            localStorage.setItem('__circleType', this.circleType);
        }
    },
    watch: {
        volume(cur) {
            if (this.$refs.audio) {
                this.$refs.audio.volume = cur;
            }
        },
        cTime(cur) {
            if (!_progress) {
                this.progress = cur / this.duration * 100;
                let m = Math.floor(cur / 60);
                let s = Math.floor(cur - m * 60);
                this.currentTime = (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$playbar = "../../assets/playbar.png";
$statbar = "../../assets/statbar.png";
$iconall = "../../assets/iconall.png";
.footer-wrap {
    position: absolute;
    left: 50%;
    top: 6px;
    z-index: 15;
    width: 980px;
    height: 47px;
    margin: 0 auto;
    margin-left -490px;
    .btns {
        width: 137px;
        padding: 6px 0 0 0;
        float left;
        a {
            display: block;
            float: left;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            margin-top: 5px;
            text-indent: -9999px;
            background-position: 0 0;
            background url($playbar) no-repeat;
        }
        .prev {
            background-position: 0 -130px;
            &:hover {
                background-position: -30px -130px;
            }
        }
        .play, .pause {
            width: 36px;
            height: 36px;
            margin-top: 0;
        }
        .pause {
            background-position: 0 -204px;
            &:hover {
                background-position: -40px -204px;
            }
        }
        .play {
            background-position: 0 -165px;
            &:hover {
                background-position: -40px -165px;
            }
        }
        .next {
            background-position: -80px -130px;
            &:hover {
                background-position: -110px -130px;
            }
        }
    }
    .head {
        position: relative;
        margin: 6px 15px 0 0;
        width: 34px;
        height: 34px;
        float left;
        .mask {
            position: absolute;
            top: 0px;
            left: 0px;
            display: block;
            width: 34px;
            height: 35px;
            background: url($playbar) no-repeat 0 9999px;
            background-position: 0 -80px;
        }
    }
    .play-area {
        position: relative;
        width: 608px;
        float left
        * {
            user-select none
        }
        .words {
            height: 28px;
            overflow: hidden;
            color: #e8e8e8;
            text-shadow: 0 1px 0 #171717;
            line-height: 28px;
            .name {
                max-width 300px
                color #e8e8e8
                font-size 12px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                word-wrap normal
                float left
                &:hover {
                    text-decoration underline
                }
            }
            .mv {
                width: 19px;
                height: 17px;
                float left;
                margin: 6px 0 0 3px;
                background url($playbar) no-repeat
                background-position: 0 -57px;
                &:hover {
                    background-position: -20px -57px;
                }
            }
            .by {
                max-width: 220px;
                margin-left: 15px;
                color: #9b9b9b;
                float left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                a {
                    color #9b9b9b;
                    font-size 12px
                    &:hover {
                        text-decoration underline
                    }
                }
            }
        }
        .m-pbar {
            width 493px;
            position relative
            .barbg {
                height 9px
                // width 487px
                background url($statbar) no-repeat 0 9999px
                background-position right 0
                .rdy {
                    height 9px
                    background url($statbar) no-repeat 0 9999px
                    background-position right -30px
                }
                .cur {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 1%;
                    height 9px;
                    background url($statbar) no-repeat 0 9999px
                    background-position: left -66px;
                    .btn {
                        position: absolute;
                        top: -7px;
                        right: -11px;
                        width: 22px;
                        height: 24px;
                        margin-left: -11px;
                        background: url($iconall ) no-repeat;
                        background-position: 0 -250px;
                    }
                }
            }
            .time {
                position: absolute;
                top: -6px;
                right: -84px;
                color: #797979;
                text-shadow: 0 1px 0 #121212;
                em {
                    color #a1a1a1;
                    font-style: normal;
                    text-align: left;
                    font-size: 12px;
                }
            }
        }
    }
    .operation {
        float left
        width 60px;
        .icn {
            background url($playbar) no-repeat 0 9999px
            float: left;
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
        }
        .icn-add {
            background-position: -88px -163px;
            &:hover {
                background-position: -88px -189px;
            }
        }
        .icn-share {
            background-position: -114px -163px;
            &:hover {
                background-position: -114px -189px;
            }
        }
    }
    .control {
        float left
        position: relative;
        z-index: 10;
        padding-left: 13px;
        background: url($playbar) no-repeat 0 9999px;
        background-position: -147px -238px;
        .m-vol {
            position: absolute;
            top: -113px;
            left: 9px;
            clear: both;
            width: 32px;
            height: 113px;
            .barbg {
                position: absolute;
                top: 0;
                left: 0;
                width: 32px;
                height: 113px;
                background url($playbar) no-repeat 0 9999px
                background-position: 0 -503px;
            }
            .vbg {
                position: absolute;
                padding 0
                top: 12px;
                left: 14px;
                width: 4px;
                height: 93px;
                .curr {
                    position absolute
                    top: auto;
                    bottom: 0px;
                    left: 0;
                    width 4px
                    background url($playbar) no-repeat 0 9999px
                    background-position: -40px bottom;
                    overflow: hidden
                }
                .btn {
                    position: absolute;
                    top: 0;
                    margin-top -9px
                    left: -7px;
                    display: block;
                    width: 18px;
                    height: 20px;
                    background url($iconall) no-repeat
                    background-position: -40px -250px;
                    cursor: pointer;
                }
            }
        }
        .icn {
            float: left;
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
            background url($playbar) no-repeat 0 9999px
        }
        .icn-vol {
            background-position: -2px -248px;
            &:hover {
                background-position: -31px -248px;
            }
        }
        .icn-loop {
            background-position: -3px -344px;
            &:hover {
                background-position: -33px -344px;
            }
        }
        .icn-shuffle {
            background-position: -66px -248px;
            &:hover {
                background-position: -93px -248px;
            }
        }
        .icn-one {
            background-position -66px -344px
            &:hover {
                background-position: -93px -344px;
            }
        }
        .add {
            float: left;
            width: 59px;
            height: 36px;
            position relative
            zoom 1
            .tip {
                position: absolute;
                top: -51px;
                left: -65px;
                clear: both;
                width: 152px;
                height: 49px;
                background url($playbar) no-repeat 0 9999px
                background-position: 0 -287px;
                text-align: center;
                color: #fff;
                line-height: 37px;
            }
            .icn-list {
                display: block;
                float: none;
                width 60px
                padding-left: 21px;
                line-height: 27px;
                text-align: center;
                color: #666;
                text-shadow: 0 1px 0 #080707;
                text-indent: 0;
                text-decoration: none;
                height: 25px;
                margin: 11px 2px 0 0;
                background url($playbar) no-repeat 0 9999px
                background-position: -42px -68px;
            }
        }
    }
}
</style>
