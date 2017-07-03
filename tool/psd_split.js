var foreach = function(array, callback){
	for(var i = 0; i < array.length; i++){
		callback(array[i]);
	}
};
var getName = function(layer){
	return layer.name.replace(/\*/g, "");
};
var iterate = function(target, path, artLayerCallback, layerSetCallback){
	foreach(target.layers, function(layer){
		var currentPath = [path, getName(layer)].join("/");
		if(layer.typename == "ArtLayer"){
			artLayerCallback(layer, currentPath);
		}else if(layer.typename == "LayerSet"){
			layerSetCallback(layer, currentPath);
			iterate(layer, currentPath, artLayerCallback, layerSetCallback);
		}else{
			alert("unknown type!");
		}
	});
};
var mkdir = function(dirname){
	var folder = new Folder(dirname);
    if(!folder.exists){
    	folder.create();
    }
};

var exportOpts = new ExportOptionsSaveForWeb();
exportOpts.format = SaveDocumentType.PNG;
exportOpts.PNG8 = false;

var exportDir = "./exports";
mkdir(exportDir);

iterate(activeDocument, exportDir, function(layer, path){
	layer.visible = false;
}, function(layerSet, path){
	layerSet.visible = true;
	mkdir(path);
});

var list = new File("./exports.txt");
list.open("w");

iterate(activeDocument, exportDir, function(layer, path){
	var file = new File(path + ".png");

	layer.visible = true;
	activeDocument.exportDocument(file, ExportType.SAVEFORWEB, exportOpts);
	layer.visible = false;

	list.write(path + "\n");
}, function(){});

list.close();
