package info.esblurock.background.services.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Base64;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import info.esblurock.background.services.dataset.user.GetUserAccountAndDatabasePersonProcess;
import info.esblurock.background.services.firestore.InitiallizeSystem;
import info.esblurock.background.services.firestore.ReadFirestoreInformation;
import info.esblurock.background.services.firestore.WriteFirestoreCatalogObject;
import info.esblurock.background.services.servicecollection.DatabaseServicesBase;
import info.esblurock.background.services.transaction.TransactionProcess;
import info.esblurock.reaction.core.ontology.base.constants.ClassLabelConstants;
import info.esblurock.reaction.core.ontology.base.dataset.BaseCatalogData;
import info.esblurock.reaction.core.ontology.base.dataset.CreateDocumentTemplate;
import info.esblurock.reaction.core.ontology.base.hierarchy.CreateHierarchyElement;
import info.esblurock.reaction.core.ontology.base.utilities.JsonObjectUtilities;

@WebServlet(name = "LoginService", urlPatterns = { "/login" })
public class LoginService extends HttpServlet {

    private static final long serialVersionUID = 1L;

    /**
     * POST The input is one JSON argument (read in using InputStream). The argument
     * 'service' determines which service is to be performed
     * {@link DatabaseServicesBase} processes the data with the service.
     * 
     * The response is application/json
     *
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        InitiallizeSystem.initialize();
        Document document = MessageConstructor.startDocument("First Login");
        String bodyS = IOUtils.toString(request.getInputStream(), "UTF-8");
        
        String authHeader = request.getHeader("authorization");
        String idToken = authHeader.split(" ")[1];
        FirebaseToken decodedToken;
        try {
            System.out.println("idToken: " + idToken);
            decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
           
            Element body = MessageConstructor.isolateBody(document);
            body.addElement("div").addText("Token: " + idToken);
            body.addElement("div").addText("UID from token: " + uid);
            JsonObject databody = JsonObjectUtilities.jsonObjectFromString(bodyS);

            JsonObject userdata = databody.get("user").getAsJsonObject();
            String uidFromClient = userdata.get("uid").getAsString();
            String email = userdata.get("email").getAsString();
            String username = email;
            JsonElement name = userdata.get("displayname");
            if(name != null && name.isJsonObject()) {
                username = userdata.get("displayname").getAsString();
            }
            
            String authtype = userdata.get("providerId").getAsString();
            body.addElement("div").addText("UID from client: " + uidFromClient);
            body.addElement("div").addText("email from client: " + email);
            body.addElement("div").addText("username from client: " + username);
            JsonObject answer = null;
            if (uid.equals(uidFromClient)) {

                String service = databody.get("service").getAsString();

                if (service.equals("dataset:FirstLoginService")) {
                    answer = firstLogin(document, uid, idToken, email, username,authtype);
                } else {
                    answer = DatabaseServicesBase.standardErrorResponse(document, "No Login service: " + service, null);
                }
            } else {
                answer = DatabaseServicesBase.standardErrorResponse(document, "UIDs do not match", null);
            }
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(JsonObjectUtilities.toString(answer));
            out.flush();
        } catch (FirebaseAuthException e) {
            JsonObject answer = DatabaseServicesBase.standardErrorResponse(document,
                    "Error in Authorization: Login session expired\n" + e.getMessage(), null);
            
            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(JsonObjectUtilities.toString(answer));
            out.flush();
           // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    private JsonObject firstLogin(Document document, String uid, String idToken, String email, String username, String authtype) {

        JsonObject response = null;

        JsonObject empty = CreateDocumentTemplate.createTemplate("dataset:LoginAccountInformation");
        JsonObject firestoreid = CreateHierarchyElement.searchForCatalogObjectInHierarchyTemplate(empty);
        firestoreid.addProperty(ClassLabelConstants.SimpleCatalogName, uid);
        JsonObject loginaccountresponse = ReadFirestoreInformation.readFirestoreCatalogObject(firestoreid);
        if (loginaccountresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
            JsonObject loginaccount = loginaccountresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonObject();
            JsonObject firstloginresponse = new JsonObject();
            firstloginresponse.add(ClassLabelConstants.LoginAccountInformation, loginaccount);

            JsonObject getnewaccount = new JsonObject();
            getnewaccount.addProperty(ClassLabelConstants.UID, uid);
            JsonObject newaccountresponse = GetUserAccountAndDatabasePersonProcess.get(getnewaccount);
            if (newaccountresponse.get(ClassLabelConstants.ServiceProcessSuccessful).getAsBoolean()) {
                JsonArray objarr = newaccountresponse.get(ClassLabelConstants.SimpleCatalogObject).getAsJsonArray();
                JsonObject pair = objarr.get(0).getAsJsonObject();
                JsonObject useraccount = pair.get(ClassLabelConstants.UserAccount).getAsJsonObject();
                JsonObject person = pair.get(ClassLabelConstants.DatabasePerson).getAsJsonObject();

                firstloginresponse.add(ClassLabelConstants.DatabasePerson, person);
                firstloginresponse.add(ClassLabelConstants.UserAccount, useraccount);
                firstloginresponse.addProperty(ClassLabelConstants.LoginStage, "dataset:LoginRegistration");
                JsonArray arr = new JsonArray();
                arr.add(firstloginresponse);
                response = DatabaseServicesBase.standardServiceResponse(document,
                        "Successful creation of LoginAccountInformation", arr);
            } else {
                 firstloginresponse.addProperty(ClassLabelConstants.LoginStage, "dataset:LoginAccountInformation");
                JsonArray arr = new JsonArray();
                arr.add(firstloginresponse);
                response = DatabaseServicesBase.standardServiceResponse(document,
                        "LoginAccountInformation exists, but not Account info: ", arr);
            }
        } else {
            JsonObject loginaccount = CreateDocumentTemplate.createTemplate("dataset:LoginAccountInformation");
            loginaccount.addProperty(ClassLabelConstants.UID, uid);
            loginaccount.addProperty(ClassLabelConstants.Email, email);
            loginaccount.addProperty(ClassLabelConstants.IDToken, idToken);
            loginaccount.addProperty(ClassLabelConstants.username, username);
            loginaccount.addProperty(ClassLabelConstants.AuthorizationType, authtype);
            assignAccountRole(loginaccount);
            BaseCatalogData.insertStandardBaseInformation(loginaccount, uid, uid, "false");
            JsonObject firstloginresponse = new JsonObject();
            firstloginresponse.add(ClassLabelConstants.LoginAccountInformation, loginaccount);
            firstloginresponse.addProperty(ClassLabelConstants.LoginStage, "dataset:LoginAuthenticated");
            try {
                WriteFirestoreCatalogObject.writeCatalogObjectWithException(loginaccount);
                JsonArray arr = new JsonArray();
                arr.add(firstloginresponse);
                response = DatabaseServicesBase.standardServiceResponse(document,
                        "Successful creation of LoginAccountInformation", arr);
            } catch (Exception ex) {
                response = DatabaseServicesBase.standardErrorResponse(document,
                        "Error in writing LoginAccountInformation: " + ex.getMessage(), null);
            }
        }

        return response;
    }

    private void assignAccountRole(JsonObject accountinfo) {
        String role = "dataset:StandardUser";
        String email = accountinfo.get(ClassLabelConstants.Email).getAsString();
        if (email.equals("edward.blurock@gmail.com")) {
            role = "dataset:Administrator";
        }
        accountinfo.addProperty(ClassLabelConstants.UserAccountRole, role);
    }

}
