import React, { useState } from "react";
import './App.css';

function App() {

  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

		let userData = {};

		const ls = document.querySelectorAll(".toJson");

		for (let i = 0; i < ls.length; i++) {
			let name = ls[i].getAttribute("name");
			userData[`${name}`] = ls[i].value;
		}

		console.log(userData);

		formData.append("userfile", selectedFile);
		formData.append("userData", JSON.stringify(userData));

		fetch(
			"http://localhost:8000/upload/",
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
  

  return (
    <div className="main">
			<h1>Form</h1>
			<div>
				<label>Name</label>
				<div>
					<input type="text" id="firstname" className="toJson" name="firstname" placeholder="First Name"></input>
					<input type="text" id="lastname" className="toJson" name="lastname" placeholder="Last Name"></input>
				</div>
			</div>
			<div>
				<label>Address</label>
				<div className="address">
					<input type="text" id="street" className="toJson" name="street" placeholder="Street Address"></input>
					<div className="">
						<input type="text" id="city" className="toJson" name="city" placeholder="City"></input>
						<input type="text" id="state" className="toJson" name="state" placeholder="State/Province"></input>
						<input type="number" id="postalcode" className="toJson" name="postalcode" placeholder="Postal / Zip Code"></input>
					</div>
				</div>
			</div>
			<div className="email">
				<label>E-mail</label>
				<input type="email" className="toJson" id="email" name="email" placeholder="E-mail"></input>
			</div>
			<div className="fileupload-container">
				<label>File Upload</label>
				<div className="fileupload">
					<input type="file" className="fileinput" name="file" onChange={changeHandler} />
					{isSelected ? (
						<div className="fileselect_data">
							<p>Filename: {selectedFile.name}</p>
							<p>Filetype: {selectedFile.type}</p>
							<p>Size in bytes: {selectedFile.size}</p>
						</div>
					) : (
						<p className="fileselect">Select a file to show details</p>
					)}
				</div>
			</div>
			<button onClick={handleSubmission}>Submit</button>
		</div>
  );
}

export default App;
