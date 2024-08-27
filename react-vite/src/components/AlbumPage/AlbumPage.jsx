import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkGetAlbumDetails } from "../../redux/albums";
import DeleteAlbum from "../DeleteAlbum/DeleteAlbum";
import './AlbumPage.css';
import CreateComment from "../CreateComment/CreateComment";

const AlbumPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const { setModalContent } = useModal();
	const {albumId} = useParams();
	const albums = useSelector(state => state.albums)
	const [isLoaded, setIsLoaded] = useState(false);
	const selectedAlbum = Object.values(albums)[0]

	const openCommentModal = () => {
		setModalContent(<CreateComment />)
	}

	const openDeleteAlbumModal = () => {
		setModalContent(<DeleteAlbum album={selectedAlbum}/>)
	}

	const openUpdateAlbumForm = () => {
		navigate(`/albums/${albumId}/edit`)
	}

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId)).then(() => setIsLoaded(true))
	}, [albumId, dispatch])


	return (
		isLoaded ? (
		<div className="album-details-container">
			<h1>{selectedAlbum.album_title}</h1>
			<img src={selectedAlbum.artwork} />
			<div className="manage-btns">
			<button className="delete-btn btn" onClick={openDeleteAlbumModal}>DELETE</button>
			<button className="update-btn btn" onClick={openUpdateAlbumForm}>UPDATE</button>
			<button className="comment-btn btn" onClick={openCommentModal}>leave a comment</button>
			</div>
		</div>
		) : (
			<h1>loading....fart</h1>
		)
	)
}

export default AlbumPage;
