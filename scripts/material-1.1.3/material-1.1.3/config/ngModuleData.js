/**
 * The Angular Material module `ngMaterial` is generated by scanning all Material components
 * for valid module definitions. @see gulp-utils.js  ::buildNgMaterialDefinition()
 *
 * angular.module('ngMaterial', [
 *    "ng","ngAnimate","ngAria",
 *    "material.core","material.core.gestures","material.core.layout","material.core.theming.palette",
 *    ...
 *  ]);
 *
 */

// Define patterns for AngularJS Module definitions

var MATERIAL_ONLY = /\.module\(['|"](material\.[a-zA-Z\-\.]*)['|"]\s*,(\s*\[([^\]]*)\])/;
var ANY = /\.module\(('[^']*'|"[^"]*")\s*,(?:\s*\[([^\]]+)\])?/;

/**
 * Find module definition s that match the module definition pattern
 */
function buildScanner(pattern) {

  return function findPatternIn(content) {
    var dependencies;
    var match = pattern.exec(content || '');
    var moduleName = match ? match[1].replace(/\'/gi,'') : null;
    var depsMatch = match && match[2] && match[2].trim();

    if (depsMatch) {
      dependencies = depsMatch.split(/\s*,\s*/).map(function(dep) {
        dep = dep.trim().slice(1, -1); //remove quotes
        return dep;
      });
    }

    return match ? {
      name         : moduleName || '',
      module       : moduleName || '',
      dependencies : dependencies || [ ]
    } : null;
  }
}

module.exports = {
  material : buildScanner( MATERIAL_ONLY ),
  any      : buildScanner( ANY )
};

