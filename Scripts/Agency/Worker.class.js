var Worker = atom.Class({
    Implements:             [ atom.Class.Options ],
    
    options:                {
        moodModifier:       0.2,
    },
    
    initialize:             function (options) {
        this.setOptions(options);
        this._vert          = this.options.vert         || null;
        this._vert._worker  = this;
        this._vert._name    = this._name                = this.options.profile.name || '';
        this._vert._role    = this._role                = this.options.profile.role || '';
        
        this._loaded        = 0;
        this._mood          = 0;
        this._health        = 1;
        
        this.mood           (Math.random());
        this.health         (Math.random());
    },
    
    shifters:           {
        mood:           function (v) {return v.limit(-1.0, 1.0)}.bind(this),
        loaded:         function (v) {return v.limit(-0.3, 0.3)}.bind(this),
        health:         function (v) {return v.limit(-0.3, 0.3)}.bind(this)
    },
    
    name:                   function (value) {
        if (value == null) return this._name;
        
        this._name = value;
        return this._name;
    },
    role:                   function (value) {
        if (value == null) return this._role;
        
        this._role = value;
        return this._role;
    },
    vert:                   function (value) {
        if (value == null) return this._vert;

        this._vert = value;
        return this._vert;
    },
    
    loaded:                 function (value) {
        var l = this._loaded;
        if (value == null) return l;

        l += this._shifter(value, 'loaded');
        return l.limit(0.0,1.0);
    },
    mood:                   function (value) {
        if (value == null) return this._mood;

        this._mood += this._shifter(value, 'mood');
        return this._mood.limit(-1.0, 1.0);
    },
    health:                 function (value) {
        var health = this._health;
        if (value == null) return health;

        health += this._shifter(value, 'health');
        return health.limit(0.0, 1.0);
    },
    
    // Need rewrite!!
    modifiers:              function () {
        return {
            mood:           this.mood(), // 0 to 1
            loaded:         this.loaded(), // 0 to 1
            health:         this.health()
        }
    },
    
    call:                   function (who) {
        if(typeof who != 'number') {
            return;
        }
        
        this.mood(Number.random(-100, 20) / 100);
        this.vert().connection(who);
    },
    
    
    _shifter: function (value, type) {
        return this.shifters[type](value);
    }
    
    
    
});