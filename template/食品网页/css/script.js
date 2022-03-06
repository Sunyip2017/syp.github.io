window.onload = function() {
    benner('#benner', '.nr', '.imga')

    function benner(parent, controller, mod) {

        var num = 0;
        var controller = $(controller);
        var mod = $(mod);
        var benner = $(parent);
        var autoPlayTime = 1500;
        var imgNum = mod.length - 1;
        var auto;

        autoPlay();
        function $(name) {
            if (name[0] == '#') {
                return document.getElementById(name.substr(1));
            } else if (name[0] == '.') {
                return document.getElementsByClassName(name.substr(1));
            } else {
                return document.getElementsByTagName(name);
            }
        }
        for (var i = 0; i < controller.length; i++) {
            controller[i].index = i;
            controller[i].onmouseover = function() {
                for (var j = 0; j < controller.length; j++) {
                    controller[j].className = 'nr';
                }
                this.className = 'nr active';
                for (var x = 0; x < mod.length; x++) {
                    mod[x].className = 'imga';
                }
                mod[this.index].className = 'imga active';
            }
        }
        benner.onmouseover = function() {
            clearInterval(auto);
        }
        benner.onmouseleave = function() {
            autoPlay();
        }
        function play(num) {
            for (var j = 0; j < controller.length; j++) {
                controller[j].className = 'nr';
            }
            controller[num].className = 'nr active';
            for (var x = 0; x < mod.length; x++) {
                mod[x].className = 'imga';
            }
            mod[num].className = 'imga active';
        }
        function autoPlay() {
            auto = setInterval(function() {
                if (num > imgNum) {
                    num = 0;
                }
                play(num);
                num++;
            }, autoPlayTime)
        }
    }

}
