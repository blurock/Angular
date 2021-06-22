package info.esblurock.document;

public class LineCommands {

	public static void main(String[] args) {
		String command = args[0];
		if(command.equals("Help")) {
			commands();
		} else {
			System.out.println("No Line Command Given");
		}

	}
	public static void commands() {
		System.out.println("No commands setup yet");
	}

}
