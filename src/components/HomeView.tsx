import React, { useEffect, useState, Fragment, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Box, Inline, Stack, xcss } from "@atlaskit/primitives";
//import Button from "@atlaskit/button/new";
import Button from "@atlaskit/button";
import Heading from "@atlaskit/heading";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import CreateCourseView from "./CreateCourseView";

// Estilos para las cajas que presentan los cursos
const listStyles = xcss({
  paddingInlineStart: "space.0",
});
const boxStyles = xcss({
  color: "color.text",
  width: "220px",
  // height: '224px',
  height: "260px",
  backgroundColor: "color.background.selected",
  borderWidth: "border.width",
  borderStyle: "solid",
  borderColor: "color.border.selected",
  padding: "space.100",
  borderRadius: "border.radius.100",
  transitionDuration: "200ms",
  listStyle: "none",
  textAlign: "center",
  "::before": {
    // content: '"✨"',
    paddingInlineEnd: "space.100",
  },
  "::after": {
    // content: '"✨"',
    paddingInlineStart: "space.100",
  },
  ":hover": {
    backgroundColor: "color.background.selected.bold.hovered",
    color: "color.text.inverse",
    transform: "scale(1.02)",
  },
});

// /**
//  * Recupera los cursos del usuario desde la API.
//  */
// async function getCoursesByStudentId(studentId: string): Promise<any[]> {
//   try {
//     const response = await axios.get(`http://4.228.227.51:3000/api/courses/getcoursestudent/${studentId}`);
//     if (response.status !== 200) {
//       throw new Error('Error al recuperar los cursos');
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Error al recuperar los cursos:', error);
//     return [];
//   }
// }

// Ajusta la interfaz a tu estructura
export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
  run: string;
  eneatype: string;
}

/**
 * Recupera la información de usuario (claims) desde localStorage.
 */
export function getUserData(): JwtPayload | null {
  const dataString = localStorage.getItem("userData");
  if (!dataString) return null;

  try {
    return JSON.parse(dataString) as JwtPayload;
  } catch (error) {
    console.error("Error al parsear userData:", error);
    return null;
  }
}

export interface Course {
  id: string;
  name: string;
  description?: string;
  professorId: string; // ID del profesor a cargo
  studentIds: string[]; // IDs de estudiantes inscritos
}

export interface Profesor {
  id: string;
  email: string;
  role: string;
  name: string;
  run: string;
  eneatype: string;
}

const HomeView: React.FC = () => {
  const userData: JwtPayload | null = getUserData();
  console.log("userData:", userData);

  if (!userData) {
    return (
      <div>
        <p>No hay datos de usuario en localStorage.</p>
      </div>
    );
  }

  const [courses, setCourses] = useState<Course[]>([]);
  const [profesorACargo, setProfesorACargo] = useState<Profesor[]>([]);
  // 1. Obtener la lista de cursos
  const fetchCourses = async () => {
    if (userData.role === "profesor") {
      try {
        const response = await axios.get<Course[]>(
          `http://4.228.227.51:3000/api/courses/getcourseprofessor/${userData.sub}`
          //  `http://4.228.227.51:3000/api/courses`
        );
        setCourses(response.data);
        console.log("Cursos:", response.data);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    } else if (userData.role === "estudiante") {
      try {
        const response = await axios.get<Course[]>(
          `http://4.228.227.51:3000/api/courses/getcoursestudent/${userData.sub}`
          // `http://4.228.227.51:3000/api/courses`
        );
        setCourses(response.data);
        console.log("Cursos:", response.data);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    }
  };

  const fetchProfesorACargo = async () => {
    try {
      const response = await axios.get<Profesor[]>(
        `http://4.228.227.51:3000/api/users/teachers/`
      );
      setProfesorACargo(response.data);
      console.log("Profesor a cargo:", response.data);
    } catch (error) {
      console.error("Error al obtener profesor a cargo:", error);
    }
  };

  useEffect(() => {
    fetchProfesorACargo();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  // Onclick ver cursos
  const handleVerCursos = async (courseId: string) => {
    localStorage.setItem("verCursos", "true");
    localStorage.setItem("courseId", courseId);

    // Recargar la página
    window.location.reload();
  };

  // Onclick ver cursos
  const handleVerSocial = async (courseId: string) => {
    localStorage.setItem("verSocial", "true");
    localStorage.setItem("courseId", courseId);

    // Recargar la página
    window.location.reload();
  };

  // para el dialogo modal de CourseCreate
  const [isOpenCourseCreate, setIsOpenCourseCreate] = useState(false);
  const openModalCourseCreate = useCallback(
    () => setIsOpenCourseCreate(true),
    []
  );
  const closeModalCourseCreate = useCallback(() => {
    setIsOpenCourseCreate(false);
    // Actualizar la lista de cursos
    fetchCourses();
  }, []);

  return (
    <div>
      {(userData.role === "profesor" || userData.role === "administrador") && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <Heading size="large">Administración de cursos</Heading>
          <br />
          <Heading size="small">
            Bienvenido, {userData.name}. Aquí puedes crear un nuevo curso y
            agregar los estudiantes deseados.
          </Heading>
          <br />
          <Button
            appearance="primary"
            onClick={() => {
              openModalCourseCreate();
            }}
          >
            Crear nuevo curso
          </Button>
          {/* DIALOGO MODAL DE CREAR CURSO */}
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <Heading size="xlarge">Lista de cursos </Heading>
        <br />
      </div>

      {courses.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Heading size="small">
            No hay cursos disponibles, espere a que un profesor lo agregue a uno
          </Heading>
        </div>
      )}
      <Inline space="space.200" grow="fill" alignInline="center" shouldWrap>
        {courses.map((course) => (
          <Stack>
            <Box xcss={boxStyles} as="li" key={course.id}>
              <Stack>
                {/* nombre del curso */}
                <div style={{ marginTop: "5px", marginBottom: "10px" }}>
                  <strong>{course.name}</strong>
                </div>
                {/* profesor a cargo */}
                <div style={{ marginTop: "10px", marginBottom: "5px" }}>
                  Profesor:{" "}
                  {profesorACargo.find(
                    (profesor) => profesor.id === course.professorId
                  )?.name || "Desconocido"}
                </div>

                {/* descripcion */}
                <div style={{ marginTop: "10px", marginBottom: "5px" }}>
                  {course.description}
                </div>

                {/* <Button onClick={() => cancelarOperacion()} style={{ marginRight: '5x' }}> Cancelar </Button> */}
                <div style={{ marginTop: "5px" }}>
                  <Button
                    appearance="primary"
                    onClick={() => handleVerCursos(String(course.id))}
                  >
                    {" "}
                    Ver curso{" "}
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    appearance="subtle"
                    onClick={() => handleVerSocial(String(course.id))}
                  >
                    {" "}
                    Ver encuestas{" "}
                  </Button>
                </div>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Inline>

      {/* DIALOGO MODAL */}
      <ModalTransition>
        {isOpenCourseCreate && (
          <Modal
            onClose={closeModalCourseCreate}
            width={"x-large"}
            shouldScrollInViewport
          >
            <ModalHeader></ModalHeader>
            <ModalBody>
              <CreateCourseView />
              {/* llamada a microfrontend */}
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModalCourseCreate}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>

      <br />
      <br />
      <br />
    </div>
  );
};

export default HomeView;
