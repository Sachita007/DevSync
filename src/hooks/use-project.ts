import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const UseProject = () => {
    const { data: projects } = api.project.getAllProjects.useQuery();
    const [selectedProject, setSelectedProject] = useLocalStorage(
        "selectedProject",
        null,
    );
    const project = projects?.find((project) => project.id === selectedProject);
    return { projects, project, selectedProject, setSelectedProject };
};

export default UseProject;
