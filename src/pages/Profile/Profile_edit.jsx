import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate, userLogin } from "../userSlice";
import { Custom_Modal } from "../../common/Modal/Modal";
import { Custom_Input } from "../../common/Input/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Custom_Button } from "../../common/Button/Button";
import { getDataUserID, modifyUserID } from "../../service/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "../../service/useFul";
import "./Profile.scss";

export const Profile_Edit = () => {
  //declaro constantes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user_logued = useSelector(userDate).user;
  const user_id = useSelector(userDate).ID_Perfil_to_modify;

  const [user, setUser] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dateUser, setDateUser] = useState(
    dayjs(user.date, { dateFormat: "YYYY-MM-DD" }).toDate()
  );
  const [date, setDate] = useState(
    dayjs(user.date, { dateFormat: "YYYY-MM-DD" }).toDate()
  );
  const [dateError, setDateError] = useState("");

  const [modifyData, setModifyData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
  });

  const [errorModifyData, setErrorModifyData] = useState({
    nameError: "",
    last_nameError: "",
    phoneError: "",
    emailError: "",
    nicknameError: "",
    passwordError: "",
  });

  const [modifyDataAdmin, setModifyDataAdmin] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
    role: "",
    is_active: "",
    confirmed: "",
  });

  const [errorModifyDataAdmin, setErrorModifyDataAdmin] = useState({
    nameError: "",
    last_nameError: "",
    phoneError: "",
    emailError: "",
    nicknameError: "",
    passwordError: "",
    role: "",
    is_active: "",
    confirmed: "",
  });

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  useEffect(() => {
    setDateUser(dayjs(user.date, { dateFormat: "YYYY-MM-DD" }).toDate());
    setDate(dayjs(user.date, { dateFormat: "YYYY-MM-DD" }).toDate());
  }, [user.date]);

  useEffect(() => {
    if (user_id) {
      getDataUserID(token, user_id)
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUser(user_logued);
    }
  }, [user_id]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    const data =
      user_logued.role === "user" || user_logued.role === "rider"
        ? modifyData
        : modifyDataAdmin;
    data[e.target.name] = e.target.value;
    user_logued.role === "user" || user_logued.role === "rider"
      ? setModifyData({ ...modifyData })
      : setModifyDataAdmin({ ...modifyDataAdmin });
  };

  //chequeo de errores para los inputs
  const showError = (error) => {
    if (error !== "") {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    showError(errorModifyDataAdmin.nameError);
    showError(errorModifyDataAdmin.last_nameError);
    showError(errorModifyDataAdmin.dateError);
    showError(errorModifyDataAdmin.phoneError);
    showError(errorModifyDataAdmin.emailError);
    showError(errorModifyDataAdmin.nicknameError);
    showError(errorModifyDataAdmin.passwordError);
  }, [errorModifyDataAdmin]);

  useEffect(() => {
    showError(errorModifyData.nameError);
    showError(errorModifyData.last_nameError);
    showError(errorModifyData.dateError);
    showError(errorModifyData.phoneError);
    showError(errorModifyData.emailError);
    showError(errorModifyData.nicknameError);
    showError(errorModifyData.passwordError);
  }, [errorModifyData]);

  useEffect(() => {
    showError(dateError);
  }, [dateError]);

  const checkError = (e) => {
    const error = validate(e.target.name, e.target.value);
    const errorObj =
      user_logued.role === "user" || user_logued.role === "rider"
        ? errorModifyData
        : errorModifyDataAdmin;
    errorObj[e.target.name + "Error"] = error;
    user_logued.role === "user" || user_logued.role === "rider"
      ? setErrorModifyData({ ...errorModifyData })
      : setErrorModifyDataAdmin({ ...errorModifyDataAdmin });
  };

  useEffect(() => {
    const currentDate = dayjs();
    const inputDate = dayjs(date);

    if (inputDate.isAfter(currentDate)) {
      setDateError("No puedes haber nacido en el futuro... ¿o sí?");
    } else if (currentDate.diff(inputDate, "years") > 100) {
      setDateError("No puedes ser mayor de 100 años... ¿o sí?");
    } else if (currentDate.diff(inputDate, "years") < 16) {
      setDateError("Tienes que ser mayor de 16 años");
    } else {
      setDateError("");
    }
  }, [date]);

  const cancelHand = () => {
    if (user_id) {
      dispatch(userLogin({ ID_Perfil_to_modify: "" }));
      navigate("/profile_admin_users");
    } else {
      navigate("/profile_user");
    }
  };

  const modifyHand = (data) => {
    const fieldsToCheck = [
      "name",
      "last_name",
      "phone",
      "email",
      "nickname",
      "password",
      "role",
      "is_active",
      "confirmed",
    ];
    const dataToSend = {};

    fieldsToCheck.forEach((field) => {
      if (data[field] !== "") {
        dataToSend[field] = data[field];
      }
    });

    // if (date !== dateUser) {
    //   dataToSend.date = date;
    // }
    console.log(dataToSend)
    modifyUserID(token, user.id, dataToSend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(errorModifyDataAdmin);
  return (
    <>
      <Custom_Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirm={() => setConfirm(true)}
      />

      <div className="Container_div_Principal d-flex justify-content-center align-items-center text-center">
        <div className="container_card">
          <div className="container_div_edit_profiles">
            {user_logued.role === "user" || user_logued.role === "rider" ? (
              <>
                <h2>Modificar Perfil</h2>
                <hr />
                <div>
                  <label htmlFor="name" className="mb-2">
                    <h4>Nombre : {user.name}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="name"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={
                      errorModifyData.name === "" ? "no_errors" : "errors"
                    }
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="mb-2">
                    <h4>Apellidos : {user.last_name}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="last_name"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={"errors"}
                  />
                </div>
                <div>
                  <label htmlFor="date" className="mb-2">
                    <h4>Fecha de Nacimiento : </h4>
                  </label>
                  <br />
                  <DatePicker
                    className="date_picker_custom date_picker_error text-center"
                    selected={date}
                    name="date"
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="phone" className="mb-2">
                    <h4>Telefono : {user.phone}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="phone"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={"errors"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2">
                    <h4>Email : {user.email}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="email"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={"errors"}
                  />
                </div>
                <div>
                  <label htmlFor="nickname" className="mb-2">
                    <h4>Nombre de Usuario : {user.nickname}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="nickname"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={"errors"}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2">
                    <h4>Contraseña : </h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="password"
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={"errors"}
                  />
                </div>
                <div className="mb-3">
                  <Custom_Button
                    name={"Modificar"}
                    clickHandler={modifyHand}
                    data={modifyData}
                  />
                  <Custom_Button name={"Cancelar"} clickHandler={cancelHand} />
                </div>
              </>
            ) : (
              <>
                <h2>Perfil : {user.id}</h2>
                <div>
                  <label htmlFor="name" className="mb-2">
                    <h4>Nombre : {user.name}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="name"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="mb-2">
                    <h4>Apellidos : {user.last_name}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="last_name"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="date" className="mb-2">
                    <h4>Fecha de Nacimiento : </h4>
                  </label>
                  <DatePicker
                    className="date_picker_custom date_picker_error text-center"
                    selected={date}
                    name="date"
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2">
                    <h4>Telefono : {user.phone}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="phone"
                    handler={inputHandler}
              
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2">
                    <h4>Email : {user.email}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="email"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="nickname" className="mb-2">
                    <h4>Nombre de Usuario : {user.nickname}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="nickname"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2">
                    <h4>Contraseña : </h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="password"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2">
                    <h4>Rol : {user.role}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="role"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="is_active" className="mb-2">
                    <h4>Borrado : {user.is_active}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="is_active"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div>
                  <label htmlFor="confirmed" className="mb-2">
                    <h4>Confirmado : {user.confirmed}</h4>
                  </label>
                  <Custom_Input
                    type="text"
                    name="confirmed"
                    handler={inputHandler}
                    handlerError={checkError}
                  />
                </div>
                <div className="mb-3">
                  <Custom_Button
                    name={"Modificar"}
                    clickHandler={modifyHand}
                    data={modifyDataAdmin}
                  />
                  <Custom_Button name={"Cancelar"} clickHandler={cancelHand} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
