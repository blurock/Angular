package info.esblurock.background.services;


import java.util.logging.Logger;

import org.apache.jena.query.ARQ;
import org.eclipse.jetty.annotations.AnnotationConfiguration;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;

import info.esblurock.background.services.firestore.InitiallizeSystem;
import info.esblurock.background.services.ontology.CatalogInformationServlet;


/**
 * Starts up the server, including a DefaultServlet that handles static files,
 * and any servlet classes annotated with the @WebServlet annotation.
 */
public class ServerMain {

  public static void main(String[] args) throws Exception {
  System.out.println("---------------------------------ServerMain-----------------------------");
    // Create a server that listens on port 8080.
    Server server = new Server(8080);
    WebAppContext webAppContext = new WebAppContext();
    server.setHandler(webAppContext);

    // Enable annotations so the server sees classes annotated with @WebServlet.
    webAppContext.setConfigurations(new Configuration[]{ 
      new AnnotationConfiguration(),
      new WebInfConfiguration(), 
    });

    // Look for annotations in the classes directory (dev server) and in the
    // jar file (live server)

    webAppContext.setAttribute(
        "org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern", 
        ".*/target/classes/|.*\\.jar");

    webAppContext.addServlet(DefaultServlet.class, "/");
    webAppContext.setResourceBase(
            ServerMain.class
            .getClassLoader()
            .getResource("webapp")
            .toExternalForm());

    System.out.println("---------------------------------ServerMain-----------------------------");    
    ARQ.init();
    // Start the server! 🚀
    server.start();
    System.out.println("Server started!");
    Logger.getLogger("Main").info("Starting Server");
    // Keep the main thread alive while the server is running.
    server.join();
  }
}