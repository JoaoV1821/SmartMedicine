import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.1.106:5000", 
});

export const getUsers = async () => {

    const response = await instance.get('/user/listAllUsers');
    const json = await response.data;
    return json;
};

export const postUser = async (object) => {
    const response = await instance.post('/user/newUser', {
        data: {
            "email": object.email,
            "nome": object.nome,
            "telefone": object.celular,
            "senha": object.senha,
            "nome_responsavel": object.nomeResp,
            "contato_responsavel": object.contatoResp
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.warn(response.data)
   
}
