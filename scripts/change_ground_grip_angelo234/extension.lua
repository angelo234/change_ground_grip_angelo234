-- This Source Code Form is subject to the terms of the bCDDL, v. 1.1.
-- If a copy of the bCDDL was not distributed with this
-- file, You can obtain one at http://beamng.com/bCDDL-1.1.txt

--JS uses this value when resetting app but not level
local selected_surface_UI_value = nil
local selected_parameter_UI_value_arr = {}

local default_surfaces = {}
local surfaces = {}

local new_map = true

local imgui = ui_imgui

local M = {}

local function setDefaultParameters(surface)
	local value = {}
	
	local all_surfaces = false
	
	--If setting all surfaces, make its default value of type ASPHALT
	if surface == "ALL_SURFACES" then
		all_surfaces = true
		surface = "ASPHALT"
	end
	
	value["staticFrictionCoefficient"] = be:getGroundModel(surface).data["staticFrictionCoefficient"]
	value["slidingFrictionCoefficient"] = be:getGroundModel(surface).data["slidingFrictionCoefficient"]
	value["hydrodynamicFriction"] = be:getGroundModel(surface).data["hydrodynamicFriction"]
	value["stribeckVelocity"] = be:getGroundModel(surface).data["stribeckVelocity"]
	value["strength"] = be:getGroundModel(surface).data["strength"]
	value["roughnessCoefficient"] = be:getGroundModel(surface).data["roughnessCoefficient"]
	
	value["fluidDensity"] = be:getGroundModel(surface).data["fluidDensity"]
	value["flowConsistencyIndex"] = be:getGroundModel(surface).data["flowConsistencyIndex"]
	value["flowBehaviorIndex"] = be:getGroundModel(surface).data["flowBehaviorIndex"]	
	value["dragAnisotropy"] = be:getGroundModel(surface).data["dragAnisotropy"]
	--value["shearStrength"] = be:getGroundModel(surface).data["shearStrength"]
	value["shearStrength"] = 0
	value["defaultDepth"] = be:getGroundModel(surface).data["defaultDepth"]
	value["collisiontype"] = be:getGroundModel(surface).data["collisiontype"]
	value["skidMarks"] = be:getGroundModel(surface).data["skidMarks"]

	--To set ALL_SURFACES default values
	if all_surfaces then
		surface = "ALL_SURFACES"
	end

	default_surfaces[surface] = value
end

local function initValues()
	--Only reset values if opening new map and not when restarting UI
	if new_map == false then
		return
	end
	
	setDefaultParameters("ALL_SURFACES")
	setDefaultParameters("ASPHALT")
	setDefaultParameters("ASPHALT_OLD")
	setDefaultParameters("ASPHALT_PREPPED")
	setDefaultParameters("ASPHALT_WET")
	setDefaultParameters("COBBLESTONE")
	setDefaultParameters("DIRT")
	setDefaultParameters("DIRT_DUSTY")
	setDefaultParameters("DIRT_DUSTY_LOOSE")
	setDefaultParameters("GRASS")
	setDefaultParameters("GRAVEL")
	setDefaultParameters("ICE")
	setDefaultParameters("METAL")
	setDefaultParameters("METAL_TREAD")
	setDefaultParameters("MUD")
	setDefaultParameters("PLASTIC")
	setDefaultParameters("ROCK")
	setDefaultParameters("RUMBLE_STRIP")
	setDefaultParameters("SAND")
	--setDefaultParameters("SLIPPERY")
	setDefaultParameters("SNOW")
	setDefaultParameters("WOOD")
	
	--assign aliases
	
	default_surfaces["ASPHALT"]["aliases"] = {"groundmodel_asphalt1", "grid", "concrete", "concrete2"}
	default_surfaces["ASPHALT_WET"]["aliases"] = {"asphalt_wet2", "asphalt_wet3", "slippery"}	
	default_surfaces["ASPHALT_OLD"]["aliases"] = {"groundmodel_asphalt_old"}
	default_surfaces["ROCK"]["aliases"] = {"rock_cliff", "rocks_large"}
	default_surfaces["WOOD"]["aliases"] = {"groundmodel_wood1", "groundmodel_wood2"}
	default_surfaces["DIRT"]["aliases"] = {"dirt_grass", "derby_dirt"}
	default_surfaces["DIRT_DUSTY"]["aliases"] = {"rockydirt", "dirt_rocky", "dirt_rocky_large"}	
	default_surfaces["DIRT_DUSTY_LOOSE"]["aliases"] = {"dirt_loose_dusty", "dirt_sandy"}
	default_surfaces["GRAVEL"]["aliases"] = {"dirt_loose"}
	default_surfaces["GRASS"]["aliases"] = {"grass", "grass2", "grass3", "grass4", "forest", "forest_floor"}
	default_surfaces["SAND"]["aliases"] = {"beachsand", "sandtrap"}

	
	for surface in pairs(default_surfaces) do
		if surface == "ALL_SURFACES" then
			surfaces[surface] = be:getGroundModel("ASPHALT").data
		else
			surfaces[surface] = be:getGroundModel(surface).data
		end
		--This seems to obliterate vehicles if not zero
		surfaces[surface].shearStrength = 0
	end  
	
	new_map = false
	
