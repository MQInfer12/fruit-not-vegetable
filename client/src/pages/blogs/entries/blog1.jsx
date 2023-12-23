import React from "react";
import BlogLayout from "../layout/layout";
import Portrait from "../../../assets/blog/blog1.jpeg";
import Image1 from "../../../assets/blog/blog1_0.jpeg";

const Blog1 = () => {
  return (
    <BlogLayout
      title={"¿Cómo se desarrolló Doctor Tomatto?"}
      fecha={"29 de noviembre de 2023"}
      autor={"Mauricio Molina"}
      descripcion={"Innovación en la agricultura"}
      categorias={["Tecnología", "Desarrollo", "Innovación", "Curiosidad"]}
      img={Portrait}
      references={[
        {
          icon: <i className="fa-brands fa-instagram" />,
          url: "https://www.instagram.com/mau_mq12",
        },
        {
          icon: <i className="fa-brands fa-linkedin"></i>,
          url: "https://www.linkedin.com/in/mauricio-molina-quinteros-72112925b",
        },
        {
          icon: <i className="fa-brands fa-whatsapp"></i>,
          url: "https://wa.me/59176407344",
        },
      ]}
    >
      <BlogLayout.Subtitulo>
        La idea de crear una aplicación web capaz de analizar fotos de hojas de
        tomate y diagnosticar enfermedades surgió como una forma innovadora de
        abordar los desafíos en la agricultura.
      </BlogLayout.Subtitulo>
      <BlogLayout.Subtitulo>Frontend</BlogLayout.Subtitulo>
      <BlogLayout.Parrafo>
        Comencé con el desarrollo del frontend utilizando React. La creación de
        una interfaz de usuario intuitiva era crucial para garantizar que
        agricultores y entusiastas pudieran utilizar la aplicación sin
        problemas. Implementé componentes reutilizables, animaciones suaves y un
        diseño limpio para una experiencia de usuario agradable.
      </BlogLayout.Parrafo>
      <BlogLayout.Subtitulo>Backend</BlogLayout.Subtitulo>
      <BlogLayout.Parrafo>
        Pasemos al backend, donde la magia de la inteligencia artificial
        realmente toma forma. Utilicé Flask para construir una API robusta que
        maneja las solicitudes desde el frontend y coordina el proceso de
        análisis de imágenes.
      </BlogLayout.Parrafo>
      <BlogLayout.Parrafo>
        Desarrollamos un modelo de aprendizaje profundo utilizando bibliotecas
        como TensorFlow y Keras para entrenar la IA en la detección y
        clasificación de enfermedades en las hojas de tomate. La red neuronal
        convolucional resultante fue implementada en Flask y se encarga de
        procesar las imágenes recibidas y devolver resultados precisos.
      </BlogLayout.Parrafo>
      <BlogLayout.Imagen
        src={Image1}
        text="Ayudamos a los agricultores en la era de la Inteligencia Artificial"
        width={80}
      />
      <BlogLayout.Subtitulo>Pruebas y optimización</BlogLayout.Subtitulo>
      <BlogLayout.Parrafo>
        La fase de pruebas fue fundamental para garantizar la fiabilidad de la
        aplicación. Trabajamos en colaboración con agricultores locales y
        expertos en enfermedades de plantas para recopilar un conjunto diverso
        de datos de prueba. Ajustamos y optimizamos el modelo para mejorar la
        precisión y la velocidad de respuesta.
      </BlogLayout.Parrafo>
      <br />
      <BlogLayout.Subtitulo>Conclusión</BlogLayout.Subtitulo>
      <BlogLayout.Parrafo>
        Este proyecto ha sido una montaña rusa emocional, pero el resultado
        final ha valido la pena. La combinación de React y Flask resultó ser una
        elección acertada, brindando una experiencia de usuario excepcional y
        una sólida base para la inteligencia artificial.
      </BlogLayout.Parrafo>
      <BlogLayout.Subtitulo>
        Espero que este blog haya proporcionado una visión fascinante del
        proceso detrás del desarrollo de esta aplicación web de IA para la
        agricultura.
      </BlogLayout.Subtitulo>
    </BlogLayout>
  );
};

export default Blog1;
