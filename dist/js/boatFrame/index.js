webpackJsonp([2],{

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var video = __webpack_require__(42);

video();

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var com = __webpack_require__(1);
var cfg = __webpack_require__(0);
var ZT = __webpack_require__(2);

var carInfo = __webpack_require__(11);
var shipInfo = __webpack_require__(12);

function main() {

    $('.J_video_select').each(function () {
        $(this).find('li').each(function () {
            var ind = $(this).index();
            var leftPx = ind * 60;
            $(this).css('left', leftPx + 'px');
        });
    });

    var videoMenuLen = $('.J_video_select li').length;
    var scrollTag = $('.J_video_select').attr('scrollTag');
    var tagUlMarL = 0;

    $('.J_scroll_r').on('click', function () {
        if (scrollTag < videoMenuLen - 7) {
            $(".J_video_select").animate({ marginLeft: tagUlMarL - 50 + 'px' });
            tagUlMarL -= 50;
            $('.J_video_select').attr('scrollTag', scrollTag++);
        }
    });

    $('.J_scroll_l').on('click', function () {
        if (scrollTag > 0) {
            $(".J_video_select").animate({ marginLeft: tagUlMarL + 50 + 'px' });
            tagUlMarL += 50;
            $('.J_video_select').attr('scrollTag', scrollTag--);
        }
    });

    var shipLineInd = 1;
    var shipNo = '';

    $('.J_video_select').on('click', 'li', function () {

        var _this = $(this);
        var ind = _this.index();
        if (ind > 10) {
            ind = 1;
        }

        shipLineInd = ind + 1;
        $('#J_shipLine').html('<img src="../../theme/default/images/plenary/shipLine' + shipLineInd + '.png">');

        var lenLi = $(this).parents('ul').find('li').length;
        for (var i = 0; i < lenLi; i++) {
            $(this).parents('ul').find('li').eq(i).css('z-index', lenLi - i);
        }
        $(this).css('z-index', 100);
        $(this).addClass('cur').siblings('li').removeClass('cur');

        var videoInd = ind;

        // $('#J_video source.mp').attr('src','http://121.31.41.93:18080/staticVideo/testVideo/test.mp4');
        // $('#J_video source.web').attr('src','http://121.31.41.93:18080/staticVideo/testVideo/test.webm');
        // $('#J_video source.og').attr('src','http://121.31.41.93:18080/staticVideo/testVideo/test.ogg');
        // $('#J_video source.og').attr('src','http://121.31.41.93:18080/staticVideo/testVideo/test.flv');
        // if(videoInd>4){
        //     videoInd=ind-5;
        //     $('#J_video source').attr('src','http://vjs.zencdn.net/v/oceans.mp4');
        // }else if(videoInd>9){
        //     videoInd=ind-10;
        // }
        var hoursNow = new Date().getHours();
        if (hoursNow > 6 && hoursNow < 19) {
            $('#J_video').attr('src', 'http://121.31.41.93:18080/staticVideo/ship' + videoInd + '.mp4');
        } else {
            $('#J_video').attr('src', 'http://121.31.41.93:18080/staticVideo/n-ship' + videoInd + '.mp4');
        }
        var myVid = document.getElementById("J_video");
        myVid.muted = true;

        myVid.load();

        //console&&console.log.log($(this).parent().attr('videoType'));

        if ($(this).parent().attr('videoType') == 'car') {
            // getCar(_this);
        }

        if ($(this).parent().attr('videoType') == 'boat') {
            getBoat(_this);
        }

        ZT.delete('timeCarBoat');
        ZT.register({
            name: 'timeCarBoat',
            step: 0,
            // stepReapte:86400,//1天更新一次
            stepReapte: 1, //1秒更新一次
            handle: function handle() {
                // getCar(_this);
                getBoat(_this);
            }
        });

        function getCar(_this) {
            com.data({
                url: cfg.get('carVideoInfo'),
                data: {
                    "num": parseFloat(_this.attr('tagInd')) + 1
                }
            }).done(function (json) {
                // console.log(json);
                var arr = [];
                arr.push(json.data);

                var html = carInfo(arr);
                // console.log(html);
                $('#J_car_temp').html(html);
            });
        }

        function getBoat(_this) {
            // console.log(parseFloat(_this.attr('tagInd'))+1+'boat');
            com.data({
                url: cfg.get('shipVideoInfo'),
                data: {
                    "num": parseFloat(_this.attr('tagInd')) + 1
                }
            }).done(function (json) {
                var arr = [];
                arr.push(json.data);

                var dataShipNo = json.data.licensePlate_collection;
                if (dataShipNo != shipNo) {
                    if (shipLineInd < 8) {
                        shipLineInd++;
                    } else {
                        shipLineInd = 0;
                    }
                    shipNo = dataShipNo;
                    $('#J_shipLine').html('<img src="../../theme/default/images/plenary/shipLine' + shipLineInd + '.png">');
                }

                var html = shipInfo(arr);
                // console.log(html);
                $('#J_boat_temp').html(html);
            });
        }

        // var obj = document.getElementById("DPSDK_OCX");
        // var  szCameraId=$(this).attr('szCameraId');
        // var nStreamType = 1;
        // var nMediaType = 1;
        // var nTransType = 1;

        // var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
        // ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType), "播放视频");
    });

    $('.J_video_select li:first').trigger('click');

    // ButtonLogin_onclick();
    // // $('#buttonLogin').trigger('click');

    // setTimeout(function(){
    //         $('#buttonStartRealplayByWndNo').trigger('click');
    //     },2000);
    // setTimeout(function(){
    //         $('#buttonLogin2').trigger('click');
    //         $('#buttonStartRealplayByWndNo2').trigger('click');
    //     },2500);
}

module.exports = main;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

},[41]);