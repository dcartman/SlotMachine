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
	this.setWheelHousingHeight();
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
    $(me.element).find('.trigger .spin').each(function(i, trigger) {
        me.trigger = trigger;
        trigger.object = me;
    }).bind('mouseup', me.initiateSpinCycle);
    
    $(me.element).find('.trigger .slide_up').each(function(i, trigger) {
        me.slide_up = trigger;
        trigger.object = me;
    }).bind('mouseup', me.slideUp);
    
    $(me.element).find('.trigger .slide_down').each(function(i, trigger) {
        me.slide_up = trigger;
        trigger.object = me;
    }).bind('mouseup', me.slideDown);
}

SlotMachine.prototype.initiateSpinCycle = function() {
    var me = this.object;

    me.wheels.forEach(function(wheel) {
        wheel.spin();
    });

};

SlotMachine.prototype.slideUp = function() {
    var me = this.object;

    me.wheels.forEach(function(wheel) {
    	var allContent = wheel.element.querySelectorAll('.content');
        wheel.slideUp(allContent);
    });

};

SlotMachine.prototype.slideDown = function() {
    var me = this.object;

    me.wheels.forEach(function(wheel) {
    	var allContent = wheel.element.querySelectorAll('.content');
        wheel.slideDown(allContent);
    });

};


SlotMachine.prototype.setWheelHousingHeight = function() {
	var newHeight = this.element.querySelector('.wheel').offsetWidth * 2;
	$(this.element).find('.wheel-housing').css( 'height', newHeight+"px" );
	$(this.element).find('.wheel').css('height', "100%");
}

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
    this.spinning = false;
    
    me.contentItems = [];

    me.getContent();
}

/* This will handle spinning the wheels when the trigger has been pressed */
Wheel.prototype.spin = function() {
    var me = this;
	if(this.spinning == false) {
	    this.firstContent = this.element.querySelector('.content');
	    this.seconds = 15; //this.generateRandomTime(20, 15);
	    this.spinSpeed = this.generateRandomTime( this.element.offsetHeight / 2, this.element.offsetHeight / 4 );
	    this.startTime = Date.now();

    	this.spinTimer = window.setInterval(
    	function(me) {
    	    $(me.firstContent).trigger('wheel:spin');
    	}
    	,
    	10, me);
    	this.spinning = true;
	}
}

/* Handles moving the content items up by returning the the appropriate point in a sin curve */
Wheel.prototype.rotateContentStep = function(t, b, c, d) {
    t = t || (Date.now() - this.startTime) / 1000;
    d = d || this.seconds;
    speed = Math.round( ( Math.pow( ( Math.sin( Math.pow( ( ( t - (d*2.5) ) / (d*1.5) ), 3 ) - 2 ) + 1 ), 3) ) * this.spinSpeed );
    return speed;

};

/* When the timer has stopped, this function chooses the final slide */
Wheel.prototype.chooseFinalSlide = function() {
    var me = this,
    allContent = me.element.querySelectorAll('.content');
    if (Math.abs( allContent[0].offsetTop ) < (allContent[0].offsetHeight / 2)) {
        me.slideDown(allContent);
    } else {
        me.slideUp(allContent); // <----- should be slideUp but its broken.
    }
}

/* Slide content up to the next full piece of content */
Wheel.prototype.slideUp = function(allContent) {
	var me = this,
		time = ( Math.abs(allContent[1].offsetTop) / 100 );
	this.setTransition( allContent[0], time, function(eve) {
		var evEle = eve.currentTarget;
		me.element.removeChild(evEle);
    	evEle.style.marginTop = "0px";
    	me.element.appendChild(evEle);
	});
    allContent[0].style.marginTop = "-"+ me.element.offsetHeight +"px";
};

/* Slide content down to the next full piece of content */
Wheel.prototype.slideDown = function(allContent) {
	if(this.spinning == false) {
		var time = ( Math.abs(allContent[1].offsetTop) / 100 ),
			el = allContent[ allContent.length - 1 ];
		this.element.removeChild(el);
		el.style.marginTop = "-"+ this.element.offsetHeight +"px";
		this.element.insertBefore(el, allContent[0]);
	} else {
		var time = ( Math.abs(allContent[0].offsetTop) / 100 ),
			el = allContent[0];
	}
	this.setTransition( el, time );
    el.style.marginTop = "0px";
};

Wheel.prototype.setTransition = function( ele, time, callback) {
	var me = this;
	ele.style.WebkitTransition = "margin-top "+ time +"s ease-out";
	ele.addEventListener('webkitTransitionEnd', function(event) {
		event.currentTarget.style.webkitTransition = "";
		me.spinning = false;
		if( typeof(callback) == "function" ) callback.call(this, event);
	});
	return undefined;
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
Wheel.prototype.generateRandomTime = function(x, y) {
	var x = ( typeof x == "undefined" || x < 10 ) ? 10 : x,
		y = y || 5;
    return Math.round( Math.random() * ( x -  y ) + 5)
};

/* Adds a custom event listener wheel:spin to each piece of content */
Wheel.prototype.setupContent = function(content) {
    var me = this;
    return $(content).bind('wheel:spin',
    function(event) {
        var ele = event.currentTarget,
            rotateStep = me.rotateContentStep();
	if( rotateStep < 1 ) {
	
	    window.clearInterval(me.spinTimer);
            me.chooseFinalSlide();
	 
        } else if (ele.offsetTop < 0 && ele.offsetHeight <= Math.abs(ele.offsetTop)) {

            me.moveToBottom(ele);

        } else {
 
            ele.style.marginTop = (ele.offsetTop - ( ( rotateStep <= (ele.offsetHeight / 2) ) ? rotateStep : (ele.offsetHeight / 2) ) ) + "px";
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