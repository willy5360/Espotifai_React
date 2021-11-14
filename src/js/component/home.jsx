import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Sound from "./sound.jsx";
import Selfie from "../../img/IMG_20211101_225507.jpg";

const URL = "https://assets.breatheco.de/apis/sound/songs";

const Home = () => {
	const [sound, setSound] = useState([]); // const sound = [ array de diccionarios ejemplo: "name", "url","id"]
	const [soundURL, setSoundURL] = useState([]);
	const [soundPosition, setSoundPosition] = useState(""); // es un numero, una posicion
	const [soundPlayedNow, setSoundPlayedNow] = useState("");

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error("fail");
			})
			.then(responseAsJSON => {
				setSound(responseAsJSON);
			})
			.catch(error => {
				console.log(error);
			});
	}, []); // esta vacio por que se ejecuta cuando inicias la pagina (lo ejecutas una vez)

	let SongList = sound.map((parametro, index) => {
		return (
			<Sound
				name={parametro.name} // nombre de la canciones
				key={index.toString()}
				category={"VideoGames"}
				position={index.toString()}
				url={parametro.url} // segunda parte del enlace de las canciones
				addingSource={() => {
					setSoundURL(parametro.url);
					setSoundPosition(index);
					setSoundPlayedNow(parametro.name);
				}}
			/>
		);
	});

	const PreviousSong = () => {
		if (soundPosition == 0) {
			setSoundPlayedNow(sound[sound.length - 1].name);
			setSoundURL(sound[sound.length - 1].url);
			setSoundPosition(sound.length - 1);
		} else {
			setSoundPlayedNow(sound[soundPosition - 1].name);
			setSoundURL(sound[soundPosition - 1].url);
			setSoundPosition(soundPosition - 1);
		}
	};

	const NextSong = () => {
		if (soundPosition == sound.length - 1) {
			setSoundPlayedNow(sound[0].name);
			setSoundURL(sound[0].url);
			setSoundPosition(0);
		} else {
			setSoundPlayedNow(sound[soundPosition + 1].name);
			setSoundURL(sound[soundPosition + 1].url);
			setSoundPosition(soundPosition + 1);
		}
	};

	const RandomSong = () => {
		const Shuffle = position => {
			return Math.floor(Math.random() * position.length);
		};
		let randomedPosition = Shuffle(SongList);
		setSoundPlayedNow(sound[randomedPosition].name);
		setSoundURL(sound[randomedPosition].url);
	};

	return (
		<div className="mainContainer">
			<div className="spotify_header">
				<div className="spotify_header_FirstBOX">
					<i className="fab fa-spotify fa-3x"></i>
					<h1>Espotifai</h1>
				</div>
				<div className="spotify_header_SecondBOX">
					<input
						className="beautyInput"
						type="text"
						placeholder="    Search Music"></input>
					<Dropdown>
						<Dropdown.Toggle
							className="dropdownMain"
							variant="success"
							id="dropdown-basic">
							<img className="selfie" src={Selfie} />
							Williams Pad...
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#/action-1 ">
								<i className="far fa-star dropdownMain_icon"></i>
								<h7>My favorites</h7>
							</Dropdown.Item>
							<Dropdown.Item href="#/action-2">
								<i className="fas fa-cog dropdownMain_icon"></i>
								<h7>Settings</h7>
							</Dropdown.Item>
							<Dropdown.Item href="#/action-3">
								<i className="fas fa-sign-out-alt dropdownMain_icon"></i>
								<h7>Sing out</h7>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="spotify_content">
				<ul>{SongList}</ul>
			</div>
			<div className="spotify_footer">
				<button
					className="button_random"
					type="button"
					onClick={RandomSong}>
					<i className="fas fa-random"></i>
				</button>
				<button
					className="button_backward"
					type="button"
					onClick={PreviousSong}>
					<i className="fas fa-step-backward"></i>
				</button>
				<span className="spotify_footer_song">
					{soundPlayedNow.toUpperCase()}
				</span>
				<button
					className="button_forward"
					type="button"
					onClick={NextSong}>
					<i className="fas fa-step-forward"></i>
				</button>
			</div>
			<audio
				className="spotify_footer_player"
				controls
				autoPlay
				src={"https://assets.breatheco.de/apis/sound/".concat(
					soundURL
				)}></audio>
		</div>
	);
};

export default Home;
