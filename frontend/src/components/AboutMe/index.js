const AboutMe = ({aboutMe}) => {

    const { imageaboutme, descriptionaboutme} = aboutMe;

    return(
       <article>
        <img
          src={`${process.env.REACT_APP_API_URL}/${imageaboutme}`}
          alt={imageaboutme}
        ></img>
        <section>{descriptionaboutme}</section>
       </article>
    )
}

export default AboutMe;