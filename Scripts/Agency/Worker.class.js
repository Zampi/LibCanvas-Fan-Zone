var Worker = atom.Class({
    Implements:             [ atom.Class.Options ],
    
    options:                {},
    
    initialize:             function (options) {
        this.setOptions(options);
        this._vert          = this.options.vert         || null;
        this._vert._worker  = this;
        this._vert._name    = this._name                = this.options.profile.name || '';
        this._vert._role    = this._role                = this.options.profile.role || '';
        
        this.loaded         (0);
        this.mood           (Math.random());
        this.health         (Math.random());
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
        if (value == null) return this._loaded;

        this._loaded += value;
        return this._loaded;
    },
    mood:                   function (value) {
        var mood = this._mood;
        if (value == null) return mood;

        mood += value;
        return mood.limit(0, 1);
    },
    health:                 function (value) {
        if (value == null) return this._health;

        this._health = value;
        return this._health;
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
        this.
        this.vert().connection(who);
    }
    
    
    
});