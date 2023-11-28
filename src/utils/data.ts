export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  address: string;
  position: string;
  committee: string;
  email: string;
  password: string;
  code: string;
  confirmpass: string
}


export interface ReportData {
  id: number;
  involved: String;
  incident: String;
  location: String;
  latlng: String;
  date: String;
}

export interface LocationData {
  location: string;
  latlng: string;
}

export interface ApiResponse {
  title: string;
  message: string;
}
