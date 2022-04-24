import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Button, IconButton, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import basex from 'bs58-rn';
import Sodium from 'react-native-sodium';
import Buffer from 'buffer';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-notifications';
import RNFS from 'react-native-fs';

import I18n from '../../../i18';
import styles from './styles';
import utility from '../../utils/Utility';
import { IThemeState } from 'app/models/reducers/theme';
import CustomAlert from '../../components/customAlert';

interface IState {
  model: boolean;
  cancelPressed: () => void;
  themeReducer: IThemeState;
}

const KeysModal: React.FC<IState> = ({ cancelPressed, model }: IState) => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const textColor = isDark ? 'white' : 'black';
  const toastRef = useRef<any>();
  const [walletKeys, seTwalletKeys] = useState({
    sk: '',
    pk: '',
  });
  const [displayAlert, seTdisplayAlert] = useState(false);
  const [filePath, seTfilePath] = useState('');

  async function generateKeys() {
    const ALPHABET =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const base58 = basex(ALPHABET);
    let key = await Sodium.crypto_sign_keypair();
    let encoded_SK_Base58 = base58.encode(Buffer.Buffer.from(key.sk, 'base64'));
    let encoded_PK_Base58 = base58.encode(Buffer.Buffer.from(key.pk, 'base64'));
    const obj = {};
    obj['sk'] = encoded_SK_Base58;
    obj['pk'] = encoded_PK_Base58;
    utility.setItemObject('wkeys', obj);
    seTwalletKeys({
      ...walletKeys,
      sk: encoded_SK_Base58,
      pk: encoded_PK_Base58,
    });
  }

  useEffect(() => {
    async function encrypData() {
      await utility.getItemObject('wkeys').then(keys => {
        if (keys) {
          seTwalletKeys({ ...walletKeys, sk: keys?.sk, pk: keys?.pk });
        } else {
          generateKeys();
        }
      });
      /*
      const ALPHABET =
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

      const base58 = basex(ALPHABET);
      let keysig = await Sodium.crypto_box_keypair();

      let key = await Sodium.crypto_sign_keypair();
      console.log('key : ', key); 
      let uint8arraySk = new encoding.TextEncoder().encode('7YXVWT');
      console.log('uint8arraySK',uint8arraySk );

        console.log('decoded 555',Buffer.Buffer.from('7YXVWT','binary'))
      let enc = base58.encode(Buffer.Buffer.from(uint8arraySk));
      let sk = base58.encode(Buffer.Buffer.from([255, 254, 253, 252]));
      let pk = Buffer.Buffer.from(key.pk);
      console.log('enc', enc);
      console.log('sk', sk);
      
      console.log('pk', pk);
      
      console.log('bufferr ', Buffer.Buffer.from(key.sk));
      let encodedPKBase58 = base58.encode(Buffer.Buffer.from(key.pk, 'base64'));
      let encodedFoBase58 = base58.encode(Buffer.Buffer.from(key.sk, 'base64'));
      utility.setItem('pk',encodedPKBase58)
      utility.setItem('sk',encodedFoBase58)
      console.log('encodedPKBase58', encodedPKBase58);
      console.log('keySK 333', encodedFoBase58);
      seTsekret(encodedFoBase58)
      seTpublic1(encodedPKBase58)
      */
    }
    encrypData();
  }, []);

  const copyToClipboardSK = () => {
    Clipboard.setString(walletKeys.sk);
    toastRef.current.show('Успешно скапировано', {
      type: 'success',
      duration: 4000,
      animationType: 'zoom-in',
    });
  };

  const copyToClipboardPK = () => {
    Clipboard.setString(walletKeys.pk);
    toastRef.current.show('Успешно скапировано', {
      type: 'success',
      duration: 4000,
      animationType: 'zoom-in',
    });
  };

  const downloadKeys = async () => {
    await utility.getItemObject('wkeys').then(keys => {
      if (keys) {
        let path =
          Platform.OS === 'ios'
            ? RNFS.MainBundlePath + '/keys.txt'
            : RNFS.ExternalDirectoryPath + '/keys.txt';
        RNFS.writeFile(path, JSON.stringify(keys), 'utf8')
          .then(success => {
            seTfilePath(path.substring(path.indexOf('A')));
            seTdisplayAlert(true);
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        console.log('else', keys);
      }
    });
  };

  return (
    <>
      <Modal isVisible={model}>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.modelContainer}>
              <Text style={styles.modelHeaderText}>{I18n.t('keys')}</Text>

              <Card style={{ margin: 5 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="green"
                      style={{ marginTop: 2, marginRight: 0 }}
                    />
                    <Text style={{ color: 'orange' }}>
                      Секретный ключ (скопировать)
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => copyToClipboardSK()}>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {walletKeys.sk}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="green"
                      style={{ marginTop: 2, marginRight: 0 }}
                    />
                    <Text style={{ color: 'orange' }}>
                      Публичный ключ (скопировать)
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => copyToClipboardPK()}>
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 20,
                      }}>
                      {walletKeys.pk}
                    </Text>
                  </TouchableOpacity>
                </Card.Content>
                <Button icon="download" mode="contained" onPress={downloadKeys}>
                  <Text style={{ color: '#000', fontSize: 9 }}>
                    Cкачать ключи (Секретный/Публичный)
                  </Text>
                </Button>
              </Card>
              <View style={styles.modelYesNo}>
                <Button onPress={() => cancelPressed()}>
                  <Text style={styles.modelButtonNoColor}>
                    {I18n.t('discard')}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Toast placement="top" ref={toastRef} />
        <CustomAlert
          displayAlert={displayAlert}
          displayAlertIcon={true}
          alertTitleText={I18n.t('file_saved_under_name')}
          alertMessageText={filePath}
          displayPositiveButton={true}
          positiveButtonText={I18n.t('ok')}
          displayNegativeButton={false}
          negativeButtonText={'CANCEL'}
          onPressNegativeButton={() => seTdisplayAlert(false)}
          onPressPositiveButton={() => seTdisplayAlert(false)}
        />
      </Modal>
    </>
  );
};

export default KeysModal;
