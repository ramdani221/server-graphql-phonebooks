import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function ContactAdd() {

    const navigate = useNavigate()
    const [newContatc, setNewContatc] = useState({ name: '', phone: '' })
    const submit = () => {
        navigate('/')
    }

    return (
        <div className="add-contact">
            <form onSubmit={submit}>
                <input type="text" id="name" name="name" placeholder="name" onChange={(e) => setNewContatc({ ...newContatc, name: e.target.value })} />
                <input type="text" id="phone" name="phone" placeholder="phone" onChange={(e) => setNewContatc({ ...newContatc, phone: e.target.value })} />
                <div className="btn-form-add">
                    <button type="submit">save</button>
                    <Link to="/">cancel</Link>
                </div>
            </form>
        </div>
    )
}