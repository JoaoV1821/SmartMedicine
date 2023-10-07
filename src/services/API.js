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
    const response = await instance.get("/medicamentos/listAll", {

      headers:{ 
        "x-access-token": `${token}`
      }

    });

    const json = await response.data;
    return json;
}

export const getList = async (token, data) => {
    const response = await instance.post("/medicamentos/listaMedicamentos", 
      {
        "data_inicio": data
      },
      
    {
      headers :{
          "x-access-token": `${token}`,
          'Content-Type': 'application/json'
        
      }
    }
  );
   
    const json = await response.data;
    return json;
}

export const postUser = async (object) => {
  try {
    const response = await instance.post('/user/newUser', {
      data: {
          "email": object.email,
          "nome": object.nome,
          "telefone": object.celular,
          "senha": object.senha,
          "nome_responsavel": object.nomeResp,
          "contato_responsavel": object.contatoResp
      }
    },
    { 
      headers: {
          'Content-Type': 'application/json'
      }
   }
   
   ) 
  
    return response.data.msg;

  } catch(error) {
    throw new Error("*Usuário já cadastrado!");
  }
    
}

export const postMedicine = async (object, token) => {
  
  const response = await instance.post('/medicamentos/newMedicine',
    {
      "nome": object.nome,
      "uso_continuo": object.uso_continuo,
      "qtd_dose": object.doses,
      "posologia": object.posologia,
      "data_inicio": object.data,
      "periodo_dias": object.periodo,
      "horario_inicio": object.hora_inicio
    }, 
    {
      headers: {
        'content-type': 'application/json',
        "x-access-token": token
      } 
    }
  )
  
  return response
}

export const deleteMedicine = async (id,token) => {
    const response = await instance.delete(`/medicamentos/deleteMedicine/${id}`,
    
    {
      headers:{
        "x-access-token": token
      }
    }
    
  )
    return response 
}

export const updateMedicine = async (id, token, object) => {
  const response = await instance.put(`/medicamentos/updateMedicine/${id}`, 
  
    {
      "nome": object.nome,
      "uso_continuo": 0,
      "qtd_dose": object.doses,
      "posologia": object.posologia,
      "data_inicio": object.data,
      "periodo_dias": object.periodo,
      "horario_inicio": object.hora_inicio
    }, 
    {
      headers: {
        "x-access-token": token
      }
    }
  )

  return response;
}

export const authenticateUser = async (email, senha) => {
    try {
      const response = await instance.post('/user/authentication', {
        data: {
          email: email,
          password: senha,
        },
      });

      if (response.status === 200) {
        return { status: response.status, token: response.data.token };
      
    } 
    } catch (error) {
      throw new Error('*Usuário ou senha incorretos!' );
  };
  }