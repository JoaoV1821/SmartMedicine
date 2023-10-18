import notifee, { EventType, TriggerType } from '@notifee/react-native';
import * as RNFS from 'react-native-fs';

const json = {
  data: '',
  nome: '',
  data: '',
  horario: '',
};

const filePath = `${RNFS.DocumentDirectoryPath}/medicationData.json`;

const readJSONFile = async () => {
  try {
    const content = await RNFS.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    return [];
  }
};

const writeJSONFile = async (data) => {
  try {
    await RNFS.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Erro ao escrever o arquivo JSON:', error);
  }
};

notifee.onForegroundEvent(async ({ type, detail }) => {
  const date = new Date(Date.now());
  
  if (type === EventType.PRESS) {
    json.horario = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    json.ingeriu = true;
  
    const existingData = await readJSONFile();
    existingData.push(json);
    writeJSONFile(existingData).then(() => console.log('deu certo! ' + filePath));

  } else if (type === EventType.DISMISSED) {
      
    json.horario = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    json.ingeriu = false;
  
    const existingData = await readJSONFile();
    existingData.push(json);
    writeJSONFile(existingData).then(() => console.log('deu certo! ' + filePath));
  }

});

export const onCreateTriggerNotification = async (nome, hora, minuto) => {
  
  const date = new Date(Date.now());

  json.nome = nome;
  json.data = new Date().toLocaleDateString('en-GB', { timeZone: 'UTC' });

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  date.setHours(hora);
  date.setMinutes(minuto);

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.createTriggerNotification({
    title: 'Hora de tomar seu medicamento',
    body: `${nome}: ${date.getHours()}:${date.getMinutes()}`,
    android: {
      channelId: channelId,
      color: 'red',
      colorized: true,
      actions: [
        {
          title: 'Ok',
          pressAction: {
            id: 'Ok',
          },
        },
      ],
    },
  }, trigger);

};
