import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
	const dispatch = useDispatch();

	const [formLoginValues, handleLoginInputChange] = useForm({
		lEmail: "password@test.com",
		lPassword: "123456",
	});

	const [formRegisterValues, handleRegisterInputChange] = useForm({
		rName: "Mariano",
		rEmail: "Mariano@test.com",
		rPassword: "123456",
		rConfirm: "123456",
	});

	const { lEmail, lPassword } = formLoginValues;

	const { rName, rEmail, rPassword, rConfirm } = formRegisterValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLogin(lEmail, lPassword));
	};

	const handleRegisterForm = (e) => {
		e.preventDefault();

		if (rPassword !== rConfirm) {
			Swal.fire("Error", "Los passwords deben ser iguales", "error");
		}
		console.log(rName, rEmail, rPassword);
		dispatch(startRegister(rEmail, rPassword, rName));
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="lEmail"
								value={lEmail}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="lPassword"
								value={lPassword}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className="form-group">
							<input type="submit" className="btnSubmit" value="Login" />
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegisterForm}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="rName"
								value={rName}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="rEmail"
								value={rEmail}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="rPassword"
								value={rPassword}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="rConfirm"
								value={rConfirm}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className="form-group">
							<input type="submit" className="btnSubmit" value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
