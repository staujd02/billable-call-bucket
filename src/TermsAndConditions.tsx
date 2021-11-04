import React from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AppColorStyles, AppFontStyles } from "../styles/default";
import { TermsAndConditionsProps } from "../types/routes";
import AppButton from "./control/AppButton";

const TermsAndConditions = ({ navigation }: TermsAndConditionsProps) => {
  return (
    <View style={styles.column}>
      <Text style={styles.terms}>Terms and Conditions</Text>
      <ScrollView>
        <Text>{Terms}</Text>
        <View style={styles.sizeController}>
          <AppButton title="I agree to these terms" onPress={() => navigation.navigate('ThirdPartyAuthentication')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  terms: {
    color: AppColorStyles.text,
    textAlign: 'center',
    fontSize: AppFontStyles.titleSize,
    marginTop: 10,
    marginBottom: 10,
  },
  sizeController: {
    padding: 15,
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
    height: 2,
    backgroundColor: "#0f1247",
  }
});

export default TermsAndConditions;

const Terms = `The term “app store” refers to the app store where this software was purchased or acquired. 

You assert to your fullest knowledge and understanding that this software application (App) will be used for your corporation’s business or enterprise Customer Relationship Management (CRM) needs. 

Should you use this software for any purpose other than your corporation’s CRM needs, it shall not affect the app store’s evaluation of this software’s compliance to the app store’s specification which are necessary to remain listed and sellable. 

In the course of using this app, when you are prompted to authenticate with any third-party authentication or identity providers, you assert that you are utilizing your corporate login. 

You understand when you are prompted to authenticate with any third-party authenticator or identity provider it is exclusively for the purpose of establishing the authenticity of your corporate identity. Your authentication is not intended to prevent unauthorized access of information captured in this app in the course of its usage. You understand after verifying the authenticity of your corporate identity no further challenges of identity will be presented to ensure the subsequent users of this app on this device are the same individual who passed the initial corporate identity verification. To keep information captured in this application private and secure, you should enable your devices security offerings such as a lock screen pin code, facial identity recognition features, or other biometric security offerings. If you do not find this satisfactory, you should not agree to the Terms and promptly uninstall this app.

You understand these Terms to be an addendum to the Terms and Conditions outlined in the app store. If any provision of these Terms is determined to be conflict with the Terms and Conditions outlined in the app store, the addendum provision shall overrule the conflicting provision outlined in the Terms and Conditions listed on the app store. 

If any provision of these Terms is determined to be invalid, illegal, or unenforceable, it shall not affect the enforceability of any other provision of these Terms. Rather, the invalid, illegal, or unenforceable provision shall be modified so that it is valid, legal, and enforceable and to the fullest extent possible, reflects the intention of the parties. 

The creator of this app shall not be liable (whether under contract, tort (including negligence) or otherwise) for: 

(a) losses that were not caused by the app creator’s breach of these Terms; 

(b) any loss or damage that was not, at the time the relevant contract with you was formed, a reasonably foreseeable consequence of the app creator breaching these Terms; 

(c) losses relating to any business of yours, loss of profits, or loss of opportunity; or 

(d) loss of data stored on the Device, or inability to access data. 

Nothing in these Terms is intended to exclude or limit the app creator's liability for: (i) death or personal injury; (ii) fraud; (iii) fraudulent misrepresentation; (iv) any implied terms as to title which cannot be excluded or limited by law; or (v) any liability that cannot be excluded or limited by law. `;