end

local function isSurfaceThisGroundModel(focusPos, gmName)
	local col = ColorF(0, 0, 0, 0)
	local drawn = debugDrawer:renderGroundModelDebug(0, gmName, col, 0.1, 0.1, focusPos:toPoint3F(), 0.1)

	return drawn > 0
end

local function getGroundModelAtVehicle()
	local debugtype = 0
	
	if be:getPlayerVehicle(0) then
		local pos = vec3(be:getPlayerVehicle(0).obj:getPosition())

		debugDrawer:drawSphere(pos:toPoint3F(), 0.03, ColorF(0,1,0,1))

		for surface in pairs(default_surfaces) do
			if surface ~= "ALL_SURFACES" then
				
				--Check each surface
				local result = isSurfaceThisGroundModel(pos, surface)	
					
				if result then
					return surface
				end
				
				--Then check surface's aliases
				if default_surfaces[surface]["aliases"] ~= nil then
					for i, alias_surface in pairs(default_surfaces[surface]["aliases"]) do
						local result_alias = isSurfaceThisGroundModel(pos, alias_surface)	
					
						if result_alias then
							return surface
						end
					end 
				end	
			end
		end  
	end	
	
	return nil
end

local function getSurfaceParameter(surface, param)
	return surfaces[surface][param]
end

local function setSurfaceParameter(surface, param, value)
	surfaces[surface][param] = value
	
	--If ALL_SURFACES, then set all surface as same param and value
	if surface == "ALL_SURFACES" then
		for other_surface in pairs(surfaces) do
			if other_surface ~= "ALL_SURFACES" then
				surfaces[other_surface][param] = value
			end
		end
	end
end

local function getDefaultSurfaceParameter(surface, param)
	return default_surfaces[surface][param]
end

local function resetSurface(surface)
	for param, value in pairs(default_surfaces[surface]) do
	
		if param ~= "aliases" then
			surfaces[surface][param] = value
		end
	end  

	if surface == "ALL_SURFACES" then
		for other_surface in pairs(surfaces) do
			if other_surface ~= "ALL_SURFACES" then
				resetSurface(other_surface)
			end	
		end 
	
		return
	end
	
	be:setGroundModel(surface, surfaces[surface])
	
	--Apply groundmodel to aliases if there are aliases
	if default_surfaces[surface]["aliases"] ~= nil then
		for i, alias_surface in pairs(default_surfaces[surface]["aliases"]) do
			be:setGroundModel(alias_surface, surfaces[surface])
		end 
	end
end

local function resetAllSurfaces()
	resetSurface("ALL_SURFACES")
end

local function applyChanges(surface)
	--If ALL_SURFACES is selcted, apply its groundmodel to all other surfaces
	if surface == "ALL_SURFACES" then
		for other_surface in pairs(surfaces) do
			if other_surface ~= "ALL_SURFACES" then
				applyChanges(other_surface)
			end	
		end  
		return
	end

	be:setGroundModel(surface, surfaces[surface])
	
	--Apply groundmodel to aliases if there are aliases
	if default_surfaces[surface]["aliases"] ~= nil then
		for i, alias_surface in pairs(default_surfaces[surface]["aliases"]) do
			be:setGroundModel(alias_surface, surfaces[surface])
		end 
	end
	
end

local function getCurrentSurfaceUIValue()
	return selected_surface_UI_value
end


local function setCurrentSurfaceUIValue(surface)
	selected_surface_UI_value = surface
end

local function isSelectedParameterUIValueSet()
	local count = 0
  	for _ in pairs(selected_parameter_UI_value_arr) do 
  		count = count + 1
  	end

  	return count > 0
end

local function getSelectedParameterUIValue(index)
	return selected_parameter_UI_value_arr[index]
end


local function setSelectedParameterUIValue(index, param)
	selected_parameter_UI_value_arr[index] = param
end

local function onClientPreStartMission(mission)
	--need this so that default values don't get overriden while on same map
	--when restarting UI like when clicking on 'settings' UI
	new_map = true
	selected_surface_UI_value = nil
	selected_parameter_UI_value_arr = {}
end


M.onClientPreStartMission = onClientPreStartMission

M.initValues = initValues
M.getGroundModelAtVehicle = getGroundModelAtVehicle
M.getSurfaceParameter = getSurfaceParameter
M.setSurfaceParameter = setSurfaceParameter
M.getDefaultSurfaceParameter = getDefaultSurfaceParameter
M.resetSurface = resetSurface
M.resetAllSurfaces = resetAllSurfaces
M.applyChanges = applyChanges
M.getCurrentSurfaceUIValue = getCurrentSurfaceUIValue
M.setCurrentSurfaceUIValue = setCurrentSurfaceUIValue
M.isSelectedParameterUIValueSet = isSelectedParameterUIValueSet
M.getSelectedParameterUIValue = getSelectedParameterUIValue
M.setSelectedParameterUIValue = setSelectedParameterUIValue

return M