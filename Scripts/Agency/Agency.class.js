var Agency = atom.Class({
    Implements:             [ atom.Class.Options ],
    
    options:                {
        name:               'Random Adv Agency',
        startMoney:         80000,
        startFame:          1000,
        startClients:       1,
        
        structure:          []
    },
    initialize:             function (options) {
        this.setOptions(options);
        
        // Declare some private variables
        this._name          = this.options.name;
        this._money         = this.options.startMoney;
        this._fame          = this.options.startFame;
        this._structure     = this.options.structure;
        this._clients       = this.options.startClients;
        this._workers       = [];
        
        this._graph         = null;
        
        this.setupGraph();
        
    },
    
    workers:               function () {
        return this._workers;
    },
    
    worker:                function (index) {
        if (index == null) index = 0;
        return this._workers[index];
    },
    
    graph:                  function (value) {
        if (value == null) 
            return this._graph;
    },
    
    setupGraph:             function () {
        this._graph = graph = new Graph();
        
        graph.addVerts(this._structure.length);

        // Set group connection for first worker and get times for this
        var tmpVert;
        this._structure.forEach(function(worker, index) {
            tmpVert = graph.vert(index);
            tmpVert.connections(worker.relate);
            this._workers.include(new Worker({profile: worker.profile, vert: tmpVert}));
        }.bind(this));
        
        console.log(graph.getVertsMatrix());
    },
});