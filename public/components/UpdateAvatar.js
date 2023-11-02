import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function UpdateAvatar() {

    const navigate = useNavigate()

    const { state } = useLocation()
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const submit = () => {
        const formData = new FormData()
        formData.append('avatar', selectedImage)
        navigate('/')
    }

    return (
        <div className="update-avatar">
            <form onSubmit={submit}>
                <input accept="image/*" type="file" onChange={imageChange} />
                <div className="btn-form-update">
                    <button type="submit">save</button>
                    <Link to="/">cancel</Link>
                </div>
            </form>

            {(selectedImage ? (
                <div className="preview">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Thumb"
                    />
                </div>
            ) :
                (<div className="preview">
                    <img src={"http://localhost:3000/images/" +
                        (state.avatar ? state.avatar : "user-tie-solid.svg")} alt="avatar" />
                </div>
                )
            )}
        </div>
    );
}