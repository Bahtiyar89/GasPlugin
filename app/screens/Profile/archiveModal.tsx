import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import I18n from '../../../i18';

import styles from './styles';

interface IState {
  model: boolean;
  okPressed: (params: any) => void;
  noPressed: () => void;
}

const ArchiveModal: React.FC<IState> = ({
  okPressed,
  noPressed,
  model,
}: IState) => {
  const elements = {
    email: '',
    phone: '',
  };
  const [user, seTuser] = useState({ ...elements });

  const validationElements = {
    email: false,
    phone: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'email':
          varPr.email = val;
          break;
        case 'phone':
          varPr.phone = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (!user.email.includes('@')) {
      err = true;
      seTvalidObj({ ...validObj, email: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, email: false });
      }, 1000);
      return err;
    }
    if (user.phone.length < 3) {
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
      okPressed(user);
    }
  };

  return (
    <>
      <Modal isVisible={model}>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.modelContainer}>
              <Text style={styles.modelHeaderText}>{I18n.t('archive')}</Text>

              <Card style={{ margin: 5 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="green"
                      style={{ margin: 0 }}
                    />
                    <Text style={{ paddingLeft: 3 }}>Вручен</Text>
                  </View>
                  <Title style={{ fontSize: 16 }}>№ 4325348723</Title>
                  <Paragraph>Санкт-Петербург — Москва</Paragraph>
                  <Paragraph>Полная дата доставки: 27.11.2021</Paragraph>
                </Card.Content>
              </Card>

              <Card style={{ margin: 5 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="orange"
                      style={{ margin: 0 }}
                    />
                    <Text style={{ paddingLeft: 3 }}>Не вручен</Text>
                  </View>
                  <Title style={{ fontSize: 16 }}>№ 4325348723</Title>
                  <Paragraph>Санкт-Петербург — Москва</Paragraph>
                  <Paragraph>Полная дата доставки: 27.11.2021</Paragraph>
                </Card.Content>
              </Card>

              <Card style={{ margin: 5 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="orange"
                      style={{ margin: 0 }}
                    />
                    <Text style={{ paddingLeft: 3 }}>В ожидании</Text>
                  </View>
                  <Title style={{ fontSize: 16 }}>№ 4325348723</Title>
                  <Paragraph>Санкт-Петербург — Москва</Paragraph>
                  <Paragraph>Полная дата доставки: 27.11.2021</Paragraph>
                </Card.Content>
              </Card>

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

export default ArchiveModal;
