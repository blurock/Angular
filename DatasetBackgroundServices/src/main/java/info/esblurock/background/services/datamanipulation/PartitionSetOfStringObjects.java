/**
 * 
 */
package info.esblurock.background.services.datamanipulation;

import java.util.StringTokenizer;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.esblurock.background.services.utilities.XMLUtilityRoutines;
import info.esblurock.reaction.core.ontology.base.constants.AnnotationObjectsLabels;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import jThergas.data.read.JThergasTokenizer;
import jThergas.exceptions.JThergasReadException;

/**
 * @author edwardblurock
 *
 */
public enum PartitionSetOfStringObjects {
	PartitionTherGasThermodynamics {

		@Override
		void partition(JsonArray partitionarr, JsonObject info, String content) {
			JThergasTokenizer tokenizer = new JThergasTokenizer(content);
			int count = 0;
			while (tokenizer.countTokens() > 2) {
				String owner = info.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
				String transactionID = info.get(ClassLabelConstants.TransactionID).getAsString();
				JsonObject block = BaseCatalogData.createStandardDatabaseObject(
						"dataset:RepositoryTherGasThermodynamicsBlock", owner, transactionID, "false");
				JsonObject thermoblock = block.get(ClassLabelConstants.RepositoryThermoPartitionBlock)
						.getAsJsonObject();
				try {
					tokenizer.readBlock();
					thermoblock.addProperty(ClassLabelConstants.ThermodynamicsTherGasLine1, tokenizer.line1);
					thermoblock.addProperty(ClassLabelConstants.ThermodynamicsTherGasLine1a, tokenizer.line1a);
					thermoblock.addProperty(ClassLabelConstants.ThermodynamicsTherGasLine2, tokenizer.line2);
					thermoblock.addProperty(ClassLabelConstants.ThermodynamicsTherGasLine3, tokenizer.line3);
					thermoblock.addProperty(ClassLabelConstants.Position, count);
					partitionarr.add(block);
					count++;
				} catch (JThergasReadException e) {
					partitionarr.add(block);
					count++;
				}
			}
		}

		@Override
		String getBlockClass() {
			return "dataset:RepositoryTherGasThermodynamicsBlock";

		}

	},
	PartitionToLineSet {

		@Override
		void partition(JsonArray partitionarr, JsonObject info, String content) {
			int sze = info.get(ClassLabelConstants.BlockLineCount).getAsInt();
			System.out.println("PartitionToLineSet: Size of Partition: " + sze);
			StringTokenizer tok = new StringTokenizer(content, "\n");
			int count = sze;
			int position = 0;
			JsonArray linearr = new JsonArray();
			String owner = info.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transactionID = info.get(ClassLabelConstants.TransactionID).getAsString();
			while (tok.hasMoreElements()) {
				if (count > 0) {
					linearr.add(tok.nextToken());
					count--;
				}
				if (count == 0) {
					JsonObject block = BaseCatalogData.createStandardDatabaseObject(
							"dataset:RepositoryParsedToFixedBlockSize", owner, transactionID, "false");
					block.add(ClassLabelConstants.ParsedLine, linearr);
					block.addProperty(ClassLabelConstants.ElementCount, sze);
					block.addProperty(ClassLabelConstants.Position, position);
					partitionarr.add(block);
					linearr = new JsonArray();
					count = sze;
					position++;
				}
			}
		}

		@Override
		String getBlockClass() {
			return "dataset:RepositoryParsedToFixedBlockSize";

		}

	}, PartitionXMLListOfCatalogObjects {

		@Override
		void partition(JsonArray partitionarr, JsonObject info, String content) {
			String catalogid = info.get(ClassLabelConstants.FileSourceFormat).getAsString();
			String[] blocks = XMLUtilityRoutines.parseObjectsFromXMLString(content, catalogid);
			String owner = info.get(ClassLabelConstants.CatalogObjectOwner).getAsString();
			String transactionID = info.get(ClassLabelConstants.TransactionID).getAsString();
			for(int position = 0; position < blocks.length;position++) {
				String portion = blocks[position];
				JsonArray linearr = new JsonArray();
				linearr.add(portion);
					JsonObject block = BaseCatalogData.createStandardDatabaseObject(
							"dataset:RepositoryParsedToFixedBlockSize", owner, transactionID, "false");
					block.add(ClassLabelConstants.ParsedLine, linearr);
					block.addProperty(ClassLabelConstants.ElementCount, portion.length());
					block.addProperty(ClassLabelConstants.Position, position);
					partitionarr.add(block);
			}
		}

		@Override
		String getBlockClass() {
			return "dataset:RepositoryParsedToFixedBlockSize";

		}

	};

	abstract void partition(JsonArray partitionarr, JsonObject info, String content);

	abstract String getBlockClass();

	/**
	 * @param info    The activity information (here )
	 * @param content The string holding the content to be parsed.
	 * @return The set of partition objects
	 * 
	 *         The partition catalog objects are specific subclasses of
	 *         RepositoryDataPartitionBlock corresponding to type of partitioning.
	 * 
	 *         The activity info is used to get:
	 *         <ul>
	 *         <li>used to get BlockLineCount, if it exists
	 *         <li>The method of partitioning (FilePartitionMethod)
	 *         <ul>
	 */
	public static JsonArray partitionString(JsonObject info, String content) {
		JsonArray partitionarr = new JsonArray();
		PartitionSetOfStringObjects method = getMethod(info);
		method.partition(partitionarr, info, content);
		return partitionarr;
	}

	private static PartitionSetOfStringObjects getMethod(JsonObject info) {
		String methodS = info.get(ClassLabelConstants.FilePartitionMethod).getAsString();
		String methodkey = methodS.substring(8);
		return PartitionSetOfStringObjects.valueOf(methodkey);

	}

	public static String getBlockClass(JsonObject info) {
		PartitionSetOfStringObjects method = getMethod(info);
		return method.getBlockClass();
	}

}
