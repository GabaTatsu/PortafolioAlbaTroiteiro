import instagramOriginalIcon from "../../assets/icons/instagramiconoriginal.jpg";
import WhatsappIcon from "../../assets/icons/whatsappicon.png";

const Contact = () => {

return(
    <article>
        <h4>CONTACTO</h4>
        <section>
        <a
            href="https://www.instagram.com/alba_troiteiro/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagramOriginalIcon} alt="INSTAGRAM"></img>
          </a>
          <a
            href="https://www.instagram.com/alba_troiteiro/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </section>        
        <section>
        <a
            href="https://wa.me/34667748706"
            target="_blank"
            rel="noreferrer"
          >
            <img src={WhatsappIcon} alt="WHATSAPP"></img>
          </a>
          <a
            href="https://wa.me/34667748706"
            target="_blank"
            rel="noreferrer"
          >
            +34 667 74 87 06
          </a>
        </section> 
    </article>
)
}

export default Contact;