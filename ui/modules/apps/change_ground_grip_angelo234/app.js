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
		{ surface: 'SLIPPERY', 			txt: 'Slippery'      	},
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

	parameters: [
		{ param: 'staticFrictionCoefficient', 	txt: 'Static Friction (μ)'   			},
		{ param: 'slidingFrictionCoefficient', 	txt: 'Sliding Friction (μ)'   			},
		{ param: 'hydrodynamicFriction',		txt: 'Hydrodynamic Friction (μ)'		},
		{ param: 'stribeckVelocity', 			txt: 'Stribeck Velocity'   				},
		{ param: 'roughnessCoefficient', 		txt: 'Roughness'   						},
		{ param: 'fluidDensity', 				txt: 'Fluid Density'  					},
		{ param: 'flowConsistencyIndex', 		txt: 'Flow Consistency Index'			},
		{ param: 'flowBehaviorIndex', 			txt: 'Flow Behavior Index'  			},
		{ param: 'dragAnisotropy', 				txt: 'Drag Anisotropy'  				},
		{ param: 'defaultDepth', 				txt: 'Default Depth'  					},
		{ param: 'skidMarks', 					txt: 'Skid Marks'   					}	
	],
	
	parameter_minmaxinc: [
		{ param: 'staticFrictionCoefficient', 	min: -100, 		max: 50,		inc: 0.01  	},
		{ param: 'slidingFrictionCoefficient', 	min: -10, 		max: 50,   		inc: 0.01	},
		{ param: 'hydrodynamicFriction',		min: -1, 		max: 50, 		inc: 0.01	},
		{ param: 'stribeckVelocity', 			min: -100, 		max: 100, 		inc: 0.01	},
		{ param: 'roughnessCoefficient', 		min: 0, 		max: 1, 		inc: 0.01	},
		{ param: 'fluidDensity', 				min: -1000000, 	max: 1000000,  	inc: 0.1	},
		{ param: 'flowConsistencyIndex', 		min: -1000000, 	max: 1000000,	inc: 0.1	},
		{ param: 'flowBehaviorIndex', 			min: -100, 		max: 100,  		inc: 0.01	},
		{ param: 'dragAnisotropy', 				min: -1000000, 	max: 1000000,  	inc: 0.01	},
		{ param: 'defaultDepth', 				min: -100, 		max: 100,  		inc: 0.01	},
		{ param: 'skidMarks', 					min: 0, 		max: 1,  		inc: 1		},
	],

	parameter_tooltips: [
		{ param: 'staticFrictionCoefficient', 	txt: "Friction during normal driving and is usually higher than sliding friction. Typical range = (0.1 ~ 2)"															},
		{ param: 'slidingFrictionCoefficient',	txt: "Friction when tires are spinning out or locked up and is usually lower than static friction. Typical range = (0.1 ~ 1.5)"											},
		{ param: 'hydrodynamicFriction', 		txt: "Adds friction when sliding increases. Typical range = (0 ~ 0.1)"																									},
		{ param: 'stribeckVelocity', 			txt: "How abrupt the change is from static to sliding friction in m/s. Smaller values = very abrupt change. Typical range = (0.2 ~ 10)"									},
		{ param: 'roughnessCoefficient', 		txt: "How well types of tire treads grip the surface. Low values are better for slicks. High values are better for mud tires. Range = (0 ~ 1)"							},
		{ param: 'fluidDensity', 				txt: "Density of the 'surface' in kg/m^3. Larger values = More resistance"																								},
		{ param: 'flowConsistencyIndex', 		txt: "Coefficient used to scale the whole visocity equation in Pa*s^n. Typical range = (0 ~ 5000)"																		},
		{ param: 'flowBehaviorIndex', 			txt: "Exponent (n) used in viscoity equation to define shape of curve. Pseudoplastic (n < 1), newtonian (n = 1), or a dilatant fluid (n > 1). Typical range = (0 ~ 1)"	},
		{ param: 'dragAnisotropy', 				txt: "Creates a floating or sinking effect. Negative values = sinking effect. Positive values = floating effect. Typical range = (0 ~ 1)"								},
		{ param: 'defaultDepth', 				txt: "The default depth in meters of the surface when the terrain is flat. Typical range = (0 ~ 0.15)"																	},
		{ param: 'skidMarks',  					txt: 'To have or not to have skid marks. 0 = false and 1 = true.'																										}
	]
})

