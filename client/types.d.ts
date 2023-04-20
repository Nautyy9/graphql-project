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
  
enum Status {
  "Not Started",
  "In Progress",
  Completed
}

export interface Project{
  name: string
  id: string
  description : string
  status: Status,
  clientId : {
    id: Client.id
  }
}