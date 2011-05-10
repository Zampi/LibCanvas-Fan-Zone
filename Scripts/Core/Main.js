var wwidth=(window.innerWidth)?window.innerWidth: 
    ((document.all)?document.body.offsetWidth:null); 
var wheight=(window.innerHeight)?window.innerHeight: 
    ((document.all)?document.body.offsetHeight:null);

var mousePressed = false;

LibCanvas.extract();

atom.dom(function () {
    var agency = new Agency({structure: struct});
    
    var world  = new World();
        world.agency(agency);
    
    agency.graph().animate({
        fn:             'sine',
        props:          {random: 1},
        time:           100,
        onFinish: function (prevAnim, prevProps) {
            this.animate({
                props: {random: prevProps.random > 0 ? prevProps.random + 0.3 : 0 },
                fn : 'sine',
                time : 100,
                onFinish: prevAnim.repeat
            });
        }
    });
    
    var ctxAngle = 0;
    
    var libcanvas = new LibCanvas('canvas', { fps: 30 });    
    
    libcanvas.listenMouse()
        .size({
            width : wwidth,
            height: wheight
        }, true)
        .start()
        // .createLayer('connections')
        // .createLayer('texts')
        .createLayer('verts')
        .addElement(agency.graph())
        .addFunc( function () { this.update(); })
        .addFunc( function () {
            if (!mousePressed) return;
            var ctx     = this.ctx;
            mouseX      = this.mouse.point.clone().x - wwidth  / 2;
            mouseY      = this.mouse.point.clone().y - wheight / 2;
            angle       = ( Math.atan2(mouseY, mouseX) / Math.PI * 180 );//.degree();
            // 
            anim.animate({
        		props: { agle: angle },
                // onProccess: libcanvas.update,
        		time: 700
        	});
        	
            // mousePressed = false;
            // this.ctx.restore();
        });
        
    var anim = new LibCanvas.Behaviors.Animatable({
		get agle () {
			return ctxAngle; //shaper.shape.to.x;
		},
		set agle (value) {
            libcanvas.layer('verts').ctx.restore();
            libcanvas.layer('verts').ctx.save();
		    ctxAngle = value;
		    console.log(ctxAngle);
			libcanvas.layer('verts').ctx.rotate(ctxAngle.degree(), agency.graph().transform().point);
			return ctxAngle.degree();
		}
	});
	
    libcanvas.mouse.addEvent({
        mousedown:          function (event) {
            mousePressed = true;
        },
        mouseup:            function ()      { mousePressed = false; }
    });
    
});