.directive('changeGroundGripAngelo234', ['UI_TEXT', 'bngApi', function (UI_TEXT, bngApi) {
return {
templateUrl: 'modules/apps/change_ground_grip_angelo234/app.html',
replace: true,
restrict: 'EA',
link: function (scope, element, attrs) {
	
	//FUNCTIONS

	function init(){
		// The current overlay screen the user is on (default: null)
		scope.overlayScreen = null;	
		scope.total_param_rows = 11;
		scope.visible_param_rows = 1;
		scope.showAllSurfaces = false;
		scope.apply_button_enabled = true;
		scope.input_arr = [0,0,0,0,0,0,0,0,0,0,0];
		scope.show_param_modifier_rows = 
		[true, false, false, false, false, false, false, false, false, false, false];
		
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

		//Set scope.tooltip_arr with tooltips based on parameters selected
		for(var i = 0; i < scope.total_param_rows; i++){
			var param_selection = scope.parameter_options_arr[i];
			
			for(var j = 0; j < UI_TEXT.parameter_tooltips.length; j++){
				var tooltip = UI_TEXT.parameter_tooltips[j];
				
				if(param_selection.param == tooltip.param){
					scope.tooltip_arr[i] = tooltip.txt;

					break;
				}
			}
		}

		//Set scope.parameter_minmaxinc_arr with min, max, and increment values, based on parameters selected
		for(var i = 0; i < scope.total_param_rows; i++){
			var param_selection = scope.parameter_options_arr[i];
			
			for(var j = 0; j < UI_TEXT.parameter_minmaxinc.length; j++){
				var parameter_minmaxinc = UI_TEXT.parameter_minmaxinc[j];
				
				if(param_selection.param == parameter_minmaxinc.param){
					scope.parameter_minmaxinc_arr[i].min = parameter_minmaxinc.min;
					scope.parameter_minmaxinc_arr[i].max = parameter_minmaxinc.max;
					scope.parameter_minmaxinc_arr[i].inc = parameter_minmaxinc.inc;

					break;
				}
			}
		}

		bngApi.engineLua('change_ground_grip_angelo234_getCurrentSurfaceUIValue()', function(data) {	
			//when resetting UI but not map, use value from Lua
			if(data != null){
				scope.surface_options = {surface: data, options: UI_TEXT.surfaces};	
			}
			else{
				scope.surface_options = {surface: 'ALL_SURFACES', options: UI_TEXT.surfaces};
			}	
		});	

		bngApi.engineLua('change_ground_grip_angelo234_isSelectedParameterUIValueSet()', function(data) {	
			if(data){
				function updateSelectedParameter(index){
					bngApi.engineLua('change_ground_grip_angelo234_getSelectedParameterUIValue(' + index + ')', function(data2) {
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
		
		bngApi.engineLua('change_ground_grip_angelo234_init()', function(data) {
			updateUIValues();
			onResizeEvent();
		});	
	}
	
	function onResizeEvent(){
		var height = element[0].offsetHeight;

		showParamModifiers(height);
		checkForDuplicateSelectedParameters();
	}
	
	function showParamModifiers(height) {
		var init_height = 205;
		var row_height = 35;
		
		var table = document.getElementById("tableToModify");

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
	
	function setSurfaceParameter(index){
		var surface = scope.surface_options.surface;
		var param = scope.parameter_options_arr[index].param;
		var value = scope.input_arr[index];	
		
		if(param == "skidMarks"){
			value = value == 1;		
		}

		bngApi.engineLua('change_ground_grip_angelo234_setSurfaceParameter("' + surface + '","' + param +'",' + value + ')');	
	}

	function updateUIValue(index){
		var surface = scope.surface_options.surface;
		var param = scope.parameter_options_arr[index].param;			
		
		bngApi.engineLua('change_ground_grip_angelo234_getSurfaceParameter("' + surface + '","' + param +'")', function(data) {
			var value = Math.round((data + Number.EPSILON) * 100) / 100;

			scope.input_arr[index] = value;
			
			checkForDuplicateSelectedParameters();
		});		

		//Update tooltip
		for(var j = 0; j < UI_TEXT.parameter_tooltips.length; j++){
			var tooltip = UI_TEXT.parameter_tooltips[j];
			
			if(param == tooltip.param){
				scope.tooltip_arr[index] = tooltip.txt;
				
				break;
			}
		}	

		//Update range of input values allowed
		for(var j = 0; j < UI_TEXT.parameter_minmaxinc.length; j++){
			var parameter_minmaxinc = UI_TEXT.parameter_minmaxinc[j];
			
			if(param == parameter_minmaxinc.param){
				scope.parameter_minmaxinc_arr[index].min = parameter_minmaxinc.min;
				scope.parameter_minmaxinc_arr[index].max = parameter_minmaxinc.max;
				scope.parameter_minmaxinc_arr[index].inc = parameter_minmaxinc.inc;

				break;
			}
		}
	}
	
	function updateUIValues(){
		//Set values to match current surface
		
		for(var i = 0; i < scope.total_param_rows; i++){
			updateUIValue(i);
		}
	}
	
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

	/* WIP for next update
	scope.changedShowAllSurfaces = function(){
		
	};
	*/
	
	scope.pickSurfaceFromWorld = function () {
		bngApi.engineLua('change_ground_grip_angelo234_getGroundModelAtVehicle()', function(data) {
			scope.surface_options.surface = data;	
			scope.changedSelectedSurface();
		});		
    };

	scope.changedInput = function (index){};

	//When selecting a different surface in UI
	scope.changedSelectedSurface = function () {
        updateUIValues();
		
		var curr_surface = scope.surface_options.surface;	
		bngApi.engineLua('change_ground_grip_angelo234_setCurrentSurfaceUIValue("' + curr_surface + '")');
    };
	
	scope.changedSelectedParameter = function (index) {
		updateUIValue(index);	

		var param = scope.parameter_options_arr[index].param;

		bngApi.engineLua('change_ground_grip_angelo234_setSelectedParameterUIValue('+ index + ',"' + param + '")');
	};

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
		bngApi.engineLua('change_ground_grip_angelo234_applyChanges("' + surface + '")');
		
		updateUIValues();
    };

	scope.resetCurrentSurfaceGrip = function () {
		var surface = scope.surface_options.surface;
		
        bngApi.engineLua('change_ground_grip_angelo234_resetSurface("' + surface + '")');

		updateUIValues();
    };

	scope.resetAllGrip = function () {
		bngApi.engineLua('change_ground_grip_angelo234_resetAllSurfaces()');
		
		updateUIValues();
    };

	//START

	init();


	//When the app gets resized
	scope.$on('app:resized', function (events, args){
		onResizeEvent();
	});

	// Make sure we clean up after closing the app.
	scope.$on('$destroy', function () {
		
	});

},
};
}]);