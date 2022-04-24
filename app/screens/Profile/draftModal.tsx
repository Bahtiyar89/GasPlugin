import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import I18n from '../../../i18';

import styles from './styles';

interface IState {
  model: boolean;
  okPressed: (params: any) => void;
  noPressed: () => void;
}

const DraftModal: React.FC<IState> = ({
  okPressed,
  noPressed,
  model,
}: IState) => {
  const elements = {
    departures: '',
    departures2: '',
  };
  const [drafts, seTdrafts] = useState({ ...elements });

  const validationElements = {
    departures: false,
    departures2: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const validation = () => {
    let err = false;

    if (drafts.departures.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, departures: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, departures: false });
      }, 1000);
    }
    if (drafts.departures2.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, departures2: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, departures2: false });
      }, 1000);
    }
    return err;
  };

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed(drafts);
    }
  };

  return (
    <>
      <Modal isVisible={model}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelHeaderText}>{I18n.t('drafts')}</Text>

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>{I18n.t('departures')}</Text>
            <HelperText
              style={styles.modelHelperText}
              type="error"
              visible={true}>
              {I18n.t('field_not_be_empty')}
            </HelperText>
          </View>

          <TextInput
            placeholder="Москва, ул. Леонова, д. 35"
            mode="outlined"
            onChangeText={val => seTdrafts({ ...drafts, departures: val })}
            value={drafts.departures}
          />

          <TextInput
            style={{ marginTop: 10 }}
            placeholder="Москва, ул. Леонова, д. 35"
            mode="outlined"
            onChangeText={val => seTdrafts({ ...drafts, departures2: val })}
            value={drafts.departures2}
          />

          <View style={styles.modelYesNo}>
            <Button onPress={() => noPressed()}>
              <Text style={styles.modelButtonNoColor}>{I18n.t('no')}</Text>
            </Button>
            <Button onPress={() => onButtonPressed()}>
              <Text style={styles.modelButtonYesColor}>{I18n.t('yes')}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DraftModal;
