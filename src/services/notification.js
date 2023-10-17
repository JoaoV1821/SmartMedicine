import notifee, { TriggerType, EventType} from '@notifee/react-native';
export const onCreateTriggerNotification = async (nome, hora, minuto) => {

  const channelId = await notifee.createChannel({
     id: 'default',
     name: 'Default Channel',
  });  

  const date = new Date(Date.now());

  date.setHours(hora);
  date.setMinutes(minuto);

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), 
  };

  await notifee.createTriggerNotification(
     { 
       title: 'Hora de tomar seu medicamento',
       body: `${nome}: ${date.getHours()}:${date.getMinutes()}`,
       android: {
         channelId: channelId,
         actions: [
          {
            title: 'Ok',
            pressAction: {
              id: 'Ok',
            },
          },
        ],
       },
     },
     trigger,
   );

 }

 notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.warn('User pressed the notification.', detail.pressAction.id);
  }
}); 
