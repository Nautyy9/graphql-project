export  interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  
export  interface ClientData {
    clients: Client[];
  }

  export interface ProjectData {
    projects : Project[];
  }
  

export interface Project{
  name: string
  id: string
  description : string
  status: "Not Started" | "In Progress" | "Completed",
  clientId : {
    id: Client.id
  }
}