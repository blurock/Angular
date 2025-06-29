package esblurock.info.neo4j.utilities;


import org.neo4j.driver.AuthToken;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;


public class Neo4JInitialization {


    // tag::initDriver[]
    public static Driver initDriver() {
    AuthToken auth = AuthTokens.basic(getNeo4jUsername(), getNeo4jPassword());
    Driver driver = GraphDatabase.driver(getNeo4jUri(), auth);
    driver.verifyConnectivity();
    return driver;
    }
    // end::initDriver[]

    static int getServerPort() {
        return Integer.parseInt(System.getProperty("APP_PORT", "3000"));
    }

    static String getJwtSecret() {
        return System.getenv("JWT_SECRET");
    }

    static String getNeo4jUri() {
        return System.getenv("NEO4J_URI");
    }
    static String getNeo4jUsername() {
        return System.getenv("NEO4J_USERNAME");
    }
    static String getNeo4jPassword() {
        return System.getenv("NEO4J_PASSWORD");
    }



}
