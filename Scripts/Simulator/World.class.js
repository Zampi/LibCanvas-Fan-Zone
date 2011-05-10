var World = atom.Class({
    Implements: [ atom.Class.Options, Animatable ],
    
    options: {},
    
    initialize: function (options) {
        this.setOptions(options);
        
        this._agency    = null;
        this._fortuna   = 0;
        this._situation = 1;
        
    },
    
    _shifter:   function (v, t) {
        return this.shifters[type](value);
    },
    
    shifters:      {
        fortuna:   function (v) {return v.limit(-0.3, 0.3)}.bind(this),
        situation: function (v) {return v.limit(-0.3, 0.3)}.bind(this),
    },
    
    agency:     function (value) {
        var a = this._agency;
        if (value == null) return a;
        
        a = value;
        return a;
    },
    
    fortuna:    function (value) {
        var f = this._fortuna;
        if (value == null) return f.limit(-1,1);;

        s += this._shifter(value, 'fortuna');
        return s.limit(-1,1);
    },
    
    situation:  function (value) {
        var s = this._situation;
        if (value == null) return s.limit(0,1);;

        s += this._shifter(value, 'situation');
        return s.limit(0,1);
    },
    
    update:     function () {
        // pass
    }
    
    
});