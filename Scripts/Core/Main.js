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
    
    var libcanvas = new LibCanvas('canvas', { fps: 30 })
        .listenMouse()
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
            this.ctx.save();
            mouseX      = this.mouse.point.clone().x - wwidth  / 2;
            mouseY      = this.mouse.point.clone().y - wheight / 2;
            console.log(this.mouse.point.clone().x , this.mouse.point.clone().y);
            angle       = ( Math.atan2(mouseY, mouseX) / Math.PI * 180 + 90 );//.degree();
            this.ctx.rotate(angle.degree(), agency.graph().transform().point);
            this.ctx.restore();
        });
        
    libcanvas.mouse.addEvent({
        mousedown:          function (event) {
            mousePressed = true;
        },
        mouseup:            function ()      { mousePressed = false; }
    });
    
});