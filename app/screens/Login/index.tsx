import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DocumentPicker, {
  DirectoryPickerResponse,
  isInProgress,
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import { useToast } from 'react-native-toast-notifications';
import RNFS from 'react-native-fs';
import Modal from 'react-native-modal';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';
import { IThemeState } from 'app/models/reducers/theme';
import AuthContext from '../../context/auth/AuthContext';
import I18n from '../../../i18';
import Validation from '../../components/validation';
import { doGet, doPost } from '../../utils/apiActions';

interface IState {
  loginReducer: ILoginState;
  themeReducer: IThemeState;
}

interface IProps {
  navigation: any;
}

const Login: React.FC<IProps> = (props: IProps) => {
  const { navigation } = props;
  const toast = useToast();
  // const id = useSelector((state: IState) => state.loginReducer.id);
  //const dispatch = useDispatch();
  // const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  //const onForgot = () => NavigationService.navigate('RestoreAccount');
  // const onRegistration = () => NavigationService.navigate('Registration');

  /*
  const handleChange = (val: string, fieldName: string) => {
    seTuserState(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'username':
          varPr.data.username = val;
          break;
        case 'password':
          varPr.data.password = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (userState.data.username.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, username: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, username: false });
      }, 1000);
      return err;
    }
    if (userState.data.password.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, password: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, password: false });
      }, 1000);
    }
    return err;
  };
*/
  const onRegistration = () => navigation.navigate('Registration');
  const onRestoreAccount = () => navigation.navigate('RestoreAccount');

  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const authContext = useContext(AuthContext);
  const {
    signin,
    signOut,
    user /*loading*/,
    loading,
    postFileBalanceToCheck,
    balance,
    tokens,
    closeModel,
    modalBalanceErr,
  } = authContext;

  const validationElements = {
    username: false,
    password: false,
  };

  const [userState, seTuserState] = useState({
    data: {
      username: '',
      password: '',
    },
  });
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [passwordShow, seTpasswordShow] = useState(true);
  const [model, seTmodel] = useState(false);
  const [path, seTpath] = useState('');
  const [result, setResult] =
    useState<
      Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
    >();

  useEffect(() => {
    if (result instanceof Array) {
      result.map((item: any) => {
        toast.show('Ваш файл успешно прикреплен', {
          type: 'success',
          duration: 4000,
          animationType: 'zoom-in',
        });
        seTpath(item.fileCopyUri);
      });
    }
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const submit = async () => {
    /* const err = validation();
    console.log(userState);

    if (err) {
    } else {
      signin(userState);
      //  onLogin();
    }*/
    await RNFS.readFile(path, 'utf8')
      .then(data => {
        postFileBalanceToCheck(JSON.parse(data));
      })
      .catch(error => {
        toast.show('Прикрепите заново что то не так!', {
          type: 'warning',
          duration: 3000,
          animationType: 'zoom-in',
        });
      });
  };

  const navigateToRegistration = () => {
    closeModel();
    navigation.navigate('Registration');
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Загружается...'}
            textStyle={{ color: '#3498db' }}
          />
          <Text style={styles.signInText}>{I18n.t('authorization')}</Text>
          {/*
          <View style={{width: '90%'}}>
            <Validation
              text={'Имя пользователя'}
              visible={validObj.username}
              errText={I18n.t('incorrect_username')}
            />
          </View>

          <TextInput
            placeholder="Максим"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'username')}
            right={<TextInput.Icon name={require('../../assets/email.png')} />}
            value={userState.data.username}
          />
          <View style={{width: '90%', marginTop: 20}}>
            <Validation
              text={I18n.t('password')}
              visible={validObj.password}
              errText={I18n.t('password_wrong')}
            />
          </View>
          <TextInput
            mode="outlined"
            placeholder={I18n.t('password_enter')}
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                onPress={() => seTpasswordShow(!passwordShow)}
                name={require('../../assets/padlock.png')}
              />
            }
            secureTextEntry={passwordShow}
            value={userState.data.password}
          />
          */}
          <Button
            icon="upload"
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 30,
            }}
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'cachesDirectory',
                  type: types.allFiles,
                });
                setResult([pickerResult]);
              } catch (e) {
                handleError(e);
              }
            }}
            mode="contained">
            <Text style={{ textAlign: 'center', color: '#000' }}>
              {I18n.t('choose_file')}
            </Text>
          </Button>

          <Button
            style={{ width: '90%', marginTop: 20, backgroundColor: '#333333' }}
            mode="contained"
            onPress={submit}>
            <Text style={styles.buttonText}>{I18n.t('enter')}</Text>
          </Button>

          <Button
            style={{ marginTop: 10 }}
            uppercase={false}
            onPress={onRegistration}>
            {I18n.t('registration')}
          </Button>
          {/* <View style={styles.floatLeft_right}>
            <Button uppercase={false} mode="text" onPress={onRestoreAccount}>
              {I18n.t('restore_account')}
            </Button>
          </View>
          */}
        </View>
        <Portal>
          <Dialog visible={modalBalanceErr}>
            <Dialog.Content>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                Вы не зарегистрировались!
              </Text>
              <Button uppercase={false} onPress={navigateToRegistration}>
                Зарегистрироваться
              </Button>
              <Button uppercase={false} onPress={closeModel}>
                Повторить еще раз
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
        {/*
        <Modal isVisible={modalBalanceErr}>
          <View style={{ backgroundColor: 'white', padding: 10 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 20, fontWeight: '600' }}>
              Вы не авторизовались
            </Text>
            <Button uppercase={false} onPress={navigateToRegistration}>
              Зарегистрироваться
            </Button>
            <Button uppercase={false} onPress={() => seTmodel(false)}>
              Повторить еще раз
            </Button>
          </View>
        </Modal>
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
