import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000", 
});

export const getUsers = async () => {
    const response = await instance.get('/user/listAllUsers');
    const json = await response.data;
    return json;
};

export const getMedicines = async (token) => {
    console.warn(token)
    const response = await instance.get("/medicamentos/listAll", {

      headers:{ 
        "x-access-token": `${token}`
      }

    });

    console.warn(response.data.msg)
    const json = await response.data;
    return json;
}

export const getList = async (token) => {
  
    const response = await instance.post("/medicamentos/listaMedicamentos", {
      headers :{
        "x-access-token": `${token}`
      }
  
    });
  
    const json = await response.data;
    console.warn(response.data.msg)
    return json;
    
    
 

}

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
    
    return response.status(response.data.msg);
}

export const postMedicine = async (object, token) => {
  const response = await instance.post('/medicamentos/newMedicine', {

    data: {
      "userEmail": object.userEmail,
      "nome": object.nome,
      "doses": object.doses,
      "posologia": object.posologia,
      "data": object.data,
      "periodo": object.periodo
    },

    headers: {
        'Content-Type': 'application/json',
        "x-access-token": `${token}`
    }

  })

  return response.status();
}

export const authenticateUser = async (email, senha) => {
    try {

      const response = await instance.post('/user/authentication', {
     
      data:  {
          "email": email,
          "password": senha
      },

      headers: {
        'Content-Type': 'application/json'
    }
        
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        
        return token;

      } else if(response.status() === 404) {
        throw new error(response.data.msg)
      }
      
      else {
        
        throw new Error('Falha na autenticação');
        
      } 

    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };
  
