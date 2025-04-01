// InformationsView.tsx
import React from "react";
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button/standard-button";

const InformationsView: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto"}}>
      <Heading size="medium">Acerca de TeamMaker</Heading>
      <div style={{ marginTop: "10px" }}>
        TeamMaker es una plataforma innovadora diseñada para facilitar la
      organización y gestión de equipos en entornos educativos y profesionales.
      Nuestra solución integra herramientas para la creación y administración de
      grupos, la evaluación de perfiles y encuestas tanto sociales como
      caracteriales, todo en un entorno colaborativo y de fácil uso.
      </div>
    
      <div style={{ marginTop: "20px" }}>
        <Heading size="medium">¿Qué ofrecemos?</Heading>
      </div>
      <div style={{ marginTop: "10px" }}>Entre las principales funcionalidades de TeamMaker se encuentran:</div>
    
      <ul>
        <li>Creación automática y actualización de grupos de trabajo.</li>
        <li>
          Gestión y edición del perfil del usuario (con la opción de actualizar
          la información y la contraseña de forma segura).
        </li>
        <li>
          Integración con encuestas sociales y caracteriales para evaluar el
          ambiente y perfil de los usuarios.
        </li>
        <li>
          Recuperación y actualización de contraseñas con procesos seguros y
          confiables.
        </li>
      </ul>
      Nuestra plataforma se basa en el Atlassian Design System, lo que garantiza
      una experiencia de usuario intuitiva, consistente y moderna. TeamMaker
      está pensado para potenciar la colaboración, optimizar la organización y
      mejorar la comunicación entre todos los integrantes de un equipo.
      <div style={{ marginTop: "20px" }}>
        <Heading size="medium">Afinidad Social y Eneagrama</Heading>
      </div>
      
      <li style={{ marginTop: "10px" }}>
        {" "}
        <strong>Afinidad social</strong> se refiere a la capacidad que tienen
        las personas para conectar y establecer relaciones significativas
        basadas en intereses, valores y comportamientos compartidos. En
        TeamMaker, evaluamos la afinidad social para ayudar a conformar grupos
        de trabajo en los que la colaboración y la empatía sean factores clave
        para alcanzar objetivos comunes.
      </li>
      <li style={{ marginTop: "10px" }}> 
        <strong>Eneagrama</strong> es un sistema de clasificación de la
        personalidad que identifica nueve tipos fundamentales, cada uno con
        características, motivaciones y patrones emocionales particulares.
        Utilizando este modelo, la plataforma permite comprender mejor el perfil
        caracterial de cada usuario, lo cual facilita la creación de equipos
        balanceados y el desarrollo personal a través del autoconocimiento.
      </li>

        <div style={{ marginTop: "20px" }}>
            <Heading size="medium">¿Quieres saber más sobre el eneagrama apreta el siguiente enlace?</Heading>
        </div>
      <Button
        appearance="primary"
        onClick={() => {
          // Puedes ajustar la acción, por ejemplo, redirigir a una sección de "Más información" o "Tutorial"
          window.location.href = "https://testeneagrama.com/web/eneatypes.html";
        }}
        style={{ marginTop: "20px" }}
      >
        Más información
      </Button>
    </div>
  );
};

export default InformationsView;
