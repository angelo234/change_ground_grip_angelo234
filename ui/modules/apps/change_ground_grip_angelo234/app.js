angular.module('beamng.apps')

.constant('UI_TEXT', {

	surfaces: [
		{ surface: 'ALL_SURFACES',  	txt: 'All Surfaces'		},
		{ surface: 'ASPHALT', 			txt: 'Asphalt'      	},
		{ surface: 'ASPHALT_OLD', 		txt: 'Asphalt Old'  	},
		{ surface: 'ASPHALT_PREPPED',	txt: 'Asphalt Prepped'  },
		{ surface: 'ASPHALT_WET', 		txt: 'Asphalt Wet'  	},
		{ surface: 'COBBLESTONE', 		txt: 'Cobblestone'  	},
		{ surface: 'DIRT',  			txt: 'Dirt'         	},
		{ surface: 'DIRT_DUSTY', 		txt: 'Dirt Dusty'      	},
		{ surface: 'DIRT_DUSTY_LOOSE',	txt: 'Dirt Dusty Loose' },
		{ surface: 'GRASS',  			txt: 'Grass'      		},
		{ surface: 'GRAVEL', 			txt: 'Gravel'     		},
		{ surface: 'ICE', 				txt: 'Ice'  			},
		{ surface: 'METAL', 			txt: 'Metal'         	},
		{ surface: 'METAL_TREAD', 		txt: 'Metal Tread'     	},
		{ surface: 'MUD' , 				txt: 'Mud'  			},
		{ surface: 'PLASTIC', 			txt: 'Plastic'        	},
		{ surface: 'ROCK', 				txt: 'Rock'      		},
		{ surface: 'RUMBLE_STRIP', 		txt: 'Rumble Strip'  	},
		{ surface: 'SAND', 				txt: 'Sand'         	},
		//{ surface: 'SLIPPERY', 			txt: 'Slippery'      	}, combined with asphalt_wet
		{ surface: 'SNOW', 				txt: 'Snow'  			},
		{ surface: 'WOOD', 				txt: 'Wood'         	}
	],

	/* WIP for next update
	less_surfaces: [
		{ surface: 'ALL_SURFACES',  	txt: 'All Surfaces'		},
		{ surface: 'ASPHALT', 			txt: 'Asphalt'      	}, //Modifies ASPHALT_OLD, ASPHALT_PREPPED, RUMBLE_STRIP
		{ surface: 'ASPHALT_WET', 		txt: 'Asphalt Wet'      }, //Modifies ASPHALT_WET, SLIPPERY
		{ surface: 'COBBLESTONE', 		txt: 'Cobblestone'  	},
		{ surface: 'DIRT',  			txt: 'Dirt/Grass/Gravel'}, //Modifies GRASS, DIRT_DUSTY, DIRT_DUSTY_LOOSE, GRAVEL
		{ surface: 'ICE', 				txt: 'Ice'  			},
		{ surface: 'METAL', 			txt: 'Metal'         	}, //Modifies METAL_TREAD
		{ surface: 'MUD' , 				txt: 'Mud'  			},
		{ surface: 'PLASTIC', 			txt: 'Plastic'        	},
		{ surface: 'ROCK', 				txt: 'Rock'      		},
		{ surface: 'SAND', 				txt: 'Sand'         	},
		{ surface: 'SNOW', 				txt: 'Snow'  			},
		{ surface: 'WOOD', 				txt: 'Wood'         	}
	],
	*/
})

