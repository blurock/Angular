package info.esblurock.core.ontologybase;

import static org.junit.Assert.assertTrue;

import org.apache.jena.ontology.OntModel;
import org.junit.Test;
import info.esblurock.core.ontologybase.OntologyBase;
import info.esblurock.core.ontologybase.dataset.DatasetOntologyParseBase;
import org.apache.log4j.BasicConfigurator;  
import org.apache.log4j.LogManager;  
import org.apache.log4j.Logger;  

/**
 * Unit test for simple App.
 */
public class AppTest 
{
	private static final Logger logger = LogManager.getLogger(AppTest.class);  
   /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue()
    {
        assertTrue( true );
        BasicConfigurator.configure();  
        logger.info("Hello world");  
        logger.info("we are in logger info mode");  
           }
}
