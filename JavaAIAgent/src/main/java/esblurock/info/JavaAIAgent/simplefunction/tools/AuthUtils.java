package esblurock.info.JavaAIAgent.simplefunction.tools;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.IdTokenProvider;

public class AuthUtils {
	public static String getOidcToken(String audience) {
        // 1. Get Application Default Credentials (ADC)
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();

        // 2. Check if we can provide an ID Token (OIDC)
        if (credentials instanceof IdTokenProvider) {
            // This works when running on GCP (Cloud Run, App Engine, GCE)
            // or when using a Service Account JSON key locally.
            return ((IdTokenProvider) credentials).idTokenWithAudience(audience, null).getTokenValue();
        } else {
            throw new RuntimeException("Credentials cannot provide an OIDC token. " +
                "Ensure you are using a Service Account.");
        }
    }
}
