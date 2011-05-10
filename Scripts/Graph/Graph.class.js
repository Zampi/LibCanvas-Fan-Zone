var Graph = atom.Class({
    Implements:             [ atom.Class.Options, Drawable, Animatable, Moveable ],
    options :               {
        center:             {
            x:              wwidth / 2,
            y:              wheight / 2
        },
        radius:             120,
    },
    	                    
    _verts:                 [],
    _vertsMatrix:           [],
    _vertsCount:            0,
    random:                 0,
    
    initialize:             function (options) {
        this.setOptions(options);
        this._center         = new Point(this.options.center.x, this.options.center.y);
        this._radius         = this.options.radius;
    },
    
    addVerts:               function (amount) {
        for (var i = 0; i < amount; i++) {
            this._verts.include(new Vertex({parent: this}));
        }
        this._vertsCount += amount;
        return this._vertsCount;
    },
    
    getVertsCount:          function () {
        return this._vertsCount;
    },
    
    vert:                   function (index) {
        return this._verts[index];
    },
    
    getVertsMatrix:         function () {
        this._updateVertsMatrix();
        return this._vertsMatrix;
    },
    
    _updateVertsMatrix:     function () {
        var connections;
        var equal;
        this._verts.forEach(function (vert, index) {
            connections = vert.getConnections();
            // equal = true;
            // 
            // Object.keys(connections).forEach( function ( key, num ) {
            //     var connect = connections[key];
            //     if (this._vertsMatrix[index] == undefined || this._vertsMatrix[index][num] == undefined ) {
            //         equal = false;
            //         return;
            //     }
            //     if (this._vertsMatrix[index][num] != connect) {
            //         equal = false;
            //         return;
            //     }
            // }.bind(this));
            
            if (!equal) {
                this._vertsMatrix[index] = connections;
            }
        }.bind(this));
    },
    
    draw:                   function () {
        
        var canvas = this.libcanvas;
        
        this._drawPoints(canvas.ctx);
        this._drawConnections(canvas.ctx);
        this._drawTexts(canvas.ctx);
        this._drawVerts(canvas.layer('verts').ctx);
        
    },
        
    _drawPoints:             function (ctx) {
        var angle = (360 / this._verts.length ).degree();
        this._verts.forEach(
            function (vert, index) {
                vert.angle              = angle * index;
                var vertPoint           = vert.point();
                if (vertPoint == null) {
                    vertPoint           = vert
                                            .place(this.transform().x, this.transform().y + this.transform().radius)
                                            .rotate( vert.angle, this.transform().point );
                }
            }.bind(this));
    },
    _drawConnections:       function (ctx) {
        this._verts.forEach( function (vert) {
            var vertPoint       = vert.point().clone();
            var connections     = vert.getConnections();
            Object.keys(connections).forEach( function (key) {
                if (connections[key] == 0) return;
                // ctx.save();
                ctx.beginPath();
                
                var s, m, f, g;
                s = vertPoint.toObject();
                m = {x: this.transform().x, y: this.transform().y}
                f = this.vert(key).point().toObject();
                g = ctx.createLinearGradient(s.x, s.y, f.x, f.y);
                g.addColorStop(0, new Color(vert.color()));
                g.addColorStop(1, new Color(this.vert(key).color()));
                
                ctx.strokeStyle = g;
                // ctx.lineWidth = connections[key];
                for (var i = 0; i < connections[key]; i++ ) {
                    var random = this.random;
                    random = i % 2 == 0 ? -random : random;
                    console.log();
                    random = key % 2 == 0 ? random * Math.atan(parseInt(key)) * 2 : random * Math.atan(parseInt(key)) * 1
                    ctx.moveTo(s.x, s.y);
                    ctx.bezierCurveTo(s.x, s.y, m.x + random + i, m.y + random + i, f.x, f.y);
                }
                ctx.stroke();
                
                
            }.bind(this));
        }.bind(this));
    },
    _drawTexts:              function (ctx) {
        var angle = (360 / this._verts.length ).degree();
        this._verts.forEach( function (vert, index) {
            ctx.save();
            var vertPoint = vert.point().clone();
            ctx.rotate(vert.angle + (90).degree(), vertPoint);
            var textX = 30 * index + 20;
            var textY = 20;
            var nameBox = new Rectangle(vertPoint.x + 20, vertPoint.y - 15, 150, 30);
            var roleBox = new Rectangle(vertPoint.x + 20, vertPoint.y, 150, 30);
            ctx.text({
                family      : "Helvetica",
                size        : 12,
                wrap        : 'no',
                // padding     : [textX,  textY],
                align       : 'left',
                width       : 150,
                lineHeight  : 18,
                text        : vert._name,
                to          : nameBox, //vert.shape,
                color       : 'green'
            });
            ctx.text({
                family      : "Helvetica",
                size        : 10,
                wrap        : 'no',
                // padding     : [textX,  textY],
                align       : 'left',
                width       : 150,
                lineHeight  : 18,
                text        : vert._role,
                to          : roleBox, //vert.shape,
                color       : 'gray'
            });
            ctx.restore();
         });
    },
    
    _drawVerts:             function (ctx) {
        this._verts.forEach( function (vert) {
            // ctx.save();
            // ctx.translate(0, -1);
            // ctx.fillStyle = "#fff";
            // ctx.fill(new LibCanvas.Shapes.Circle( vert.point(), vert.radius()));
            // ctx.restore();
            
            vert.shape = new LibCanvas.Shapes.Circle( vert.point(), vert.radius());
            ctx.shadowColor = "black";
            ctx.fillStyle = vert.color();
            ctx.fill(vert.shape);
        });
    },
        
    transform:              function () {
        return {
            x:              this._center.x,
            y:              this._center.y,
            point:          this._center,
            radius:         this._radius
        }
    }
    
});