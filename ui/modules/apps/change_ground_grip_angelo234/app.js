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

	parameters: {
		staticFrictionCoefficient: {
			name: 'Static Friction (μ)',
			tooltip: "Friction during normal driving and is usually higher than sliding friction. Typical range = (0.1 ~ 2)",
			min: -100, max: 50, inc: 0.01, val: 0.0
		},
		slidingFrictionCoefficient:	{
			name: 'Sliding Friction (μ)',
			tooltip: "Friction when tires are spinning out or locked up and is usually lower than static friction. Typical range = (0.1 ~ 1.5)",
			min: -10, max: 50, inc: 0.01, val: 0.0
		},
		hydrodynamicFriction:	{
			name: 'Hydrodynamic Friction (μ)',
			tooltip: "Adds friction when sliding increases. Typical range = (0 ~ 0.1)",
			min: -1, max: 50,	inc: 0.01, val: 0.0
		},
		stribeckVelocity:	{
			name: 'Stribeck Velocity',
			tooltip: "How abrupt the change is from static to sliding friction in m/s. Smaller values = very abrupt change. Typical range = (0.2 ~ 10)",
			min: -100, max: 100, inc: 0.01, val: 0.0
		},
		roughnessCoefficient:	{
			name: 'Roughness',
			tooltip: "How well types of tire treads grip the surface. Low values are better for slicks. High values are better for mud tires. Range = (0 ~ 1)",
			min: 0, max: 1,	inc: 0.01, val: 0.0
		},
		fluidDensity: {
			name: 'Fluid Density',
			tooltip: "Density of the 'surface' in kg/m^3. Larger values = More resistance",
			min: -1000000, max: 1000000, inc: 0.1, val: 0.0
		},
		flowConsistencyIndex:	{
			name: 'Flow Consistency Index',
			tooltip: "Coefficient used to scale the whole visocity equation in Pa*s^n. Typical range = (0 ~ 5000)",
			min: -1000000, max: 1000000, inc: 0.1, val: 0.0
		},
		flowBehaviorIndex:	{
			name: 'Flow Behavior Index',
			tooltip: "Exponent (n) used in viscoity equation to define shape of curve. Pseudoplastic (n < 1), newtonian (n = 1), or a dilatant fluid (n > 1). Typical range = (0 ~ 1)",
			min: -100, max: 100, inc: 0.01, val: 0.0
		},
		dragAnisotropy:	{
			name: 'Drag Anisotropy',
			tooltip: "Creates a floating or sinking effect. Negative values = sinking effect. Positive values = floating effect. Typical range = (0 ~ 1)",
			min: -1000000, max: 1000000, inc: 0.01, val: 0.0
		},
		defaultDepth:	{
			name: 'Default Depth',
			tooltip: "The default depth in meters of the surface when the terrain is flat. Typical range = (0 ~ 0.15)",
			min: -100, max: 100,	inc: 0.01, val: 0.0
		},
		skidMarks: {
			name: 'Skid Marks',
			tooltip: 'To have or not to have skid marks. 0 = false and 1 = true.',
			min: 0, max: 1,	inc: 1, val: 0
		}
	}
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
		scope.total_param_rows = 11;
		scope.visible_param_rows = 1;
		scope.showAllSurfaces = false;
		scope.apply_button_enabled = true;
		scope.input_arr = [0,0,0,0,0,0,0,0,0,0,0];
		scope.show_param_modifier_rows =
		[true, false, false, false, false, false, false, false, false, false, false];

		scope.parameters = UI_TEXT.parameters;

		/*
		scope.paramters = [
			'staticFrictionCoefficient',
			'slidingFrictionCoefficient',
			'hydrodynamicFriction',
			'stribeckVelocity',
			'roughnessCoefficient',
			'fluidDensity',
			'flowConsistencyIndex',
			'flowBehaviorIndex',
			'dragAnisotropy',
			'defaultDepth',
			'skidMarks',
		]
		*/
		scope.parameter_options_arr = [
			{param: 'staticFrictionCoefficient', 	options: UI_TEXT.parameters},
			{param: 'slidingFrictionCoefficient', 	options: UI_TEXT.parameters},
			{param: 'hydrodynamicFriction', 		options: UI_TEXT.parameters},
			{param: 'stribeckVelocity', 			options: UI_TEXT.parameters},
			{param: 'roughnessCoefficient', 		options: UI_TEXT.parameters},
			{param: 'fluidDensity', 				options: UI_TEXT.parameters},
			{param: 'flowConsistencyIndex', 		options: UI_TEXT.parameters},
			{param: 'flowBehaviorIndex', 			options: UI_TEXT.parameters},
			{param: 'dragAnisotropy', 				options: UI_TEXT.parameters},
			{param: 'defaultDepth', 				options: UI_TEXT.parameters},
			{param: 'skidMarks', 					options: UI_TEXT.parameters}
		];


		scope.tooltip_arr = [null, null, null, null, null, null, null, null, null, null, null];

		scope.parameter_minmaxinc_arr = [
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0},
			{min: 0, max: 0, inc: 0}
		];

		//when resetting UI but not map, use saved values from Lua
		bngApi.engineLua(scope.extension_name + '.getCurrentSurfaceUIValue()', function(data) {

			if(data != null){
				scope.surface_options = {surface: data, options: UI_TEXT.surfaces};
			}
			else{
				scope.surface_options = {surface: 'ALL_SURFACES', options: UI_TEXT.surfaces};
			}
		});

		bngApi.engineLua(scope.extension_name + '.isSelectedParameterUIValueSet()', function(data) {
			if(data){
				function updateSelectedParameter(index){
					bngApi.engineLua(scope.extension_name + '.getSelectedParameterUIValue(' + index + ')', function(data2) {
						if(data2 != null){
							scope.parameter_options_arr[index].param = data2;
							updateUIValue(index);
						}
					});
				}
				for(var i = 0; i < scope.total_param_rows; i++){
					updateSelectedParameter(i);
				}
			}
		});

		//Store default data in memory and update values

		bngApi.engineLua(scope.extension_name + '.initValues()', function(data) {
			updateUIValues();
			onResizeEvent();
		});

		onResizeEvent();
	}

	//Display 'x' number of parameter modifiers based on height of app
	function showParamModifiers(height) {
		var init_height = 205;
		var row_height = 35;

		var table = document.getElementById("tableBody");

		//Initially, there are 4 rows (3 + 1 param_modifier row)
		var row_count = table.rows.length;
		var param_modifier_rows = row_count - 3

		var num_of_param_modifier_to_show = Math.trunc((height - init_height) / row_height) + 1;

		//Always show at least one
		num_of_param_modifier_to_show = Math.max(Math.min(num_of_param_modifier_to_show, scope.total_param_rows), 1);

		scope.visible_param_rows = num_of_param_modifier_to_show;

		for(var i = 0; i < scope.total_param_rows; i++){
			scope.show_param_modifier_rows[i] = false;
		}

		for(var i = 0; i < num_of_param_modifier_to_show; i++){
			scope.show_param_modifier_rows[i] = true;
		}
    }

	//Apply parameter value
	function setSurfaceParameter(index){
		var surface = scope.surface_options.surface;
		var param = scope.parameter_options_arr[index].param;
		var value = scope.input_arr[index];

		if(param == "skidMarks"){
			//Convert 0/1 into boolean value
			value = value == 1;
		}

		bngApi.engineLua(scope.extension_name + '.setSurfaceParameter("' + surface + '","' + param +'",' + value + ')');
	}

	//Update the UI values
	function updateUIValue(index){
		var surface = scope.surface_options.surface;
		var param = scope.parameter_options_arr[index].param;

		bngApi.engineLua(scope.extension_name + '.getSurfaceParameter("' + surface + '","' + param +'")', function(data) {
			var value = Math.round((data + Number.EPSILON) * 100) / 100;

			scope.input_arr[index] = value;

			checkForDuplicateSelectedParameters();
		});
	}

	//Update all UI values
	function updateUIValues(){
		//Set values to match current surface

		for(var i = 0; i < scope.total_param_rows; i++){
			updateUIValue(i);
		}
	}

	//Check if 2 or more of the same parameter is selected
	//If 2 >= then disable setting the parameter values
	function checkForDuplicateSelectedParameters(){
		var duplicate_found = false;

		for(var i = 0; i < scope.visible_param_rows; i++){
			var compare = scope.parameter_options_arr[i].param;

			for(var j = 0; j < scope.visible_param_rows; j++){
				if(i == j){
					continue;
				}

				var curr = scope.parameter_options_arr[j].param;

				if(curr == compare){
					duplicate_found = true;

					i = 9999;

					break;
				}
			}
		}

		scope.apply_button_enabled = !duplicate_found;
	}

	//Called when the app gets resized by user
	function onResizeEvent(){
		var height = element[0].offsetHeight;

		showParamModifiers(height);
		checkForDuplicateSelectedParameters();
	}

	//When user wants to pick surface from world
	scope.pickSurfaceFromWorld = function () {
		bngApi.engineLua(scope.extension_name + '.getGroundModelAtVehicle()', function(data) {
			if(data != null){
				scope.surface_options.surface = data;
				scope.changedSelectedSurface();
			}
		});
    };

	scope.changedInput = function (index){};

	//When selecting a different surface in UI
	scope.changedSelectedSurface = function () {
        updateUIValues();

		var curr_surface = scope.surface_options.surface;
		bngApi.engineLua(scope.extension_name + '.setCurrentSurfaceUIValue("' + curr_surface + '")');
    };

	//When user selects a different parameter in UI
	scope.changedSelectedParameter = function (index) {
		updateUIValue(index);

		var param = scope.parameter_options_arr[index].param;

		bngApi.engineLua(scope.extension_name + '.setSelectedParameterUIValue('+ index + ',"' + param + '")');
	};

	//Modify surface parameters from user values
	scope.applyChanges = function () {
		if(!scope.apply_button_enabled){
			return;
		}

		//Set values only from visible rows
		for(var i = 0; i < scope.visible_param_rows; i++){
			setSurfaceParameter(i);
		}

		var surface = scope.surface_options.surface;

		//Apply changes
		bngApi.engineLua(scope.extension_name + '.applyChanges("' + surface + '")');

		updateUIValues();
    };

	//Reset specific surfaces parameters to default settings
	scope.resetCurrentSurfaceGrip = function () {
		var surface = scope.surface_options.surface;

        bngApi.engineLua(scope.extension_name + '.resetSurface("' + surface + '")');

		updateUIValues();
    };

	//Reset all surfaces' parameters to default settings
	scope.resetAllGrip = function () {
		bngApi.engineLua(scope.extension_name + '.resetAllSurfaces()');

		updateUIValues();
    };

	//START
	init();

	//When the app gets resized
	scope.$on('app:resized', function (events, args){
		onResizeEvent();
	});

	// Make sure we clean up after closing the app.
	scope.$on('$destroy', function () {});

},
};
}]);