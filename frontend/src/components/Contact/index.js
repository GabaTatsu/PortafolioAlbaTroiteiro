import "./style.css";

const Contact = ({contact}) => {
    const { titlecontact, descriptioncontact } = contact;

return(
    <article className="contact" >
        <h5>{titlecontact}</h5>
        <p>{descriptioncontact}</p>
    </article>
)
}

export default Contact;