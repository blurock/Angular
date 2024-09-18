package esblurock.info.respecth.services;

import java.util.logging.Logger;

import org.apache.jena.query.ARQ;
import org.eclipse.jetty.annotations.AnnotationConfiguration;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;

public class ServerMain {

	public static void main(String[] args) {
		ARQ.init();

	}

}
