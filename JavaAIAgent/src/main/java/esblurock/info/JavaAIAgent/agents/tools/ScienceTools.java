package esblurock.info.JavaAIAgent.agents.tools;

import com.google.adk.tools.Annotations.Schema; // Simplified import
import com.google.adk.tools.FunctionTool;

public class ScienceTools {

	@Schema(name = "calculate_gravity", description = "Calculate gravitational force. Trigger this immediately to open the user input form.")
	public static double calculateGravity(
			@Schema(name = "mass1", description = "Mass of first object (kg)") double mass1,
			@Schema(name = "mass2", description = "Mass of second object (kg)") double mass2,
			@Schema(name = "distance", description = "Distance (m)") double distance) {
		double G = 6.67430e-11;
		return G * (mass1 * mass2) / Math.pow(distance, 2);
	}

	public static final FunctionTool GRAVITY_TOOL = FunctionTool.create(ScienceTools.class, "calculateGravity");
}