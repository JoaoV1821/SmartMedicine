import PushNotification from 'react-native-push-notification';

// Configure as notificações
PushNotification.configure({
  onNotification: function (notification) {
    // Lógica para lidar com a notificação quando ela for exibida
  },
  popInitialNotification: true,
  requestPermissions: true,
});

// Função para agendar uma notificação
const scheduleNotification = (userName, medicineName) => {
  PushNotification.localNotificationSchedule({
    title: 'Lembrete de Medicamento',
    message: `Olá, ${userName}! Não se esqueça de tomar o medicamento ${medicineName}.`,
    date: "2023-11-10", // Defina a data e hora para quando o lembrete deve aparecer
  });
};

// Chame a função de agendamento de notificação quando o botão for pressionado
export const handleSetReminder = (userName, medicineName) => {
  scheduleNotification(userName, medicineName);
};