.directive('changeGroundGripAngelo234', ['UI_TEXT', function (UI_TEXT) {
return {
templateUrl: '/ui/modules/apps/change_ground_grip_angelo234/app.html',
replace: true,
restrict: 'EA',
link: function (scope, element, attrs) {

	//FUNCTIONS

	function init(){
		// The current overlay screen the user is on (default: null)
		scope.overlayScreen = null;
		scope.extension_name = 'scripts_change__ground__grip__angelo234_extension';
		scope.showAllSurfaces = false;
		scope.apply_button_enabled = true;

		scope.surfaces = UI_TEXT.surfaces;
		scope.selectedSurface = 'ALL_SURFACES';
		scope.parameters = [
			{
				param: 'staticFrictionCoefficient',
				name: 'Static Friction',
				tooltip: "Friction during normal driving and is usually higher than sliding friction. Typical range = (0.1 ~ 1.0)",
				min: -100, max: 50, inc: 0.01, val: 0.0
			},
			{
				param: 'slidingFrictionCoefficient',
				name: 'Sliding Friction',
				tooltip: "Friction when tires are spinning out or locked up and is usually lower than static friction. Typical range = (0.1 ~ 0.8)",
				min: -10, max: 50, inc: 0.01, val: 0.0
			},
			{
				param: 'hydrodynamicFriction',
				name: 'Hydrodynamic Friction',
				tooltip: "Adds friction when sliding increases. Typical range = (0 ~ 0.1)",
				min: -1, max: 50,	inc: 0.01, val: 0.0
			},
			{
				param: 'stribeckVelocity',
				name: 'Stribeck Velocity',
				tooltip: "How abrupt the change is from static to sliding friction in m/s. Smaller values = very abrupt change. Typical range = (0.2 ~ 10)",
				min: -100, max: 100, inc: 0.01, val: 0.0
			},
			{
				param: 'roughnessCoefficient',
				name: 'Roughness',
				tooltip: "How well types of tire treads grip the surface. Low values are better for slicks. High values are better for mud tires. Range = (0 ~ 1)",
				min: 0, max: 1,	inc: 0.01, val: 0.0
			},
			{
				param: 'fluidDensity',
				name: 'Fluid Density',
				tooltip: "Density of the 'surface' in kg/m^3. Larger values = More resistance",
				min: -1000000, max: 1000000, inc: 0.1, val: 0.0
			},
			{
				param: 'flowConsistencyIndex',
				name: 'Flow Consistency Index',
				tooltip: "Coefficient used to scale the whole visocity equation in Pa*s^n. Typical range = (0 ~ 5000)",
				min: -1000000, max: 1000000, inc: 0.1, val: 0.0
			},
			{
				param: 'flowBehaviorIndex',
				name: 'Flow Behavior Index',
				tooltip: "Exponent (n) used in viscoity equation to define shape of curve. Pseudoplastic (n < 1), newtonian (n = 1), or a dilatant fluid (n > 1). Typical range = (0 ~ 1)",
				min: -100, max: 100, inc: 0.01, val: 0.0
			},
			{
				param: 'dragAnisotropy',
				name: 'Drag Anisotropy',
				tooltip: "Creates a floating or sinking effect. Negative values = sinking effect. Positive values = floating effect. Typical range = (0 ~ 1)",
				min: -1000000, max: 1000000, inc: 0.01, val: 0.0
			},
			{
				param: 'defaultDepth',
				name: 'Default Depth',
				tooltip: "The default depth in meters of the surface when the terrain is flat. Typical range = (0 ~ 0.15)",
				min: -100, max: 100,	inc: 0.01, val: 0.0
			},
			{
				param: 'skidMarks',
				name: 'Skid Marks',
				tooltip: 'To have or not to have skid marks. 0 = false and 1 = true.',
				min: 0, max: 1,	inc: 1, val: 0
			}
		];

		//when resetting UI but not map, use saved values from Lua
		bngApi.engineLua(scope.extension_name + '.getCurrentSurfaceUIValue()', function(data) {
			if(data != null) {
				scope.selectedSurface = data;
			}
		});

		//Store default data in memory and update values
		bngApi.engineLua(scope.extension_name + '.initValues()', function(data) {
			updateUIValues();
		});
	}

	//Apply parameter value
	function setSurfaceParameter(index){
		var surface = scope.selectedSurface;
		var parameter = scope.parameters[index];
		var param = parameter.param;
		var value = parameter.val;

		if(param == "skidMarks"){
			//Convert 0/1 into boolean value
			value = value == 1;
		}

		bngApi.engineLua(scope.extension_name + '.setSurfaceParameter("' + surface + '","' + param +'",' + value + ')');
	}

	//Update the UI values
	function updateUIValue(index){
		var surface = scope.selectedSurface;
		var parameter = scope.parameters[index];
		var param = parameter.param;

		bngApi.engineLua(scope.extension_name + '.getSurfaceParameter("' + surface + '","' + param +'")', function(data) {
			var value = Math.round((data + Number.EPSILON) * 100) / 100;

			parameter.val = value;
		});
	}

	//Update all UI values
	function updateUIValues(){
		//Set values to match current surface

		for(var i = 0; i < scope.parameters.length; i++){
			updateUIValue(i);
		}
	}

	//When user wants to pick surface from world
	scope.pickSurfaceFromWorld = function () {
		bngApi.engineLua(scope.extension_name + '.getGroundModelAtVehicle()', function(data) {
			if(data != null){
				scope.selectedSurface = data;
				scope.changedSelectedSurface();
			}
		});
	};

	//When selecting a different surface in UI
	scope.changedSelectedSurface = function () {
		updateUIValues();
		bngApi.engineLua(scope.extension_name + '.setCurrentSurfaceUIValue("' + scope.selectedSurface + '")');
  };

	//Modify surface parameters from user values
	scope.applyChanges = function () {
		if(!scope.apply_button_enabled){
			return;
		}

		//Set values only from visible rows
		for(var i = 0; i < scope.parameters.length; i++){
			setSurfaceParameter(i);
		}

		//Apply changes
		bngApi.engineLua(scope.extension_name + '.applyChanges("' + scope.selectedSurface + '")');

		updateUIValues();
  };

	//Reset specific surfaces parameters to default settings
	scope.resetCurrentSurfaceGrip = function () {
		bngApi.engineLua(scope.extension_name + '.resetSurface("' + scope.selectedSurface + '")');
		updateUIValues();
  };

	//Reset all surfaces' parameters to default settings
	scope.resetAllGrip = function () {
		bngApi.engineLua(scope.extension_name + '.resetAllSurfaces()');
		updateUIValues();
  };

	//START
	init();

	// Make sure we clean up after closing the app.
	scope.$on('$destroy', function () {});

},
};
}]);