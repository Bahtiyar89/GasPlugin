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

const ProfileEditModal: React.FC<IState> = ({
  okPressed,
  noPressed,
  model,
}: IState) => {
  const elements = {
    old_password: '',
    new_password: '',
    repeate_password: '',
  };

  const validationElements = {
    new_password: false,
    old_password: false,
    repeate_password: false,
  };

  const [user, seTuser] = useState({ ...elements });
  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'old_password':
          varPr.old_password = val;
          break;
        case 'new_password':
          varPr.new_password = val;
          break;
        case 'new_password':
          varPr.new_password = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (user.old_password.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, old_password: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, old_password: false });
      }, 1000);
    }
    if (user.new_password.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, new_password: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, new_password: false });
      }, 1000);
    }
    return err;
  };

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed(user);
    }
  };
  console.log('user:', user);
  console.log('validObj:', validObj);

  const [passwordShow, seTpasswordShow] = useState({
    old: true,
    new: true,
    repeate: true,
  });

  return (
    <>
      <Modal isVisible={model}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelHeaderText}>
            {I18n.t('change_password')}
          </Text>

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>{I18n.t('old_password')}</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.old_password}>
              Неправельный пароль!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder={I18n.t('enter_old_password')}
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'old_password')}
            right={
              <TextInput.Icon
                onPress={() =>
                  seTpasswordShow({ ...passwordShow, old: !passwordShow.old })
                }
                name={require('../../assets/padlock.png')}
              />
            }
            secureTextEntry={passwordShow.old}
            value={user.old_password}
          />

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>{I18n.t('new_password')}</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.new_password}>
              Пароли не совпадают!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder={I18n.t('enter_new_password')}
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'new_password')}
            right={
              <TextInput.Icon
                onPress={() =>
                  seTpasswordShow({ ...passwordShow, new: !passwordShow.new })
                }
                name={require('../../assets/padlock.png')}
              />
            }
            secureTextEntry={passwordShow.new}
            value={user.new_password}
          />
          <TextInput
            mode="outlined"
            placeholder={I18n.t('enter_repeate_password')}
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                onPress={() =>
                  seTpasswordShow({
                    ...passwordShow,
                    repeate: !passwordShow.repeate,
                  })
                }
                name={require('../../assets/padlock_repeate.png')}
              />
            }
            secureTextEntry={passwordShow.repeate}
            value={user.repeate_password}
          />

          <Text style={{ paddingTop: 10 }}>
            <Text style={{ fontWeight: '600' }}>{I18n.t('notification')}:</Text>{' '}
            {I18n.t('notification_password')}
          </Text>

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
