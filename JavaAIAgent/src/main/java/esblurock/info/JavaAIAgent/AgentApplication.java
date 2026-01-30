package esblurock.info.JavaAIAgent;

import java.io.File;

import org.eclipse.jetty.annotations.AnnotationConfiguration;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.JettyWebXmlConfiguration;
import org.eclipse.jetty.webapp.MetaInfConfiguration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;
import org.eclipse.jetty.webapp.WebXmlConfiguration;
import org.eclipse.jetty.servlet.ServletHolder;

import esblurock.info.JavaAIAgent.background.SimpleLLMServlet;

public class AgentApplication {
	public static void main(String[] args) throws Exception {
		Server server = new Server(8080);

		WebAppContext webapp = new WebAppContext();
		webapp.setContextPath("/");
		webapp.setResourceBase("src/main/webapp");
		webapp.setDefaultsDescriptor(null);

		// 2. Standard Configurations for Jetty 11 Jakarta scanning
		webapp.setConfigurations(new Configuration[] { new AnnotationConfiguration(), new WebXmlConfiguration(),
				new WebInfConfiguration(), new JettyWebXmlConfiguration(), new MetaInfConfiguration() });

		webapp.setExtraClasspath("target/classes");
		webapp.setAttribute("org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern",
				".*/target/classes/.*|.*[\\\\/]target[\\\\/]classes[\\\\/].*");

		server.setHandler(webapp);
		System.out.println("Starting Agent Server with Annotation Discovery...");
		server.start();
		server.join();
	}
}