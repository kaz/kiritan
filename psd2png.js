var foreach = function(array, callback){
	for(var i = 0; i < array.length; i++){
		callback(array[i]);
	}
};
var getLayerName = function(layer){
	return layer.name.replace(/\*/g, "")
};
var iterateLayerSets = function(callback, target){
	foreach(target || activeDocument.layerSets, function(layerSet){
		callback(layerSet, getLayerName(layerSet));
		iterateLayerSets(function(childLayerSet){
			callback(childLayerSet, [getLayerName(layerSet), getLayerName(childLayerSet)].join("/"));
		}, layerSet.layerSets);
	});
};
var iterateLayers = function(callback, target){
	iterateLayerSets(function(layerSet, layerPath){
		foreach(layerSet.artLayers, function(layer){
			callback(layer, layerPath);
		});
	});
};
var mkdir = function(dirname){
	var folder = new Folder(dirname);
    if(!folder.exists){
    	folder.create();
    }
}

var exportOpts = new ExportOptionsSaveForWeb();
exportOpts.format = SaveDocumentType.PNG;
exportOpts.PNG8 = false;

var exportDir = "./exports";
mkdir(exportDir);

iterateLayerSets(function(layerSet, layerPath){
	layerSet.visible = true;
	mkdir([exportDir, layerPath].join("/"));
});
iterateLayers(function(layer, layerPath){
	layer.visible = false;
});

var list = new File("./exports.txt");
list.open("w");

iterateLayers(function(layer, layerPath){
	layer.visible = true;
	
	var fileName = [exportDir, layerPath, getLayerName(layer)].join("/") + ".png";
	list.write(fileName + "\n");
	
	var file = new File(fileName);
	activeDocument.exportDocument(file, ExportType.SAVEFORWEB, exportOpts);
	
	layer.visible = false;
});

list.close();
