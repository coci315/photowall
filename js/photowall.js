!function($){
    var Photowall = function(cfg) {
        // 默认选项
        this.cfg = {
            parent: document.body,
            parentWidth:1120,
            imgs:[],
            words:'CATS'
        };
        // 扩展自定义选项
        $.extend(this.cfg,cfg);
        // 标志位，用来判断showPhoto方法是否执行完
        this.flag = true;
        // 默认宽度28*40 = 1120
        this.width = 1120;
        this.imgs = this.cfg.imgs.slice(0);
        // this.storage = [];
        // 容器节点
        this.dom = $('<div class="photowall"></div>');
        // 初始化
        this.init();
        // 插入到页面中
        this.cfg.parent.append(this.dom);
        // 初始化事件
        this.initEvent();
    };

    $.extend(Photowall.prototype,{
        // 存放文字对应点位的index值
        words:{
            'CATS':[34, 33, 32, 59, 87, 115, 144, 145, 146, 39, 66, 93, 121, 149, 95, 68, 97, 125, 153, 44, 45, 46, 73, 101, 129, 157, 52, 51, 50, 77, 105, 106, 107, 108, 136, 163, 162, 161],
            'LETitGO':[29, 57, 85, 113, 141, 142, 143, 33, 34, 35, 61, 89, 117, 145, 146, 147, 90, 37, 38, 39, 66, 94, 122, 150, 41, 97, 125, 153, 43, 71, 99, 127, 155, 156, 70, 72, 48, 52, 53, 79, 107, 135, 164, 165, 82, 110, 138, 47, 74, 102, 130, 159, 160, 161, 133, 104, 105, 158],
            'HELLO!':[30, 58, 86, 114, 142, 87, 88, 89, 61, 33, 117, 145, 35, 36, 37, 38, 63, 91, 119, 147, 148, 149, 150, 92, 93, 40, 68, 96, 124, 152, 153, 154, 44, 72, 100, 128, 156, 157, 158, 49, 50, 76, 104, 132, 161, 162, 79, 107, 135, 53, 81, 109, 165]
        },
        // 根据点位数从图片里随机抽取需要的图片数量
        getPhotos: function(dots) {
            var arr = [];
            this.keys = this.imgs.slice(0);
            for(var i = 0,len = dots.length;i < len;i++) {
                var r = Math.floor(Math.random()*this.keys.length);
                arr.push(this.keys[r]);
                this.keys.splice(r,1);
            }
            return arr;
        },
        // 初始化,容器中插入span及img节点
        init: function(){
            var that = this;
            this.dom
                .css({
                    width: that.width
                })
                .append(new Array(28 * 7 + 1).join("<span><img></span>"));
            
        },
        // 初始化事件
        initEvent: function() {
            var that = this;
            // 自适应
            $(window).on('resize',function(){
                var rate = that.dom.parent().width() / that.cfg.parentWidth;
                that.dom.css({
                    'transform':'scale(' + rate + ')',
                    '-ms-transform':'scale(' + rate + ')',
                    '-moz-transform':'scale(' + rate + ')',
                    '-webkit-transform':'scale(' + rate + ')',
                });
            }).trigger('resize');

            // 获取dots点位
            // this.dom.on('click','span',function(){
            //     var index = $(this).index();
            //     $(this).toggleClass('red');
            //     if(that.storage.indexOf(index) > -1) {
            //         that.storage.splice(that.storage.indexOf(index),1);
            //     } else {
            //         that.storage.push(index);
            //     }
            //     console.log(that.storage);
            // });
        },
        // 展示照片
        // words:显示对应的文字，传入一个指定的字符串
        // random：是否按随机属性显示文字，传入true或false
        showPhoto: function(words,random) {
            var that = this;
            // 标志位为false则直接退出
            if(!this.flag) return;
            this.flag = false;
            // 清空之前的img节点，换入新的空img节点
            $('img').replaceWith($('<img>'));
            // 用来计数以判断是否所有的span节点都执行完
            var count = 0;
            var spans = this.dom.find('span');
            words = words || this.cfg.words;
            var dots = this.words[words].slice(0);
            var photos = this.getPhotos(dots);
            var temp = [];
            if(random) {
                while(dots.length) {
                    var r = Math.floor(Math.random()*dots.length);
                    temp.push(dots[r]);
                    dots.splice(r,1);
                }
            } else {
                temp = dots;
            }
            $.each(temp,function(index,item){
                var photo = photos[index];
                var span = $(spans.get(item));
                setTimeout(function(){
                    span.css({backgroundColor:'#f96a35'});
                },index*30);
                setTimeout(function(){
                    span
                        .css({backgroundColor:'#fff'})
                        .find('img')
                        .attr('src',photo)
                        .css({width:'100%',height:'100%'})
                        .fadeIn();
                        count++;
                        // count等于temp.length，则全部span都已经执行完
                        if(count == temp.length){
                            that.flag = true;
                        }
                },(temp.length*2 - index)*30);
            });
        },
    });

    window.Photowall = Photowall;
}(jQuery);