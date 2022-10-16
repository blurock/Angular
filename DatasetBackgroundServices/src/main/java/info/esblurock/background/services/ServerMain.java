package info.esblurock.background.services;

import java.io.File;
import java.net.URL;

import org.apache.jena.query.ARQ;
import org.eclipse.jetty.annotations.AnnotationConfiguration;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;
import info.esblurock.background.services.service.BackgroundService;
import info.esblurock.background.services.service.BackgroundTransaction;
import info.esblurock.background.services.ontology.CatalogInformationServlet;
import info.esblurock.background.services.HelloAppEngine;

/**
 * Starts up the server, including a DefaultServlet that handles static files,
 * and any servlet classes annotated with the @WebServlet annotation.
 */
public class ServerMain {

  public static void main(String[] args) throws Exception {

    // Create a server that listens on port 8080.
    Server server = new Server(8080);
    WebAppContext webAppContext = new WebAppContext();
    server.setHandler(webAppContext);

    // Load static content from inside the jar file.
    /*
    URL webAppDir =
        ServerMain.class.getClassLoader().getResource("META-INF/resources");
    webAppContext.setResourceBase(webAppDir.toURI().toString());
*/
    // Enable annotations so the server sees classes annotated with @WebServlet.
    webAppContext.setConfigurations(new Configuration[]{ 
      new AnnotationConfiguration(),
      new WebInfConfiguration(), 
    });

    // Look for annotations in the classes directory (dev server) and in the
    // jar file (live server)
    ARQ.init();
    webAppContext.setAttribute(
        "org.eclipse.jetty.server.webapp.ContainerIncludeJarPattern", 
        ".*/target/classes/|.*\\.jar");

    // Handle static resources, e.g. html files.
    webAppContext.addServlet(DefaultServlet.class, "/");
    //String p = "/Users/edwardblurock/git/Angular/DatasetBackgroundServices/src/main/webapp";
    //String p = "/Users/edwardblurock/git/Angular/SystemWithAuthentification/dist/SystemWithAuthentification";
    webAppContext.setResourceBase(
            ServerMain.class
            .getClassLoader()
            .getResource("webapp")
            .toExternalForm());

    // Handle static resources, e.g. html files.
    //webAppContext.addServlet(BackgroundService.class, "/service");
    //webAppContext.addServlet(BackgroundTransaction.class, "/transaction");
    //webAppContext.addServlet(CatalogInformationServlet.class, "/cataloginfo");
    //webAppContext.addServlet(HelloAppEngine.class, "/");

    // Start the server! 🚀
    server.start();
    System.out.println("Server started!");

    // Keep the main thread alive while the server is running.
    server.join();
  }
}