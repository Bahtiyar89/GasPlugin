import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, HelperText, Checkbox } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Dropdown } from 'sharingan-rn-modal-dropdown';

import styles from './styles';
import I18n from '../../../i18';

interface IState {
  model: boolean;
  lang: string;
  onChangeLanguage: (params: any) => void;
  okPressed: () => void;
  noPressed: () => void;
}

const ProfileEditModal: React.FC<IState> = ({
  onChangeLanguage,
  okPressed,
  noPressed,
  model,
  lang,
}: IState) => {
  const validationElements = {
    checkBox: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const validation = () => {
    let err = false;
    if (!checked) {
      err = true;
      seTvalidObj({ ...validObj, checkBox: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, checkBox: false });
      }, 1000);
      return err;
    }
  };

  const [checked, setChecked] = React.useState(false);

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed();
    }
  };

  const data = [
    {
      value: 'ru',
      label: 'Русский',
      avatarSource: require('../../assets/russia.png'),
    },
    {
      value: 'en',
      label: 'English',
      avatarSource: require('../../assets/united-kingdom.png'),
    },
  ];

  const onChangeSS = (value: string) => {
    onChangeLanguage(value);
  };

  return (
    <>
      <Modal isVisible={model}>
        <View style={styles.modelContainer}>
          <Text>{}</Text>
          <Text style={styles.modelHeaderText}>
            {I18n.t('choose_localization')}
          </Text>
          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>{I18n.t('language')}</Text>
          </View>
          <View style={{ height: 80 }}>
            <Dropdown
              mode="outlined"
              label=""
              data={data}
              enableAvatar
              value={lang}
              onChange={onChangeSS}
            />
          </View>

          <HelperText type="error" visible={validObj.checkBox}>
            {I18n.t('choose_default_language')}
          </HelperText>

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={'#397AF9'}
            />
            <Text style={{ flex: 1, marginTop: 8 }}>
              {lang == 'ru'
                ? I18n.t('by_default_language_russian')
                : I18n.t('by_default_language_english')}
            </Text>
          </View>

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

export default ProfileEditModal;
