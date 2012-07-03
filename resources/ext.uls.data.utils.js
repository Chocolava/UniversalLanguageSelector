/**
 * @author Amir E. Aharoni
 * Utility functions for querying language data.
 */
(function ( $ ) {
	"use strict";

	/**
	 * Returns the script of the language.
	 * @param string language code
	 * @return string
	 */
	$.uls.data.script = function( language ) {
		return $.uls.data.languages[language][0];
	};

	/**
	 * Returns the regions in which a language is spoken.
	 * @param string language code
	 * @return array of strings
	 */
	$.uls.data.regions = function( language ) {
		return $.uls.data.languages[language][1];
	};

	/**
	 * Returns the autonym of the language.
	 * @param string language code
	 * @return string
	 */
	$.uls.data.autonym = function( language ) {
		return $.uls.data.autonyms[language];
	};

	/**
	 * Returns an array of all region codes.
	 * @return array
	 */
	$.uls.data.allRegions = function() {
		var allRegions = [];

		for( var region in $.uls.data.regiongroups ) {
			allRegions.push( region );
		}

		return allRegions;
	};

	/**
	 * Returns all languages written in script.
	 * @param script string
	 * @return array of strings (languages codes)
	 */
	$.uls.data.languagesInScript = function( script ) {
		return $.uls.data.languagesInScripts( [ script ] );
	};

	/**
	 * Returns all languages written in the given scripts.
	 * @param scripts array of strings
	 * @return array of strings (languages codes)
	 */
	$.uls.data.languagesInScripts = function( scripts ) {
		var languagesInScripts = [];

		for ( var language in $.uls.data.languages ) {
			for ( var i = 0; i < scripts.length; i++ ) {
				if ( scripts[i] === $.uls.data.script(language) ) {
					languagesInScripts.push( language );
					break;
				}
			}
		}

		return languagesInScripts;
	};

	/**
	 * Returns all languages in a given region.
	 * @param region string
	 * @return array of strings (languages codes)
	 */
	$.uls.data.languagesInRegion = function( region ) {
		return $.uls.data.languagesInRegions( [ region ] );
	};

	/**
	 * Returns all languages in given regions.
	 * @param region array of strings.
	 * @return array of strings (languages codes)
	 */
	$.uls.data.languagesInRegions = function( regions ) {
		var languagesInRegions = [];

		for ( var language in $.uls.data.languages ) {
			for ( var i = 0; i < regions.length; i++ ) {
				if ( $.inArray( regions[i], $.uls.data.regions( language ) ) !== -1 ) {
					languagesInRegions.push( language );
					break;
				}
			}
		}

		return languagesInRegions;
	};

	/**
	 * Returns all languages in a region group.
	 * @param groupNum number.
	 * @return array of strings (languages codes)
	 */
	$.uls.data.languagesInRegionGroup = function( groupNum ) {
		return $.uls.data.languagesInRegions( $.uls.data.regionsInGroup( groupNum ) );
	};

	/**
	 * Returns an associative array of languages in a region,
	 * grouped by script.
	 * @param string region code
	 * @return associative array
	 */
	$.uls.data.languagesByScriptInRegion = function( region ) {
		var languagesByScriptInRegion = {};

		for ( var language in $.uls.data.languages ) {
			if ( $.inArray( region, $.uls.data.regions( language ) ) !== -1 ) {
				var script = $.uls.data.script( language );
				if ( languagesByScriptInRegion[script] === undefined ) {
					languagesByScriptInRegion[script] = [];
				}
				languagesByScriptInRegion[script].push( language );
			}
		}

		return languagesByScriptInRegion;
	};

	/**
	 * Returns an associative array of languages in a region,
	 * grouped by script group.
	 * @param string region code
	 * @return associative array
	 */
	$.uls.data.languagesByScriptGroupInRegion = function( region ) {
		return $.uls.data.languagesByScriptGroupInRegions( [ region ] );
	};

	/**
	 * Returns an associative array of all languages,
	 * grouped by script group.
	 * @return associative array
	 */
	$.uls.data.allLanguagesByScriptGroup = function() {
		return $.uls.data.languagesByScriptGroupInRegions( $.uls.data.allRegions() );
	};

	/**
	 * Returns an associative array of languages in several regions,
	 * grouped by script group.
	 * @param array of strings - region codes
	 * @return associative array
	 */
	$.uls.data.languagesByScriptGroupInRegions = function( regions ) {
		var languagesByScriptGroupInRegions = {};

		for ( var language in $.uls.data.languages ) {
			for ( var i = 0; i < regions.length; i++ ) {
				if ( $.inArray( regions[i], $.uls.data.regions( language ) ) !== -1 ) {
					var scriptGroup = $.uls.data.scriptGroupOfLanguage( language );
					if ( languagesByScriptGroupInRegions[scriptGroup] === undefined ) {
						languagesByScriptGroupInRegions[scriptGroup] = [];
					}
					languagesByScriptGroupInRegions[scriptGroup].push( language );
					break;
				}
			}
		}

		return languagesByScriptGroupInRegions;
	};

	/**
	 * Returns an array of languages grouped by region group,
	 * region, script group and script.
	 * @return associative array
	 */
	$.uls.data.allLanguagesByRegionAndScript = function() {
		var allLanguagesByRegionAndScript = {},
			region,
			regionGroup;

		for ( region in $.uls.data.regiongroups ) {
			regionGroup = $.uls.data.regiongroups[region];
			if ( allLanguagesByRegionAndScript[regionGroup] === undefined ) {
				allLanguagesByRegionAndScript[regionGroup] = {};
			}
			allLanguagesByRegionAndScript[regionGroup][region] = {};
		}

		for ( var language in $.uls.data.languages ) {
			var script = $.uls.data.script( language );
			var scriptGroup = $.uls.data.groupOfScript( script );
			var regions = $.uls.data.regions( language );

			for ( var regionNum = 0; regionNum < regions.length; regionNum++ ) {
				region = regions[regionNum];
				regionGroup = $.uls.data.regiongroups[region];

				if ( allLanguagesByRegionAndScript[regionGroup][region][scriptGroup] === undefined ) {
					allLanguagesByRegionAndScript[regionGroup][region][scriptGroup] = {};
				}

				if ( allLanguagesByRegionAndScript[regionGroup][region][scriptGroup][script] === undefined ) {
					allLanguagesByRegionAndScript[regionGroup][region][scriptGroup][script] = [];
				}

				allLanguagesByRegionAndScript[regionGroup][region][scriptGroup][script].push( language );
			}
		}

		return allLanguagesByRegionAndScript;
	};

	/**
	 * Returns all regions in a region group.
	 * @param number groupNum
	 * @return array of strings
	 */
	$.uls.data.regionsInGroup = function( groupNum ) {
		var regionsInGroup = [];

		for ( var region in $.uls.data.regiongroups ) {
			if ( $.uls.data.regiongroups[region] === groupNum ) {
				regionsInGroup.push( region );
			}
		}

		return regionsInGroup;
	};

	/**
	 * Returns the script group of a script or 'Other' if it doesn't
	 * belong to any group.
	 * @param string script code
	 * @return string script group name
	 */
	$.uls.data.groupOfScript = function( script ) {
		for ( var group in $.uls.data.scriptgroups ) {
			if ( $.inArray( script, $.uls.data.scriptgroups[group] ) !== -1 ) {
				return group;
			}
		}

		return 'Other';
	};

	/**
	 * Returns the script group of a language.
	 * @param string language code
	 * @return string script group name
	 */
	$.uls.data.scriptGroupOfLanguage = function( language ) {
		return $.uls.data.groupOfScript( $.uls.data.script( language ) );
	};

} )( jQuery );
