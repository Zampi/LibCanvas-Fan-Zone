var Vertex = atom.Class({
    Implements:             [ atom.Class.Options ],
    
    options:                {        
        colors:         ["#f15a2b", "#5ed055"],
        sizes:           [4, 12]
    },
    
    initialize:             function(options) {
        this._connections = {};
        this._point = null;
        this._id = parseInt(Math.random() * (100000 - 100) + 100);
        
        
        // this.radius(8);
        
        this.setOptions(options);
        this._parent = this.options.parent
    },
    
    connections:            function (data) {
        this._parent._verts.forEach( function (vert, index) {
            if (typeof this._connections[index] == 'undefined') { this._connections[index] = 0; }
        }.bind(this));
        if(typeof data != 'object' || typeof data == undefined || data == null) return false;
        console.log(data);
        data.forEach(function (index) {
            index = typeof index == 'string' ? parseInt(index) : index ;
            if (typeof index != 'number') {
                value = this._parent._verts.indexOf(index);
            }
            
            this._connections[index] += 1;
            
        }.bind(this));
        
        return this;
    },
    
    radius:                 function () {
        var m           = this._worker.loaded();
        var s           = this.options.sizes;
        
        var result      = -( s[0] - s[1] ) * m + s[0];
        return result;
    },
    color:                  function () {
        var m           = this._worker.mood();
        var c           = this.options.colors;
        
        var result      = new Color(c[0]).diff(c[1]);
        // result          = result.fullMap( function (x) { return x * m });
        result          = result.map( function (x) { return x * m });
        
        result          = new Color(c[0]).shift(result).toString();
        return result;
    },
    connection:             function (index) {
        if(this._connections[index] == undefined) throw "can't get connection with id: " + index;        
        this._connections[index] += 1;
        return this._connections[index];
    },
    
    getConnections:         function () {
        return this._connections;
    },
    
    point:                  function () {
        return this._point || null; //new Point(0,0);
    },
    
    place:                  function (x, y) {
        if (this.point() == null) {
            this._point = new Point(x, y);
        } else {
            var n = new Point(x, y);
            this._point.moveTo(n);
        }
        return this._point;
    }
});