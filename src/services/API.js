import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000", 
});

export const getUsers = async () => {
    await instance.get('/user/listAllUsers')
    .then(response => {
        json = response.data;
        console.warn(response.status)
        return json['users'];
    } )
    .catch(error => {
        console.warn(error);
    })
};

export const postUser =  async (object) => {
    instance.post('/user/newUser', {
        data: {
            "email": object.email,
            "nome": object.nome,
            "telefone": object.celular,
            "senha": object.senha,
            "nome_responsavel": object.nomeResp,
            "contato_responsavel": object.contatoResp,

        },
        headers: {
          'Content-Type': 'application/json' 
        }
      })
      .then(response => {
            console.warn(response.status);
      })
      .catch(error => {
            console.warn(error);
      });
}
