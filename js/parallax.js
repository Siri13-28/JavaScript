//if (isDevice()) {
//    document.addEventListener('wheel', handleWheelScroll, { passive: false });
//}
//function isDevice() {
//    return /Windows/i.test(navigator.userAgent);
//}
//function handleWheelScroll(event) {
//    const c = Math.sign(event.deltaY);
//    const d = event.d;
//    const b = d === 1 ? event.deltaY * 200 : 250;
//    event.preventDefault();
//    smoothScroll(document.scrollingElement || document.documentElement, b * c);
//}
//function smoothScroll(a, b) {
//    const start = a.scrollTop;
//    const end = start + b;
//    const duration = 500;
//    let st;
//    function inits(ts) {
//        if (!st) st = ts;
//        const p = Math.min((ts - st) / duration, 1);
//        const ep = easeOutCubic(p);
//        a.scrollTop = start + (end - start) * ep;
//        if (p < 1) {
//            requestAnimationFrame(inits);
//        }
//    }
//    requestAnimationFrame(inits);
//}
//function easeOutCubic(t) {
//    return 1 - Math.pow(1 - t, 3);
//}

// add scroll class to over-parallax
$(document).ready(function () {
    $(window).scroll(function () {
        const e = $(window).width(); $(".parallax-item").each(function () {
            const n = $(this), r = n.find(".over-parallax"), o = $(window).scrollTop(), i = n.offset().top, s = n.height(), l = n.offset().top - n.height();
            let topValue;
            if (e <= 767.9) {
                let t, l = i;
                if (l < o + $(window).height() + s && l + s > o) {
                    const s = (o - i) / s;
                    t = -22 + s * 30;
                    topValue = Math.max(-22, Math.min(t, 8));
                }
            } else {
                if (l < o + $(window).height() + s && l + s > o) {
                    let t = (o - l) / s;
                    topValue = -12 + t * 20;
                    topValue = Math.max(-12, Math.min(topValue, 8));
                }
            }
            r.css("top", topValue + "%");
        });
    });
});