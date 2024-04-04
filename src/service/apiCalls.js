import axios from "axios";

const URL = "http://localhost:8000/api/";

//users login
export const login = (data) => {
  return axios
    .post(`${URL}login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

//register
export const register = (data) => {
  return axios
    .post(`${URL}register`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUser = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}user`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUserID = (token , ID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}user/${ID}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const getDataUsers = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}users?page=${page}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const modifyUserID = (token , ID , data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .put(`${URL}user/${ID}`,data , config )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer datos del usuario de la base de datos
export const deleteUser = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL}user`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer los eventos de la base de datos
export const getEvents = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}events?page=${page}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer los eventos de la base de datos
export const getEvent_Participant = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}event_participant`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//añadir participante al evento
export const addParticipant = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .patch(`${URL}add_participant/${id}`,null, config )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//eliminar participante del evento
export const removeParticipant = (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .patch(`${URL}remove_participant/${id}`,null, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//crear nuevo usuario
export const createNewEvent = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL}events`, data, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//extraer todos los mensajes
export const getAllMessage = (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(`${URL}message?page=${page}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//crear nuevo mensaje
export const newMessage = (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .post(`${URL}message`, data, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};

//borrar mensajes
export const deleteMessages = (token, id_message) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL}message/${id_message}`, config)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error;
    });
};
