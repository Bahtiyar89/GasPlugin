import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
//import { TextInputMask } from 'react-native-masked-text';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import I18n from '../../../i18';

import styles from './styles';

interface IState {
  model: boolean;
  okPressed: (params: any) => void;
  noPressed: () => void;
}

const AdressBookModal: React.FC<IState> = ({
  okPressed,
  noPressed,
  model,
}: IState) => {
  const [language, seTlanguage] = useState('');

  const elements = {
    sender: '',
    receiver: '',
    adress: '',
    contact_person: '',
    phone: '',
  };

  const [addAdress, seTaddAdress] = useState({ ...elements });

  const validationElements = {
    sender: false,
    receiver: false,
    adress: false,
    contact_person: false,
    phone: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const validation = () => {
    let err = false;
    if (addAdress.sender.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender: false });
      }, 1000);
    }
    if (addAdress.receiver.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, receiver: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, receiver: false });
      }, 1000);
    }
    if (addAdress.adress.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, adress: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, adress: false });
      }, 1000);
    }
    if (addAdress.contact_person.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, contact_person: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, contact_person: false });
      }, 1000);
    }
    if (addAdress.phone.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, phone: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, phone: false });
      }, 1000);
    }
    return err;
  };

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed(language);
    }
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <Modal isVisible={model}>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.modelContainer}>
              <Text style={styles.modelHeaderText}>{I18n.t('add_adress')}</Text>
              <View style={styles.modelTextAndError}>
                <Text style={{ flex: 1 }}>{I18n.t('sender')}</Text>
                <HelperText
                  style={styles.modelHelperText}
                  type="error"
                  visible={validObj.sender}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                placeholder="Александр Грачев"
                mode="outlined"
                right={<TextInput.Icon name="lead-pencil" />}
                onChangeText={val =>
                  seTaddAdress({ ...addAdress, sender: val })
                }
                value={addAdress.sender}
              />

              <View style={styles.modelTextAndError}>
                <Text style={{ flex: 1 }}>{I18n.t('reciver')}</Text>
                <HelperText
                  style={styles.modelHelperText}
                  type="error"
                  visible={validObj.receiver}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                placeholder="Максим Егоров"
                mode="outlined"
                right={<TextInput.Icon name="lead-pencil" />}
                onChangeText={val =>
                  seTaddAdress({ ...addAdress, receiver: val })
                }
                value={addAdress.receiver}
              />

              <View style={styles.modelTextAndError}>
                <Text style={{ flex: 1 }}>{I18n.t('adress')}</Text>
                <HelperText
                  style={styles.modelHelperText}
                  type="error"
                  visible={validObj.adress}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                placeholder="Москва, ул. Леонова, д. 35, стр. 1"
                mode="outlined"
                right={<TextInput.Icon name="lead-pencil" />}
                onChangeText={val =>
                  seTaddAdress({ ...addAdress, adress: val })
                }
                value={addAdress.adress}
              />

              <View style={styles.modelTextAndError}>
                <Text style={{ flex: 1 }}>{I18n.t('contact_person')}</Text>
                <HelperText
                  style={styles.modelHelperText}
                  type="error"
                  visible={validObj.contact_person}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                placeholder="Максим Егоров"
                mode="outlined"
                right={<TextInput.Icon name="lead-pencil" />}
                onChangeText={val =>
                  seTaddAdress({ ...addAdress, contact_person: val })
                }
                value={addAdress.contact_person}
              />

              <View style={styles.modelTextAndError}>
                <Text style={{ flex: 1 }}>{I18n.t('phone')}</Text>
                <HelperText
                  style={styles.modelHelperText}
                  type="error"
                  visible={validObj.phone}>
                  {I18n.t('enter_phone_number')}
                </HelperText>
              </View>
              {/*     <TextInput
                mode="outlined"
                right={<TextInput.Icon name="lead-pencil" />}
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    style={{
                      flex: 1,
                      padding: 10,
                    }}
                    placeholder="+ 7 (123) 123 12 34"
                    onChangeText={val =>
                      seTaddAdress({ ...addAdress, phone: val })
                    }
                    value={addAdress.phone}
                  />
                )}
              />
                  */}
              <View style={styles.modelYesNo}>
                <Button onPress={() => noPressed()}>
                  <Text style={styles.modelButtonNoColor}>{I18n.t('no')}</Text>
                </Button>
                <Button onPress={() => onButtonPressed()}>
                  <Text style={styles.modelButtonYesColor}>
                    {I18n.t('yes')}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default AdressBookModal;
