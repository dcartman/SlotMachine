/**
 * This app is meant to opporate as a slot machine on the d • b web site.
 * 
 * the idea is to have three callout boxes on the bottom of the page
 * with a trigger button that will spin the content of each box for a
 * random period of time and then stop on a one piece of content.
 *
 * The box should be bound to the foloowing rules:
 * 1. Each box will act as and independant wheel, each spinning for a
 *    a unique time period.
 * 2. As a box approaches the end of its spin period it should slow down
 *    easing into the final stop.
 * 3. It should not stop between content types.
 * 4. The content items should continue to rotate to the beginning of the
 *    spin cycle.
 *
 * Requires:
 *     jQuery
 *     jQueryUI
 * 
 * Basic HTML:
 * <div class="slot-machine">
 *     <div class="wheel-housing">
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>  
 *     </div> 
 *     <div class="trigger">
 *         <button type="button">Spin the Wheels</button>
 *     </div>
 * </div>
 *
 * Expected CSS:
 * .slot-machine { position: relative; }
 * .wheel-housing { width: set size; margin: 0px auto; position:relative; }
 * .wheel-housing:after { clear:both; content: "."; display:block; height: 0px; visibility: hidden; }
 * .wheel { float: left; height: set height; overflow: hidden; position: relative; width: set width;
 * .wheel .content {  position: relative; }
 * .trigger {}
 * .trigger button {}
 *
 **/

function SlotMachine(ele, $h) {
    var me = this,
    $h = $h || {};
    this.element = ele;

    for (var p in $h) {
        if (h.hasOwnProperty(p)) this[p] = $h[p];
    }

    this.element.object = this;
    this.wheels = [];

    this.setWheels();
    this.setTrigger();
}

SlotMachine.prototype.setWheels = function() {
    var me = this;
    $(me.element).find(".wheel").each(function(i, wheel) {
        me.wheels.push(new Wheel(wheel));
    });
}

SlotMachine.prototype.setTrigger = function() {
    var me = this;
    $(me.element).find('.trigger').each(function(i, trigger) {
        me.trigger = trigger;
        trigger.object = me;
    }).bind('mouseup', me.initiateSpinCycle);
}

SlotMachine.prototype.initiateSpinCycle = function() {
    var me = this.object;

    me.wheels.forEach(function(wheel) {
        wheel.spin();
    });

};

/* complimentary object to SlotMachine */
function Wheel(ele, $h) {
    var me = this,
    $h = $h || {};
    this.element = ele;

    for (var p in $h) {
        if (h.hasOwnProperty(p)) this[p] = $h[p];
    }
    this.id = Math.random();
    this.element.object = this;
    me.contentItems = [];

    me.getContent();
}

/* This will handle spinning the wheels when the trigger has been pressed */
Wheel.prototype.spin = function() {
    var me = this;
    this.firstContent = this.element.querySelector('.content');
    this.seconds = this.generateRandomTime(10);
    this.spinSpeed = this.generateRandomTime(100);
    this.startTime = Date.now();

    this.spinTimer = window.setInterval(
    function(me) {
        $(me.firstContent).trigger('wheel:spin');
    }
    ,
    10, me);

    window.setTimeout(
    function() {
        window.clearInterval(me.spinTimer);
        me.chooseFinalSlide();
    },
    this.seconds * 1000);
}

/* Handles moving the content items up by returning the the appropriate point in a sin curve */
Wheel.prototype.rotateContentStep = function(t, b, c, d) {
    t = t || (Date.now() - this.startTime) / 1000;
    d = d || this.seconds;
    speed = Math.round((Math.pow(Math.sin(t / (d * (1 / 3))), 4)) * this.spinSpeed) + 10;
    return speed;

};

/* When the timer has stopped, this function chooses the final slide */
Wheel.prototype.chooseFinalSlide = function() {
    var me = this,
    allContent = me.element.querySelectorAll('.content');
    if (allContent[0].offsetTop < (allContent[0].offsetHeight / 2)) {
        me.slideDown(allContent);
    } else {
        me.slideUp(allContent);
    }
}

/* Slide content up to the next full piece of content */
Wheel.prototype.slideUp = function(allContent) {
    allContent[1].style.marginTop = "0px";
    me.element.removeChild(allContent[0]);
    allContent[0].style.marginTop = "0px";
    me.element.appendChild(allContent[0]);
};

/* Slide content down to the next full piece of content */
Wheel.prototype.slideDown = function(allContent) {
    allContent[0].style.marginTop = "0px";
};

/* Moves the top image to the bottom of the stack */
Wheel.prototype.moveToBottom = function(ele) {
    this.firstContent = this.element.querySelectorAll('.content')[1];
    var newOffset = this.firstContent.offsetTop + "px";

    // move the element to the bottom of the stack
    this.element.removeChild(ele);
    this.firstContent.style.marginTop = newOffset;

    ele.style.marginTop = "0px"
    this.element.appendChild(ele);
}

/* used by Wheel.spin to generate a randome number of seconds */
Wheel.prototype.generateRandomTime = function(x) {
    return Math.round( Math.random() * x + 5 )
};

/* Adds a custom event listener wheel:spin to each piece of content */
Wheel.prototype.setupContent = function(content) {
    var me = this;
    return $(content).bind('wheel:spin',
    function(event) {
        var ele = event.currentTarget;

        if (ele.offsetTop < 0 && ele.offsetHeight <= Math.abs(ele.offsetTop)) {

            me.moveToBottom(ele);

        } else {
            ele.style.marginTop = (ele.offsetTop - me.rotateContentStep()) + "px";
        }
    });
}

/* Loads jQuery objects for each piece of content into the Wheel.contentItems array */
Wheel.prototype.getContent = function() {
    var me = this;
    $(me.element).find(".content").each(function(i, content) {
        me.contentItems.push(me.setupContent(content));
    });
}

/* returns a jQuery object containing the top most elementin the list */
Wheel.prototype.getActiveItem = function() {
    return $(me.item).find('.content').first();
}